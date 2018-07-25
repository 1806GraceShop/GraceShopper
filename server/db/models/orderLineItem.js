const db = require('../db')
const Sequelize = require('sequelize')

const OrderLineItem  = db.define('orderLineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true
        }
    },
    orderedPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = OrderLineItem