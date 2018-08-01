const db = require('../db')
const Sequelize = require('sequelize')

const Cart = db.define('cart', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Cart
