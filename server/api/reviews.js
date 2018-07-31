const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

const createReviewFromJSON = ele => ({
  rating: +ele.rating,
  body: '' + ele.body,
  productId: +ele.productId,
})

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('this is the review', req.body)
    const reviews = await Review.create(createReviewFromJSON(req.body))
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.put('/:reviewId', (req, res, next) => {
  if (req.body.id && +req.body.id !== +req.params.reviewId) {
    next(new Error('Bad Request detected in PUT /:reviewId'))
  } else {
    Review.update(createReviewFromJSON(req.body), {
      where: {id: +req.params.reviewId},
      returning: true
    })
      .spread(
        (done, updatedRev) =>
          done ? res.json(...updatedRev) : res.status(404).end()
      )
      .catch(next)
  }
})


