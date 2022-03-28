const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const publication = require('./routes/publication');
const commentaire = require('./routes/commentaire');
const app = express();
const path = require('path');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));


////// CORS accept cross-orrigin//////
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/user', user)
app.use('/api/publication', publication)
app.use('/api/commentaire', commentaire)

module.exports = app;