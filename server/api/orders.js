const router = require('express').Router()
const { OrderLineItem } = require('../db/models')
//when you can view all the orders
const { isAdmin } = require('./authMiddleware')

module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const orders = await OrderLineItem.findAll({})
        res.json(orders)
    } catch (err) {
        next(err)
    }
})

router.get('/:orderId', async (req, res, next) => {
    try {
        const orderId = req.params.order
        const order = await OrderLineItem.findById(orderId)
        res.json(order)
    } catch (err) {
        next(err)
    }
})