/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

xdescribe('Test Product routes (including Admin protection)', () => {
  beforeEach(async () => {
    await User.create({
      firstName: 'Harold',
      lastName: 'Faltermeyer',
      email: 'harold@email.com',
      password: '1234',
      admin: true
    })
    return db.sync({force: true})
  })

  describe('Get from /api/products/', () => {
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
  })

  describe('Get from /api/products/', () => {
    const userCredentials = {
      email: 'harold@email.com',
      password: '1234'
    }
    const authenticatedUser = request.agent(app)

    beforeEach(async () => {
      authenticatedUser
        .post('/auth/login')
        .send(userCredentials)
        .end((err, response) => {
          if (err) {
            throw err
          }
          expect(response.statusCode).to.equal(200)
        })

      await Product.create({
        title: 'Test Product 2',
        description: 'Everything is great',
        price: 5,
        inventory: 3,
        imageURL: 'https://www.fillmurray.com/200/300'
      })
    })

    it('handles good POST requests to /api/admin/addProduct', async () => {
      const newProduct = {
        title: 'new Title',
        description: 'new Description',
        price: 10,
        inventory: 10,
        imageURL: 'https://www.fillmurray.com/200/301'
      }

      const res = await request(app)
        .post('/api/admin/addProduct')
        .send(newProduct)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(2)
      expect(res.body.description).to.be.equal('new Description')
      expect(+res.body.price).to.be.equal(10)
      expect(+res.body.inventory).to.be.equal(10)
      expect(res.body.imageURL).to.be.equal(
        'https://www.fillmurray.com/200/301'
      )
    })

    it('handles BAD POST to /api/admin/addProduct', async () => {
      // const newProduct = {
      //   title: title + 'new',
      //   description: description + 'new',
      //   price: price + 10,
      //   inventory: inventory + 10,
      //   imageURL: imageURL + '/new'
      // }
      const badProduct = {}
      const res = await request(app)
        .post('/api/admin/addProduct')
        .send(badProduct)
        .expect(400)
      expect(res.body.error).to.contain('notNull')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
