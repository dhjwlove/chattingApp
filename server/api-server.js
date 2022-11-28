const express = require('express');
const path = require('path');

const app = express();
const PORT = 7777;

const userJson = require('./data/user/user.json');

app.use('/static', express.static('public'));

app.get('/user/list', () => {

});

app.post('/user/add', () => {

});

app.listen(PORT, () => {
  console.log(`Listen : ${PORT}`);
});
