const express = require('express');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => console.log('App Running at port 3001'));
