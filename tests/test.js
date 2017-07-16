
// 
// const chai = require("chai")
// const assert = chai.assert
// const app = require("../app.js")
// const request = require("supertest")
//
// describe('vending machine', function(){
//
//   it("allows a CUSTOMER to view a list of current items, quantities, and prices", function(done){
//     request(app)
//     .get('/api/customer/items')
//     .expect(200)
//     .expect("Content-Type", "application/json; charset=utf-8")
//     .end(done);
//   })
//
//   it("allows a CUSTOMER to buy items using money", function(done){
//     request(app)
//     .get('/api/customer/items/:itemId/purchases')
//     .end(done);
//   })
//
//   it("allows a CUSTOMER to enter the amount they want to pay and returns the correct change", function(done){
//     request(app)
//     .get('/api/customer/items/:itemId/purchases')
//     .end(done);
//   })
//
//   it("prevents a CUSTOMER from buying an item that is out of stock", function(done){
//     request(app)
//     .get('/api/customer/items')
//     .end(done);
//   })
//
//   it("allows a VENDOR to see the amount of money in the vending machine", function(done){
//     request(app)
//     .get('/api/vendor/money')
//     .end(done);
//   })
//
//   it("allows a VENDOR to see a list of purchases and the time of purchase", function(done){
//     request(app)
//     .get('/api/vendor/purchases')
//     .end(done);
//   })
//
//   it("allows a VENDOR to update the description, quantity, and cost of items in the vending machine", function(done){
//     request(app)
//     .get('/api/vendor/items/:itemId')
//     .end(done);
//   })
//
//   it("allows the VENDOR to add new items to the vending machine", function(done){
//     request(app)
//     .get('/api/vendor/items')
//     .end(done);
//   })
// })
