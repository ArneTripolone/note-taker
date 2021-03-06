const express = require('express');
const path = require('path');
const { notes } = require('./db/notes.json');
const { clog } = require('./middleware/clog');
const api = require('./api/notes.js');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
// Import custom middleware, "clog"
app.use(clog);
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
//app.use(notes);

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.post('/api/notes',(req,res)=>{
  const { title, text } = req.body;
  const newNote = {title, text};
  res.json(newNote);

  fs.readFile('./db/notes.json', 'utf8', (err, data) => {{
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);
      fs.writeFile(
        './db/notes.json',
        JSON.stringify(parsedNotes),
        (writeErr) =>
        writeErr ? console.error(writeErr) : console.info('updated notes!')
      );
    }
  });
})

/*
//request data
//const { notes } = require('./db/notes.json');
/*
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
*/
//app.post('./db', (req, res) =>
  //res.sendFile(path.join(__dirname, 'notes.json'))
//);