const chai = require("chai")
const assert = chai.assert
const app = require("../app.js")
const request = require("supertest")
const Snacks = require("../models/snacks")
const Money = require('../models/money')
let date = require('date-and-time')
let now = new Date()

/*  NOTE
A customer should not be able to buy items that are not in the machine, but instead get an error
A vendor should be able to see total amount of money in machine
A vendor should be able to see a list of all purchases with their time of purchase
A vendor should be able to update the description, quantity, and costs of items in the machine
A vendor should be able to add a new item to the machine
*/


describe('Tests vendors HTTP methods.', function(done){

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


  it("allows a VENDOR to see a list of all purchases and their time of purchase.", function(done){
    request(app)
    .get('/api/vendor/purchases')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function(res){
      assert.equal(res.body.data[0].item, "Doritos")
    })
    .end(done)
  })


  it("allows a VENDOR to see the total amount of money in the machine.", function(done){
    request(app)
    .get('/api/vendor/money')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function(res){
      assert.equal(res.body.data.balance, 85)
    })
    .end(done)
  })


  it("allows a VENDOR to add a new item to the machine", function(done){
    request(app)
    .post('/api/vendor/items')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .send({
      price: 100,
	    description: "Kit Kat",
	    quantity: 7
    })
    .end(done)
  })


  it("allows a VENDOR to update the description, quantity, and costs of items in the machine.", function(done){
    request(app)
    .put(`/api/vendor/items/${snackGlobal._id}`)
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .send({
	     quantity: 30,
       discription: "Snickers",
       price: 100
    })
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
