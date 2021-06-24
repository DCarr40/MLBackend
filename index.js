const express = require('express');
const repoContext = require('./repository/repository-wrapper');
// const cors = require('cors');
const {validateSong} = require('./middleware/song-validation');
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {console.log("Server started. Listening on port 5000.");})


//GET Requests
app.get('/api/songs', (req, res) =>{
    const products = repoContext.products.findAllProducts();
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
})

app.get('/api/songs/:id', (req, res) =>{
    const id = req.params.id;
    const songs = repoContext.products.findSongById(id);
    return res.send(songs);
})


//POST Requests

app.post('/api/songs',[validateSong], (req, res) =>{
    const newSongs = req.body;
    const addedSongs = repoContext.songs.createSong(newSongs);
    return res.send(addedSongs);
})


//PUT Requests

app.put('/api/songs/:id',[validateSong], (req, res) =>{
    const id = req.params.id;
    const songPropertiesToUpdate = req.body;
    const updatedSongs = repoContext.songs.updateSong(id, songPropertiesToUpdate);
    return res.send(updatedSongs);
})


//DELETE Requests

app.delete('/api/songs/:id', (req, res) =>{
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
})