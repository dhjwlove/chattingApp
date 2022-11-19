const express = require('express');
const path = require('path');

const app = express();
const PORT = 7777;

app.use('/static', express.static('public'));

app.listen(PORT, () => {
  console.log(`Listen : ${PORT}`);
});
