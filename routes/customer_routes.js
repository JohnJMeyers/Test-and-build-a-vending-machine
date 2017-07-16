const express = require('express')
const router = express.Router()
const Snacks = require('../models/snacks')
const Money = require('../models/money')
let date = require('date-and-time')
let now = new Date()

router.get('/api/customer/items', function (req, res){
  res.setHeader('Content-Type', 'application/json')
  Snacks.find()
  .then(function(snacks){
    return res.json(snacks)
  })
  .catch(function(errors){
    console.log(errors)
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

            .catch(function(errors){
              console.log(errors)
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

            .catch(function(errors){
              console.log(errors)
            })
          })

          .catch(function(errors){
            console.log(errors)
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

  .catch(function(errors){
    console.log(errors)
  })
})






// router.post('/api/customer/items/:itemId/purchases', function(req, res){
//
//   Snacks.findOne({
//     _id: req.params.itemId
//   })
//   .then(function(snack){
//     if(snack){
//       if (snack.price <= req.body.moneySent){
//         if(snack.quantity > 0){
//
//           let change =  req.body.moneySent - snack.price
//
//           snack.quantity -= 1
//           snack.save()
//           .then(function(snack){
//
//             Money.find()
//             .then(function(money){
//               if(money[0]){
//                 // let now = new Date()
//
//                 money[0].balance += snack.price
//                 money[0].transactions.push({
//                   item: snack.description,
//                   price: snack.price,
//                   date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
//                 })
//                 money[0].save()
//               } else {
//                 const money = new Money()
//                 money.balance = snack.price
//                 money.save()
//                 .then(function(money){
//                   money.transactions.push({
//                     item: snack.description,
//                     price: snack.price,
//                     date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
//                   })
//                   money.save()
//                 })
//                 }
//
//                 })
//
//
//               // money.save()
//             // })
//             .catch(function(errors){
//               console.log('errors here, get your errors here!')
//             })
//             // const money = new Money()
//             //
//             // money.balance = 5000
//             //
//             // money.save()
//
//             .then(function(money){
//               return res.status(200).json({
//                 status: 'success',
//                 data: {
//                   snack: snack.description,
//                   change: change
//                 }
//               })
//             })
//             .catch(function(errors){
//               console.log("Money errors" + errors)
//             })
//           })
//           .catch(function(errors){
//             console.log("Something went wrong!" + errors)
//           })
//
//         } else {
//           res.status(417).json({
//             status: 'fail',
//             data: {
//               error: 'Item is out of stock.'
//             }
//           })
//           // res.send('Sorry, this item is out of stock.')
//         }
//       } else {
//         return res.status(402).json({
//           status: 'fail',
//           data: {
//             money_given: req.body.moneySent,
//             money_required: snack.price
//           }
//         })
//         // res.send('This item costs ' + snack.price + '.' + ' You only inserted ' + req.body.moneySent + '.' + ' Please try again.' )
//       }
//
//     } else {
//       return res.status(404).json({
//         status: 'fail',
//         error: 'Item not found'
//       })
//       // res.send('Snack not found. Please try again')
//     }
//   })
//   .catch(function(errors){
//     console.log("ERRORS!!!!!!!" + errors)
//   })
// })







// router.post('/api/customer/items/:itemId/purchases', function(req, res){
//
//   Snacks.findOne({
//     _id: req.params.itemId
//   })
//   .then(function(snack){
//     if(snack){
//       if (snack.price <= req.body.moneySent){
//         if(snack.quantity > 0){
//
//           let change =  req.body.moneySent - snack.price
//
//           snack.quantity -= 1
//           snack.save()
//           .then(function(snack){
//
//             Money.find()
//             .then(function(money){
//               let now = new Date()
//
//               money[0].balance += snack.price
//               money[0].transactions.push({
//                 item: snack.description,
//                 price: snack.price,
//                 date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
//               })
//               money[0].save()
//
//               // money.save()
//             })
//             .catch(function(errors){
//               console.log('errors here, get your errors here!')
//             })
//             // const money = new Money()
//             //
//             // money.balance = 5000
//             //
//             // money.save()
//
//             .then(function(money){
//               return res.status(200).json({
//                 status: 'success',
//                 data: {
//                   snack: snack.description,
//                   change: change
//                 }
//               })
//             })
//             .catch(function(errors){
//               console.log("Money errors" + errors)
//             })
//           })
//           .catch(function(errors){
//             console.log("Something went wrong!" + errors)
//           })
//
//         } else {
//           res.status(417).json({
//             status: 'fail',
//             data: {
//               error: 'Item is out of stock.'
//             }
//           })
//           // res.send('Sorry, this item is out of stock.')
//         }
//       } else {
//         return res.status(402).json({
//           status: 'fail',
//           data: {
//             money_given: req.body.moneySent,
//             money_required: snack.price
//           }
//         })
//         // res.send('This item costs ' + snack.price + '.' + ' You only inserted ' + req.body.moneySent + '.' + ' Please try again.' )
//       }
//
//     } else {
//       return res.status(404).json({
//         status: 'fail',
//         error: 'Item not found'
//       })
//       // res.send('Snack not found. Please try again')
//     }
//   })
//   .catch(function(errors){
//     console.log("ERRORS!!!!!!!" + errors)
//   })
// })




















module.exports = router
