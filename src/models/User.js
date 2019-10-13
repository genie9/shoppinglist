import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

userSchema.static.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  })
  if (!user) {
    user = await this.findOne({
      email: login,
    })
  }
  return user
}

//const User = mongoose.model('User', userSchema)

itemListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)