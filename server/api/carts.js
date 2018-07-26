const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// Helper functions to shape database requests.
const createCartUpdateFromJSON = body => ({
  title: '' + body.title,
  description: '' + body.description,
  price: +body.price,
  imageURL: '' + body.imageURL,
  inventory: +body.inventory
})

router.get('/', (req, res, next) => {
  req.session.cart = true
  res.json({yo: 'booooye'})
})

// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({})
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const products = await Product.create({
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       inventory: req.body.inventory,
//       imageURL: req.body.imageURL
//     })
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

// /* TODO: Add isAdmin*/
// router.put('/:productId', (req, res, next) => {
//   if (req.body.id && +req.body.id !== +req.params.productId) {
//     next(new Error('Bad Request detected in PUT /:productId'))
//   } else {
//     Product.update(createProductFromJSON(req.body), {
//       where: {id: +req.params.productId},
//       returning: true
//     })
//       .spread(
//         (done, updatedProd) =>
//           done ? res.json(...updatedProd) : res.status(404).end()
//       )
//       .catch(next)
//   }
// })