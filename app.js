const express = require('express');
// const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const mongoose = require('mongoose');


const Money = require('./models/money')
const Snacks = require('./models/snacks')

const Customer = require('./routes/customer_routes.js')
const Vendor = require('./routes/vendor_routes.js')

const app = express();

app.use(bodyParser.json())

// const money = new Money({
//   balance: 500
//   // transactions: {
//   //   item: "Skittles",
//   //   price: 100,
//   //   time: "test"
//   // }
// })
// money.save()
// .then(function(money){
//   console.log("money saved!")
// }).catch(function(errors){
//   console.log(errors)
// })



app.use(Customer)
app.use(Vendor)


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vending');



// let money = new Money({
//   balance: 5000,
//   transactions: {
//     price: 100,
//     snack: "Snickers",
//     time: "test"
//   }
// })
// money.save().then(function(){
//   console.log('money saved')
// }).catch(function(error){
//   console.log('something went wrong' + error)
// })




module.exports = app

app.listen(3000, function(){
  console.log('Everything looks good!')
})



// let snacks = new Snacks({
//   quantity: 99,
//   description :'Skittles',
//   price: 100
// })
// snacks.save().then(function(){
//   console.log('snacks saved')
// }).catch(function(error){
//   console.log('something went wrong' + error)
// })



// app.engine('mustache', mustacheExpress());
// app.set('views', './views')
// app.set('view engine', 'mustache')
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: false }))





// app.get('/api/customer/items', function (req, res){
//   Snacks.find()
//   .then(function(snacks){
//     return res.json(snacks)
//   })
//   .catch(function(error){
//     console.log('something went wrong $' + errors)
//   })
// })
//
