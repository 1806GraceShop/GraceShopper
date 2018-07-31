const router = require('express').Router()
const {Cart, CartLineItem} = require('../db/models')
const {isAdmin, isOwnCart} = require('./authMiddleware')

module.exports = router

router
  .route('/')
  .post((req, res, next) => {
    const newCart = req.user
      ? {sessionId: req.sessionID, userId: req.user.dataValues.id}
      : {sessionId: req.sessionID}
    Cart.create(newCart)
      .then(cart => {
        req.session.cartId = cart.id
        res.json(cart)
      })
      .catch(next)
  })
  .all(isAdmin)
  .get((req, res, next) => {
    Cart.findAll()
      .then(data => res.json(data))
      .catch(next)
  })

router
  .route('/:cartId')
  .all(isOwnCart)
  .get((req, res, next) => {
    Cart.findById(+req.params.cartId)
      .then(data => res.json(data))
      .catch(next)
  })
  .delete((req, res, next) => {
    Cart.destroy({where: {id: +req.params.cartId}})
      .then(success => (success ? res.sendStatus(200) : res.sendStatus(400)))
      .catch(next)
  })

router
  .route('/:cartId/items')
  .all(isOwnCart)
  .get((req, res, next) => {
    Cart.findById(+req.params.cartId)
      .then(cart => cart.getCartLineItems())
      .then(items => res.json(items))
      .catch(next)
  })
  .post((req, res, next) => {
    CartLineItem.create({
      cartId: +req.params.cartId,
      productId: +req.body.productId,
      quantity: +req.body.quantity
    })
      .then(newItem => res.json(newItem))
      .catch(next)
  })

router
  .route('/:cartId/items/:itemId')
  .all(isOwnCart)
  .get((req, res, next) => {
    CartLineItem.findById(+req.params.itemId)
      .then(item => res.json(item))
      .catch(next)
  })
  .put((req, res, next) => {
    CartLineItem.update(
      {quantity: +req.body.quantity},
      {where: {id: +req.params.itemId}, returning: true}
    )
      .spread(
        (numUpdated, updatedItem) =>
          numUpdated === 0 ? res.sendStatus(400) : res.json(...updatedItem)
      )
      .catch(next)
  })
