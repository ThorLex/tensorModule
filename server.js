const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const notesFilePath = path.join("db.json");

// Fonction pour lire les données du fichier JSON
const readNotes = () => {
  const data = fs.readFileSync(notesFilePath, "utf-8");
  return JSON.parse(data);
};

// Fonction pour écrire les données dans le fichier JSON
const writeNotes = (notes) => {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};

// Route pour récupérer toutes les notes
app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Route pour récupérer une note par son ID
app.get("/notes/:id", (req, res) => {
  const notes = readNotes();
  const note = notes.find((n) => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});

// Route pour ajouter une nouvelle note
app.post("/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    category: req.body.category,
    favorite: req.body.favorite || false,
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// Route pour mettre à jour une note par son ID
app.put("/notes/:id", (req, res) => {
  let notes = readNotes();
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      ...req.body,
    };
    writeNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).send("Note not found");
  }
});

// Route pour supprimer une note par son ID
app.delete("/notes/:id", (req, res) => {
  let notes = readNotes();
  notes = notes.filter((n) => n.id !== req.params.id);
  writeNotes(notes);
  res.status(204).send();
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
