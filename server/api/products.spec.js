/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const title = 'Test Product 1'
    const description = 'He is awesome!'
    const price = 1
    const inventory = 2
    const imageURL = 'https://www.fillmurray.com/200/300'

    beforeEach(() => {
      return Product.create({
        title,
        description,
        price,
        inventory,
        imageURL
      })
    })

    it('GETs /api/products', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(1)
      expect(res.body[0].title).to.be.equal(title)
      expect(res.body[0].description).to.be.equal(description)
      expect(+res.body[0].price).to.be.equal(price)
      expect(+res.body[0].inventory).to.be.equal(inventory)
      expect(res.body[0].imageURL).to.be.equal(imageURL)
    })

    it('handles good POST /api/products', async () => {
      const newProduct = {
        title: title + 'new',
        description: description + 'new',
        price: price + 10,
        inventory: inventory + 10,
        imageURL: imageURL + '/new'
      }

      const res = await request(app)
        .post('/api/products/')
        .send(newProduct)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(2)
      expect(res.body.description).to.be.equal(description + 'new')
      expect(+res.body.price).to.be.equal(price + 10)
      expect(+res.body.inventory).to.be.equal(inventory + 10)
      expect(res.body.imageURL).to.be.equal(imageURL + '/new')
    })

    it('handles BAD POST /api/products', async () => {
      const badProduct = {}
      const res = await request(app)
        .post('/api/products/')
        .send(badProduct)
        .expect(400)
      expect(res.body.error).to.contain('notNull')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
