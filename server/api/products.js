const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const createProductFromJSON = body => ({
  title: '' + body.title,
  description: '' + body.description,
  price: +body.price,
  imageURL: '' + body.imageURL,
  inventory: +body.inventory
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

