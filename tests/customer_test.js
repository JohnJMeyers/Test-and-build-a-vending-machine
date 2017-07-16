const chai = require("chai")
const assert = chai.assert
const app = require("../app.js")
const request = require("supertest")
const Snacks = require("../models/snacks")

/* NOTE
A customer should be able to get a list of the current items, their costs, and quantities of those items
A customer should be able to buy an item using money
A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
A customer should not be able to buy items that are not in the machine, but instead get an error
*/

describe('Tests all CUSTOMER related HTTP methods', function(){



  beforeEach(function(done){

    const snack = new Snacks()
    snack.quantity = 6
    snack.description = "Doritos"
    snack.price = 85
    snack.save()

    .then(function(snack){
      done()
      console.log(snack)
    }).catch(function(error){
      console.log(error)
    })
  })

  afterEach(function(done){
    Snacks.deleteOne({
      description: "Doritos"
    })
    .then(function(){
      console.log('Deleted!')
      done()
    })
  })



  it("allows a CUSTOMER to view a list of current items, quantities, and prices", function(done){
    request(app)
    .get('/api/customer/items')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(done);
  })

  // it("allows a customer to buy an item using money" function(){
  //   request(app)
  //   .post('/api/customer/items/:itemId/purchases')
  //   .expect(200)
  //   .expect("Content-Type", "application/json; charset=utf-8")
  //   .end(done);
  // })

})
