/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const rating = 1
    const body = 'Test Review Body 1'
    const productId = 1

    beforeEach(() => {
      return Review.create({
          rating,
          body,
        //   productId
      })
    })

    it('GETs /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(1)
      expect(res.body[0].body).to.be.equal(body)
      expect(+res.body[0].rating).to.be.equal(rating)
    //   expect(+res.body[0].productId).to.be.equal(productId)

    })

    // it('handles good POST /api/reviews', async () => {
    //   const newReview = {
    //     body: body + 'new',
    //     rating: rating + 2,
    //     // productId: productId + 2
    //   }

    //   const res = await request(app)
    //     .post('/api/reviews/')
    //     .send(newReview)
    //     .expect(200)

    //   expect(res.body).to.be.an('object')
    //   expect(res.body.id).to.be.equal(2)
    //   expect(res.body.body).to.be.equal(body + 'new')
    //   expect(+res.body.rating).to.be.equal(rating + 2)
    // //   expect(+res.body.productId).to.be.equal(productId + 2)
    // })

    // it('handles BAD POST /api/reviews', async () => {
    //   const badReview = {}
    //   const res = await request(app)
    //     .post('/api/reviews/')
    //     .send(badReview)
    //     .expect(400)
    //   expect(res.body.error).to.contain('notNull')
    // })
  }) // end describe('/api/reviews')
}) // end describe('Review routes')
