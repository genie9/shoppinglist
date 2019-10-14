const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  itemlists: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ItemList'
  }],
  /*
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false
  },
  */
  name: {
    type: String,
    unique: true,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
    required: false
  },
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Item', itemSchema)