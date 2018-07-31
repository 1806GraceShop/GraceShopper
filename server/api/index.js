const router = require('express').Router()

module.exports = router

router.use((req, res, next) => {
  console.log('Session:', req.sessionID, 'is user', req.user && req.user.id)
  next()
})

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/categories', require('./categories'))
router.use('/prodcats', require('./productCategories'))

router.use('/carts/', require('./carts'))
router.use('/me', require('./me'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
