const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')
module.exports = router

const DBErrMsg = req =>
  `CART ERROR [${req.sessionID}]: Created new cart in an PUT or DELETE request.
CART ERROR [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`

const putSessionErrMsg = req => `CART WARNING [${
  req.sessionID
}]: Didn't have a cart cookie in a PUT request.
CART WARNING [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`

const postMsg = sessionId => `CARTS [${sessionId}]: Created new cart.`

const postErrMsg = sessionId =>
  `CART ERROR[${sessionId}]: POSTED item that is already in cart.`

const updateErrMsg = req =>
  `CART ERROR [${req.sessionID}] was able to update multiple line items in cart.
CART ERROR [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`

const delErrMsg = sessionId =>
  `CART ERROR [${sessionId}]: Tried to delete cart but no cart cookie set.`

const delResultErrMsg = (id, num) =>
  `CART ERROR[${id}]: DELETE-d ${num} (>1) items from cart.`

router
  .route('/')
  .get((req, res, next) => {
    Cart.findOne({where: {sessionId: req.sessionID}})
      .then(cart =>
        cart.getCartItems({attributes: ['cartId', 'quantity', 'productId']})
      )
      .then(items => (items ? res.send(items) : res.sendStatus(204)))
      .catch(next)
  })
  .post((req, res, next) => {
    // it checks if there is a cart associated with that session.
    // if not it starts saving that session by setting a cart flag.
    if (!req.session.cart) req.session.cart = true
    // Now find or create the Cart in the Cart table.
    Cart.findOrCreate({where: {sessionId: req.sessionID}})
      .spread((cart, created) => {
        // Great, we found a cart or created one.
        // Destructure cart off the server response with spread
        created && console.log(postMsg(req.sessionID))
        // Let's log if its a new cart.

        return cart.dataValues.sessionId
        // and pass the id of the cart to the next promise handler
      })
      .then(
        cartId =>
          CartItem.findOrCreate({
            where: {
              cartId,
              productId: +req.body.productId,
              quantity: +req.body.quantity
            }
          })
        // construct a query to the CartItems table and return that promise to
        // the chain.
      )
      .spread((newLineItem, created) => {
        // spread out the result from the db.
        // If this was was supposed to happen, let the client know.  Or...
        if (created) res.status(201).send(newLineItem)
        else return Error({status: 405, message: postErrMsg(req)})
        // Oh no!  If `created` is falsey, that means we FOUND a line item
        // that matches the `new` product which should *never* happen.
        // This is bad.
      })
      .catch(next)
  })
  .put((req, res, next) => {
    // See POST route....roughly the same implementation
    if (!req.session.cart) {
      req.session.cart = true
      console.log(putSessionErrMsg(req))
    }

    Cart.findOrCreate({where: {sessionId: req.sessionID}})
      .spread((cart, created) => {
        created && console.log(DBErrMsg(req))
        return cart.dataValues.id
      })
      .then(cartId =>
        CartItem.update(
          {
            productId: +req.body.productId,
            quantity: +req.body.quantity
          },
          {
            where: {
              productId: +req.body.productId,
              cartId
            },
            returning: true
          }
        )
      )
      .spread(
        (affectedCount, updatedItem) =>
          affectedCount === 1
            ? res.status(200).send(updatedItem)
            : Error({status: 400, message: updateErrMsg(req)})
      )
      .catch(next)
  })
  .delete((req, res, next) => {
    if (!req.session.cart) console.log(delErrMsg(req.sessionID))
    // We'll continue on the chance the session had a cart and this is some
    // Frontend bug.
    Cart.findOrCreate({where: {sessionId: req.sessionID}})
      .spread((cart, created) => {
        created && console.log(DBErrMsg(req))
        return cart.dataValues.id
      })
      .then(cartId =>
        // We don't actually delete a row just set it to zero.
        // It won't be sent to the frontend.
        CartItem.update(
          {quantity: 0},
          {where: {cartId, productId: +req.body.productId}}
        )
      )
      .then(numDestroyed => {
        if (numDestroyed === 0) res.sendStatus(410)
        if (numDestroyed > 1)
          console.log(delResultErrMsg(req.sessionID, numDestroyed))
        res.sendStatus(200)
      })
      .catch(next)
  })
