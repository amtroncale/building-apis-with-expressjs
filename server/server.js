const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

app.use(express.static('public'));

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server listening on port 3000')
});