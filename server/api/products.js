const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

