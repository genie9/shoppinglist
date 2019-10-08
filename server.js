'use strict';

import models, { connectDb } from './models'

const express = require('express')

const app = express()
app.use(express.json())
/*
app.post('/api/v1/items', Items.create)
app.get('/api/v1/items', Items.getAll)
app.get('/api/v1/items', Items.update)
app.delete('/api/v1/items', Items.delete)
*/
app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'})
});

connectDb().then(async () => {
  app.listen(process.env.PORT, process.env.HOST, () =>
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}!`),
  )
})

//app.listen(PORT, HOST);
//console.log(`Running on http://${HOST}:${PORT}`);