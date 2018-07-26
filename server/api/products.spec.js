// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Products = db.model('products')

// describe('Product routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/products/', () => {
//     const jacobysName = 'Jacoby Kang'
//     const jacobysDescription = 'He is awesome!'
//     const jacobysPrice = 1
//     const jacobysQuantity = 2

//     beforeEach(() => {
//       return Products.create({
//         name: jacobysName,
//         description: jacobysDescription,
//         price: jacobysPrice,
//         quantity: jacobysQuantity
//       })
//     })

//     it('GET /api/products', async () => {
//       const res = await request(app)
//         .get('/api/products')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].name).to.be.equal(jacobysName)
//       expect(res.body[0].description).to.be.equal(jacobysDescription)
//       expect(res.body[0].price).to.be.equal(jacobysPrice)
//       expect(res.body[0].quantity).to.be.equal(jacobysQuantity)

//     })
//   }) // end describe('/api/products')
// }) // end describe('Product routes')
