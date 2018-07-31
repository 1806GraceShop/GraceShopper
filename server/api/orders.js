const router = require('express').Router()
const { Order } = require('../db/models')
//when you can view all the orders
const { isAdmin } = require('./authMiddleware')

module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll({})
        res.json(orders)
    } catch (err) {
        next(err)
    }
})

router.get('/:orderId', async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findById(orderId)
        res.json(order)
    } catch (err) {
        next(err)
    }
})