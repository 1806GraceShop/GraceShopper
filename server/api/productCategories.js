const router = require('express').Router()
const {ProductCategory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll({})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})