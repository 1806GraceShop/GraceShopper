const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = CartItem
