const notes = require('express').Router();
//const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes. @@@ I changed L11 from this: ./db/notes.json
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get('/:note_id', (req, res) => {
  const tipId = req.params.tip_id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((tip) => tip.tip_id === tipId);
      return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});


// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, noteText} = req.body;

  // If all the required properties are present
  if (title && noteText) {
    // Variable for the object we will save
    const jsonNotes = {
      title,
      text,
      //feedback_id: uuidv4(),
    };

    writeToFile(jsonNotes, './db/notes.json');

    const response = {
      status: 'success',
      body: jsonNotes,
      //feedback_id: uuidv4(),
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

/*
// DELETE Route for a specific tip
notes.delete('/:note_id', (req, res) => {
  const tipId = req.params.tip_id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((tip) => tip.tip_id !== tipId);

      // Save that array to the filesystem
      writeToFile('./db/notes.json', result);

      // Respond to the DELETE request
      res.json(`Item ${tipId} has been deleted 🗑️`);
    });
});
*/

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      //note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});


module.exports = notes;