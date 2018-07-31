const isAdmin = (req, res, next) => {
  if (req.user && req.user.dataValues.admin) next()
  else {
    console.log('AUTH-MIDDLEWARE: Request failed @ isAdmin')
    res.sendStatus(404)
  }
}

const isAuthenticated = (req, res, next) => {
  if (req.user) next()
  else {
    console.log('AUTH-MIDDLEWARE: Request failed @ isAuthenticated')
    res.sendStatus(404)
  }
}

const isOwnCart = (req, res, next) => {
  // admins can do this.
  if (req.user && req.user.dataValues.admin) next()
  else if (+req.session.cartId === +req.params.cartId)
    // but otherwise, you can only do this if it is your cart
    next()
  else {
    console.log('AUTH-MIDDLEWARE: Request failed @ isOwnCart')
    res.sendStatus(404)
  }
}

module.exports = {isAdmin, isAuthenticated, isOwnCart}
