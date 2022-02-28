const notes = require('express').Router();
const {v4: uuidv4} = require("uuid");
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/store');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.get('/api/notes', (req, res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific note
  notes.get('/:id', (req, res) => {
    const NoteTakerId = req.params.note_id;
    readFromFile('db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === NoteTakerId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
  // DELETE Route for a specific note
  notes.delete('/:id', (req, res) => {
    const NoteTakerId = req.params.id;
    readFromFile('db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== NoteTakerId);
  
        // Save that array to the filesystem
        writeToFile('db/db.json', result);
        console.log(result);
  
        // Respond to the DELETE request
        res.json(`Item ${NoteTakerId} has been deleted 🗑️`);
      });
  });
  
  // POST Route for a new note
  notes.post('/notes', (req, res) => {
    console.log(req.body);
  
    const {title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, 'db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });


module.exports = notes;