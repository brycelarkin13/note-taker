const fs = require('fs');
const express = require("express");
const path = require("path");


const PORT = process.env.PORT || 3001;
// express app function
const app = express();

app.use(express.static('public'));
// parse incoming string or array
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());


app.get("/notes", (req, res) => {
    //res.send('hello');
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    newNote.id = notelength;
    noteList.push(newNote);

    fs.writeFileSync("/db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// note delete method
app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    // filter through all notes to find Id match to delete specific Id
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    // writes the new updated file to JSON
    fs.writeFileSync("/db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// method to listen for which port the app is running on
app.listen(PORT, () => {
    console.log('Server now on port ${PORT}!');
});
