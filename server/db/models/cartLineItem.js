const db = require('../db')
const Sequelize = require('sequelize')

const CartLineItem = db.define('cart_line_item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = CartLineItem
