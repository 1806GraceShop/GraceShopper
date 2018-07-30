const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/update', (req, res, next) => {
  console.log('REQ.USER inside /update', req.user)
  console.log('REQ.BODY in /update', req.body)
  const {firstName, lastName, address} = req.body
  User.findById(req.user.id)
    .then(usr => usr.update({firstName, lastName, address}))
    .then(usr => res.json(usr))
    .catch(next)

  // if (!user) {
  //   console.log('No such user found:', req.body.email)
  // } else if (!user.correctPassword(req.body.password)) {
  //   console.log('Incorrect password for user:', req.body.email)
  //   res.status(401).send('Wrong username and/or password')
  // } else {
  //   await user.update({firstName, lastName, address})
  //   res.json(user)
  // }
})
