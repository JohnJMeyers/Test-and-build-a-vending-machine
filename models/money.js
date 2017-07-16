const mongoose = require('mongoose')

const moneySchema = new mongoose.Schema({
  balance: {type: Number},
  purchases: []
})

const Money = mongoose.model('Money', moneySchema)

module.exports = Money
