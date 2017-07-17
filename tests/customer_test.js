const chai = require("chai")
const assert = chai.assert
const app = require("../app.js")
const request = require("supertest")
const Snacks = require("../models/snacks")
const Money = require('../models/money')
let date = require('date-and-time')
let now = new Date()

/* NOTE
A customer should be able to get a list of the current items, their costs, and quantities of those items
A customer should be able to buy an item using money
A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
A customer should not be able to buy items that are not in the machine, but instead get an error
*/


describe('GET /api/customer/items - get a list of items', function(){

  it("allows a CUSTOMER to view a list of current items, quantities, and prices", function(done){
    request(app)
    .get('/api/customer/items')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(done)
  })
})


describe('POST /api/customer/items/:itemId/purchases - purchase an item', function(done){

  let snackGlobal

  beforeEach(function(done){
    const snack = new Snacks()
    snack.quantity = 10
    snack.description = "Doritos"
    snack.price = 85
    snack.save()

    .then(function(snack){
      snackGlobal = snack
      const money = new Money()
      money.balance = snack.price
      money.save()

      .then(function(money){
        money.purchases.push({
          item: snackGlobal.description,
          price: snackGlobal.price,
          date: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        })
        money.save()
        done()
      })
    })
  })


  it("allows a CUSTOMER to buy an item using money", function(done){
    request(app)
    .post(`/api/customer/items/${snackGlobal._id}/purchases`)
    .send({
      moneySent: 85
    })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(done)
  })


  it("allows a CUSTOMER to over-pay for an item and receive correct change", function(done){
    request(app)
    .post(`/api/customer/items/${snackGlobal._id}/purchases`)
    .send({
      moneySent: 100
    })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function(res){
      assert.equal(res.body.data.change, 15)
    })
    .end(done)
  })


  it("prevents a CUSTOMER from buying items that are not in the vending machine", function(done){
    request(app)
    .post(`/api/customer/items/596bddee623b0b13f82a148c/purchases`)
    .send({
      moneySent: 100
    })
    .expect(404)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(done)
  })


  afterEach(function(done){
    Snacks.deleteMany()
    .then(function(){
      Money.deleteMany()
      .then(function(){
        done()
      })
    })
  })
})
