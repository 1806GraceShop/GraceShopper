const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const OrderProduct = require('./OrderProduct')
const Review = require('./review')

Product.belongsToMany(Category, {through: 'ProductCategories'})
Category.belongsToMany(Product, {through: 'ProductCategories'})

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderProduct,
  Review
}
