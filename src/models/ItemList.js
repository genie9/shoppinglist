const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const itemListSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item'
  }],
  created: {
    type: Date,
    required: true
  },
  modified: {
    type: Date,
    required: false,
  },
  isArchived: {
    type: Boolean,
    required: true
  },
  archived: {
    type: Date,
    required: false,
  },
})

//const ItemList = mongoose.model('ItemList', itemListSchema)

itemListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('ItemList', itemListSchema)