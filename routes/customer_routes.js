const express = require('express')
const router = express.Router()
const Snacks = require('../models/snacks')
const Money = require('../models/money')
let date = require('date-and-time')
let now = new Date()



router.get('/api/customer/items', function (req, res){
  Snacks.find()
  .then(function(snacks){
    return res.status(200).json({
      status: 'success',
      data: {
        snacks: snacks
      }
    })
  })
})



router.post('/api/customer/items/:itemId/purchases', function(req, res){
  res.setHeader('Content-Type', 'application/json')

  Snacks.findOne({
    _id: req.params.itemId
  })

  .then(function(snack){
    if(snack){
      if (snack.price <= req.body.moneySent){
        if(snack.quantity > 0){
          let change =  req.body.moneySent - snack.price
          snack.quantity -= 1
          snack.save()

          .then(function(snack){
            Money.find()

            .then(function(money){
              if(money[0]){
                money[0].balance += snack.price
                money[0].purchases.push({
                  item: snack.description,
                  price: snack.price,
                  date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
                })
                money[0].save()

              } else {
                  const money = new Money()
                  money.balance = snack.price
                  money.save()

                  .then(function(money){
                    money.purchases.push({
                      item: snack.description,
                      price: snack.price,
                      date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
                    })
                    money.save()
                  })
                }
            })

            .then(function(money){
              return res.status(200).json({
                status: 'success',
                data: {
                  snack: snack.description,
                  change: change
                }
              })
            })
          })

        } else {
          return res.status(417).json({
            status: 'fail',
            data: {
              error: 'Item is out of stock.'
            }
          })
        }

      } else {
        return res.status(402).json({
          status: 'fail',
          data: {
            money_given: req.body.moneySent,
            money_required: snack.price
          }
        })
      }

    } else {
      return res.status(404).json({
        status: 'fail',
        error: 'Item not found'
      })
    }
  })
})


module.exports = router
