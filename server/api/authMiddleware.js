const isAdmin = (req, res, next) => {
  console.log('req.user.dataValues', req.user.dataValues)
  const error = new Error('User is not Admin')
  error.status = 400
  if (!req.user || !req.user.dataValues.admin) {
    next(error)
  } else {
    next()
  }
}

const isAuthenticated = (req, res, next) => {
  const error = new Error('User is not Authenticated')
  error.status = 400
  if (!req.user) {
    next(error)
  } else {
    next()
  }
}

module.exports = {isAdmin, isAuthenticated}
