const express = require('express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const mongoose = require('mongoose');

const Money = require('./models/money')
const Snacks = require('./models/snacks')

const Customer = require('./routes/customer_routes.js')
const Vendor = require('./routes/vendor_routes.js')

const app = express();

app.use(bodyParser.json())
app.use(Customer)
app.use(Vendor)

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vending');

module.exports = app

app.listen(3000, function(){
  console.log('Everything looks good!')
})
