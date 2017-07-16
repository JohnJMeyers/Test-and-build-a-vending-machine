const mongoose = require('mongoose')

const snackSchema = new mongoose.Schema({
  quantity: {type: Number, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true}
})

const Snacks = mongoose.model('Snacks', snackSchema)

module.exports = Snacks
