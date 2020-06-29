const express = require('express');
const chirpStore = require('../chirpstore');

const router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpStore.GetChirps(id));
    } else {
        res.send(chirpStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.status(200).json({ msg: 'Status 200: OK - request has succeeded' });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = req.body;
    if (id) {
        res.json(chirpStore.UpdateChirp(id, chirp));
    } else {
        res.status(200).json({ msg: 'Status 200: OK - request has succeeded' });
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id);
    res.send('Chirp deleted')
});

module.exports = router;