const express = require('express');
const path = require('path');
const notes = require('./api/notes.js');
//const { clog } = require('./middleware/clog');
const api = require('./api/notes.js');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
//app.use(notes);

app.use(express.static('public'));

// GET Route for homepage @@@ I changed index to notes @@@
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);