const db = require('../db')
const Sequelize = require('sequelize')

const CartLineItem = db.define('cartLineItem', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = CartLineItem
