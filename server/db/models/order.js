const db = require('../db')
const Sequelize = require('sequelize')

const Order  = db.define('order', {
    status: {
        type: Sequelize.ENUM('created', 'processing', 'cancelled', 'shipped'),
        allowNull: false,
        defaultValue: 'created',
        validate: {
            notEmpty: true
        }
    },
    buyerName: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    buyerAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Order