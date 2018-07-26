const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.post('/addProduct', async (req, res, next) => {
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
    next(err)
  }
})
