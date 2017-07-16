const express = require('express')
const router = express.Router()
const Snacks = require('../models/snacks')
const Money = require('../models/money')



router.get('/api/vendor/purchases', function(req, res){
  // res.setHeader('Content-Type', 'application/json')
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
  .catch(function(errors){
    console.log(errors)
  })
})




// router.get('/api/vendor/purchases', function(req, res){
//   res.setHeader('Content-Type', 'application/json')
// Money.find()
// .then(function(money){
//   return res.status(200).json({
//     purchases: money[0].purchases
//   })
// })
// .catch(function(errors){
//   console.log(errors)
// })
// })

module.exports = router
