const fs = require('fs');
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    //res.send('hello');
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./develop/db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    newNote.id = notelength;
    noteList.push(newNote);

    fs.writeFileSync(".develop/db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

app.listen(PORT, () => {
    console.log('Server now on port ${PORT}!');
});
