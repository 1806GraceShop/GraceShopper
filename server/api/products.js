const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./authMiddleware')

module.exports = router

const createProductFromJSON = body => ({
  title: '' + body.title,
  description: '' + body.description,
  price: +body.price,
  imageURL: '' + body.imageURL,
  inventory: +body.inventory
})

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({})
      res.json(products)
    } catch (err) {
      next(err)
    }
  })
  .all(isAdmin)
  .post(async (req, res, next) => {
    try {
      const products = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        imageURL: req.body.imageURL
      })
      res.json(products)
    } catch (err) {
      err.status = 400
      err.message = {error: err.message}
      next(err)
    }
  })

router
  .route('/:productId')
  .all(isAdmin)
  .put((req, res, next) => {
    if (req.body.id && +req.body.id !== +req.params.productId) {
      next(new Error('Bad Request detected in PUT /:productId'))
    } else {
      Product.update(createProductFromJSON(req.body), {
        where: {id: +req.params.productId},
        returning: true
      })
        .spread(
          (done, updatedProd) =>
            done ? res.json(...updatedProd) : res.status(404).end()
        )
        .catch(next)
    }
  })
