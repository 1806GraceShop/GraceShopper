const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const OrderLineItem = require('./orderLineItem')
const Review = require('./review')

Product.belongsToMany(Category, {through: 'productCategories'})
Category.belongsToMany(Product, {through: 'productCategories'})

User.hasMany(Order)
Order.belongsTo(User)


//Order.belongsToMany(Product, {through: 'orderLineItems'})
//Product.belongsToMany(Order, {through: 'orderLineItems'})
Order.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Order)
Product.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Product)

//Product.belongsToMany(User, {through: 'reviews'})
//User.belongsToMany(Product, {through: 'reviews'})
Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderLineItem,
  Review
}
