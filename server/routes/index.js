const express = require('express');
const chirpRouter = require('./chirps');
const usersRouter = require('./users');

const router = express.Router();

router.use('/chirps', chirpRouter);
router.use('/users', usersRouter);

module.exports = router;