'use strict';

//import models, { connectDb } from '../src/models'
require('dotenv').config()
const moment = require('moment')
const express = require('express')
const app = express()
const Item = require('./src/models/Item')
const ItemList = require('./src/models/ItemList')
const User = require('./src/models/User')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())

app.post('/user/:name', (req, res) => {
  const name = req.params.name
  console.log(name)

  const user = new User({
    username: name,
    created: moment.now()
  })
  user.save().then( savedUser => {
    res.status(200).json(savedUser)
    console.log('Profile is saved')
  })
})

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

//ptofile/:profile
app.post('/items/name/:name', (req, res) => {
  const name = req.params.name
  const profile = req.params.list

  // console.log(name, list)

  const itemlist = ItemList.findOne({isArchived: false})
  console.log('itemlist', itemlist)

  if ( itemlist === 'undefined') {
    itemlist = new ItemList({
      created: moment.now(),
      isArchived: false
    })
    itemlist.save().then(savedList => {
      console.log('New ItemList saved!')
    })
  }
   
  const item = new Item({
    name: name,
    created: moment.now(),
    user: profile
  })

  item.save().then(savedItem => {
    res.json(savedItem.toJSON())
    console.log('Item saved!')
  })
  
  // itemlist.items.push(item)
  // itemlist.save()

})
/**
 * 
 */
app.get('/items', cors(corsOptions), (req, res) => {
  Item.find({}).then(items => {
    res.status(200).json(items)
    console.log(items)
  //mongoose.connection.close()
  })
})

app.get('/items/:id', cors(corsOptions), (req, res) => {
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