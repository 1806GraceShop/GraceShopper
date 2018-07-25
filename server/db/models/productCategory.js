const db = require('../db')
const Sequelize = require('sequelize')

const ProductCategory  = db.define('productCategories')

module.exports = ProductCategory