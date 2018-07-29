const db = require('../db')
const Sequelize = require('sequelize')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Cart
