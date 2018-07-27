const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('CartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = CartItem
