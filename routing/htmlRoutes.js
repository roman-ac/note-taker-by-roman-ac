const path = require('path');

const notes = require('express').Router();


// sends to homepage
notes.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
//Sends notes to the notes.html file

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//Sends to the homepage if a pathing issue exists

notes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})




module.exports = notes;