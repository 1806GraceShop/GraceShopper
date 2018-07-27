const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  // expects a {quantity, productId} body (will overwrite quantity in the db)
  // if (user.session)
  // it checks if there is a cart associated with that session.
  // if not it starts saving that session by setting a cart flag.
  if (!req.session.cart) req.session.cart = true

  // Now find or create the Cart in that table.
  let cart
  try {
    ;[cart] = await Cart.findOrCreate({
      where: {sessionId: req.sessionID}
    })
  } catch (err) {
    err.status = 400
    next(err)
  }

  // Update or create a new line item, based on whether
  let updatedLineItem, created
  try {
    ;[updatedLineItem, created] = await CartItem.insertOrUpdate(
      {
        where: {
          cartId: cart.id,
          productId: +req.body.quantity,
          quantity: +req.body.productId
        }
      },
      {
        options: {
          validate: true,
          returning: true
        }
      }
    )
  } catch (err) {
    err.status = 400
    next(err)
  }

  if (created) res.status(201).send(updatedLineItem)
  else res.send(200).send(updatedLineItem)
})
