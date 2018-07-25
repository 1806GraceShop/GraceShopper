const db = require('../db')
const Sequelize = require('sequelize')

const Product  = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Product Name',
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'Product Description.',
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            notEmpty: true
        }
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: true
        }
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'image.jpg',
        validate: {
            notEmpty: true
        }
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = Product