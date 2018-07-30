const router = require('express').Router()
const {isAdmin} = require('./authMiddleware')

module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/productcategories', require('./productCategories'))
router.use('/carts/', require('./carts'))
router.use('/admin', isAdmin, require('./admin'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
