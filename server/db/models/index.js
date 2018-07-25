const User = require('./user')
const Product = require('./product')
const Category = require('./category')

Product.belongsToMany(Category, {through: 'productCategories'})
Category.belongsToMany(Product, {through: 'productCategories'})

module.exports = {
  User,
  Product,
  Category
}
