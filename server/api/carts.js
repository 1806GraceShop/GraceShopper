const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')

module.exports = router

// Middleware.  Checks if user is logged in.  call if checks pass.

router
  .route('/')
  .get((req, res, next) => {
    // The typical case is that this is queried when someone first lands on the
    // site.  In most cases, it won't return anything because it will be a fresh
    // session.  It is also called after users login, in which case it should
    // return the cart associated with the user.
    let query
    if (req.session.cartId) query = {id: +req.session.cartId}
    else if (req.session.passport.user)
      query = {userId: +req.session.passport.user}

    Cart.find({where: query})
      .then(cart =>
        cart.getCartItems({attributes: ['cartId', 'quantity', 'productId']})
      )
      .then(items => (items ? res.send(items) : res.send({})))
      .catch(next)
  })
  .post((req, res, next) => {
    let query

    if (req.session.cartId) query = {id: +req.session.cartId}
    else if (req.session.passport.user)
      query = {userId: +req.session.passport.user}
    else query = {sessionId: req.sessionID}

    Cart.findOrCreate({where: query})
      .spread((cart, created) => {
        // Let's log if its a new cart.
        created && console.log(`LOG: Created cart for ${req.sessionID} on POST`)
        return cart.dataValues.id
      })
      .then(cartId => {
        req.session.cartId = cartId
        return CartItem.create({
          cartId,
          productId: +req.body.productId,
          quantity: +req.body.quantity
        })
      })
      .then(newLineItem => res.status(201).send(newLineItem))
      .catch(next)
  })
  .put((req, res, next) => {
    let query

    if (req.session.cartId) query = {id: +req.session.cartId}
    else if (req.session.passport.user)
      query = {userId: +req.session.passport.user}
    else query = {sessionId: req.sessionID}

    Cart.findOrCreate({where: query})
      .spread((cart, created) => {
        created && console.log(`LOG: Created cart for ${req.sessionID} on PUT`)
        return cart.dataValues.id
      })
      .then(cartId => {
        req.session.cartId = cartId
        return CartItem.update(
          {productId: +req.body.productId, quantity: +req.body.quantity},
          {
            where: {cartId, productId: +req.body.productId},
            returning: true
          }
        )
      })
      .spread(
        (affectedCount, updatedItems) =>
          affectedCount === 1
            ? res.status(200).send(...updatedItems)
            : Error({
                status: 400,
                message: `Updated multiple rows on cart PUT ${updatedItems}`
              })
      )
      .catch(next)
  })
  .delete((req, res, next) => {
    // if (!req.session.cart) console.log(err.delErrMsg(req.sessionID))
    // // We'll continue on the chance the session had a cart and this is some
    // // Frontend bug.
    // Cart.findOrCreate({where: {sessionId: req.sessionID}})
    //   .spread((cart, created) => {
    //     created && console.log(err.DBErrMsg(req))
    //     return cart.dataValues.id
    //   })
    //   .then(cartId =>
    //     // We don't actually delete a row just set it to zero.
    //     // It won't be sent to the frontend.
    //     CartItem.update(
    //       {quantity: 0},
    //       {where: {cartId, productId: +req.body.productId}}
    //     )
    //   )
    //   .then(numDestroyed => {
    //     if (numDestroyed === 0) res.sendStatus(410)
    //     if (numDestroyed > 1)
    //       console.log(err.delResultErrMsg(req.sessionID, numDestroyed))
    //     res.sendStatus(200)
    //   })
    //   .catch(next)
    res.sendStatus(405)
  })
