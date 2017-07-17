const express = require('express')
const router = express.Router()
const Snacks = require('../models/snacks')
const Money = require('../models/money')



router.get('/api/vendor/purchases', function(req, res){
  Money.find()
  .then(function(money){
    let vendorsList = []
    money[0].purchases.forEach( function(purchase){
      vendorsList.push({item: purchase.item, date: purchase.date})
    })
    return res.status(200).json({
      status: 'success',
      data: vendorsList
    })
  })
})



router.get('/api/vendor/money', function(req,res){
  Money.find()
  .then(function(money){
    return res.status(200).json({
      status: 'success',
      data: {
        balance: money[0].balance
      }
    })
  })
})



router.post('/api/vendor/items', function(req,res){
  res.setHeader('Content-Type', 'application/json')
  let snack = new Snacks()
  snack.price = req.body.price
  snack.description = req.body.description
  snack.quantity = req.body.quantity
  snack.save()
  .then(function(snack){
    return res.status(200).json({
      status: 'Successfully added ' + snack.description + ' to the vending machine.',
      data: {
        snack: snack
      }
    })
  })
})



router.put('/api/vendor/items/:itemId', function(req,res){
  Snacks.findOne({
    _id: req.params.itemId
  })
  .then(function(snack){
    if (req.body.quantity) {
      snack.quantity = req.body.quantity
      snack.save()
    }
    if (req.body.description) {
      snack.description = req.body.description
      snack.save()
    }
    if (req.body.price) {
      snack.price = req.body.price
      snack.save()
    }
      return res.status(200).json({
        status: 'success',
        data: {
          snack: snack
        }
      })
  })
})



module.exports = router
