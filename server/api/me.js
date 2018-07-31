const router = require('express').Router()
const {User, Cart, CartLineItem} = require('../db/models')
module.exports = router

router.put('/', (req, res, next) => {
  const {firstName, lastName, address} = req.body
  User.findById(req.user.id)
    .then(usr => usr.update({firstName, lastName, address}, {returning: true}))
    .then(usr => res.json(usr))
    .catch(next)
})

router.route('/cart').get((req, res, next) => {
  // If the user is logged in, send their cart.
  if (req.user)
    Cart.findOrCreate({where: {userId: req.user.id}, include: [CartLineItem]})
      .spread(
        (cart, created) =>
          created ? res.status(201).json(cart) : res.json(cart)
      )
      .catch(next)
  else
    // Anonymous users don't get carts yet.
    res.sendStatus(404)
})
