'use strict';

require('dotenv').config()
const mongoose = require('mongoose')
const moment = require('moment')
const express = require('express')
const app = express()

const Item = require('./src/models/Item')
const ItemList = require('./src/models/ItemList')
const User = require('./src/models/User')
const cors = require('cors')

const corsOptions = {
  origin: `${process.env.HOST}:${process.env.PORT}`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())

mongoose
  .connect(process.env.DATABASE_URL, {useNewUrlParser: true})
  .then(result => {
    console.log('Connected to MongoDB')
})
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
})

app.post('/user/:name', async (req, res) => {
  const name = req.params.name
  console.log(name)

  const user = new User({
    username: name,
    created: moment.now()
  })

  const savedUser = await user.save()
  if (savedUser){
    res.status(200).json(savedUser)
    console.log('Profile is saved')
  }
})

app.post('/itemlists', async (req, res) => {
  const itemlist = new ItemList({
    created: moment.now(),
    isArchived: false
  })

  const savedList = await itemlist.save()
  if (savedList) {
    res.json(savedList.toJSON())
    console.log('ItemList is saved')
  }
})

app.get('/itemlists', async (req, res) => {
  const itemlist = await ItemList.find({ isArchived: false }).populate('items')
  
  if (itemlist) {
    res.status(200).json(itemlist)
  } else {
    res.status(200).json({'message':'there are no active lists'})
  }
})

app.post('/items/name/:name', async (req, res, next) => {
  const name = req.params.name

  let itemlist = await ItemList.findOne({isArchived: false})

  if (!itemlist) {
    itemlist = new ItemList({
      created: moment.now(),
      isArchived: false,
      items: [],
    })
  }
  
  const item = new Item({
    name: name,
    created: moment.now(),
    itemlist: itemlist._id
  })

  try {
    const savedItem = await item.save()
    itemlist.items = itemlist.items.concat(savedItem._id)
    await itemlist.save()
    res.json(savedItem.toJSON())
    console.log('Item is saved', item.name)
  } catch(exception) {
    next(exception)
  }
})

app.get('/items', cors(corsOptions), cors(corsOptions), async (req, res) => {
  const items = await Item.find({})
  if (items) {
    res.status(200).json(items)
  } else {
    res.status(404).end()
  }
})

app.get('/items/:id', cors(corsOptions), async (req, res) => {
  const item = await Item.findById(req.params.id)
  if(item) {
    res.status(200).json(item)
  } else {
    res.status(404).end()
  }
})

app.get('/items/name/:name', cors(corsOptions), async (req, res) => {
  const item = await Item.findOne({ name: req.params.name})
  console.log(item)
  if (item) {
    res.status(200).json(item)
  } else {
    res.status(404).end()
  }
})

// TODO finish these...
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
