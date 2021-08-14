const express = require('express');
const path = require('path');
const { notes } = require('./db/notes.json');
const { clog } = require('./middleware/clog');
const api = require('./api/notes.js');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
//app.use(notes);

app.use(express.static('public'));

// request data
//const { notes } = require('./db/notes.json');

function createNewNote (body, notesArray) {
  const note = body; 
  notesArray.push(note); 

  // path to write file 
  fs.writeFileSync(
      path.join(__dirname, './db/notes.json'),
      JSON.stringify({ notes : notesArray }, null, 2)
  );
  // return finished code to post route for response
  return note; 
};

// route GET 
app.get('/api/notes', (req, res) => {
  res.json(notes); 
});

// route to server to accept data to be used or stored server-side
app.post('/db/notes', (req, res) => {
  // set id based on what the next index of the array will be 
  req.body.id = notes.length.toString(); 

  // if any data in req.body is incorrect, send error
  if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.'); 
  
  } else {
      // add note to json file and animals array in this function 
      const note = createNewNote(req.body, notes); 

      res.json(note);
  }
});


// function handling taking the data from req.body and adding it to our animals.json file
function createNewNote (body, notesArray) {
    const note = body; 
    notesArray.push(note); 

    // path to write file 
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );
    // return finished code to post route for response
    return note; 
};


// GET Route for homepage @@@ changed index to notes @@@
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
//app.get('*', (req, res) =>
  //res.sendFile(path.join(__dirname, 'public/pages/index.html'))
//);

//app.post('./db', (req, res) =>
  //res.sendFile(path.join(__dirname, 'notes.json'))
//);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);