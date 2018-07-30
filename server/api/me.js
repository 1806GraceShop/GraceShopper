const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/', (req, res, next) => {
  const {firstName, lastName, address} = req.body
  User.findById(req.user.id)
    .then(usr => usr.update({firstName, lastName, address}, {returning: true}))
    .then(usr => res.json(usr))
    .catch(next)
})
