'use strict';

//import models, { connectDb } from '../src/models'
require('dotenv').config()
const moment = require('moment')
const express = require('express')
const app = express()
const Item = require('./src/models/Item')
const ItemList = require('./src/models/ItemList')

app.use(express.json())

app.post('/itemlist', (req, res) => {
  const itemlist = new ItemList({
    created: moment.now(),
    isArchived: false
  })
  itemlist.save().then(savedList => {
    res.json(savedList.toJSON())
    console.log('ItemList saved!')
  })
})

app.get('/itemlist', (req, res) => {
  ItemList.find({ isArchived: false }).then(list => {
    if (list !== 'undefined') {
      res.status(200).json(list)
    } else {
      res.status(200).json({'message':'there are no active lists'})
    }
    console.log(list)
  })
})

app.post('/items/:name', (req, res) => {
  const name = req.params.name
  console.log(name)

  const item = new Item({
    name: name,
    created: moment.now()
  })
  item.save().then(savedItem => {
    res.json(savedItem.toJSON())
    console.log('Item saved!')
  //  mongoose.connection.close()
  })
})

app.get('/items', (req, res) => {
  Item.find({}).then(items => {
    res.status(200).json(items)
    console.log(items)
  //mongoose.connection.close()
  })
})

app.get('/items/:id', (req, res) => {
  Item.findById(req.params.id).then(item => {
    res.json(item.toJSON)
    console.log(item)
  })
})

app.get('/items/name/:name', (req, res) => {
  Item.findOne({ name: req.params.name}).then(item => {
    if (item !== 'undefined') {
      res.status(200).json(item)
    } else {
      res.status(404).end()
    }
    console.log(item)
  })
})

app.delete('/items/name/:name', (req, res) => {
  const name = req.params.name
  items = items.filter(item => item.name !== name)
  res.status(204).end()
})

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Welcome to shoppinglist. Proceed...</h1>')
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(process.env.PORT, process.env.HOST, () =>
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}!`))

/*
connectDb().then(async () => {
  app.listen(process.env.PORT, process.env.HOST, () =>
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}!`),
  )
})
*/