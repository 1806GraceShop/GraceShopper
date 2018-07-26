const db = require('../db')
const Sequelize = require('sequelize')

const ProductCategory  = db.define('productCategories', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }
})

module.exports = ProductCategory