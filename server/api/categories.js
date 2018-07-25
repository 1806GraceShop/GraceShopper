const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})