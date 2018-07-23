const router = require('express').Router()
const {Products} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({
        attributes: ['title', 'description', 'price', 'quantity']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

