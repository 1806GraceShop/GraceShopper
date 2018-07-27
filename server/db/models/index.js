const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const ProductCategory = require('./productCategory')
const Order = require('./order')
const OrderLineItem = require('./orderLineItem')
const Review = require('./review')

Product.belongsToMany(Category, {through: ProductCategory})
Category.belongsToMany(Product, {through: ProductCategory})

User.hasMany(Order)
Order.belongsTo(User)


//Order.belongsToMany(Product, {through: OrderLineItem})
//Product.belongsToMany(Order, {through: OrderLineItem})
Order.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Order)
Product.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Product)

//Product.belongsToMany(User, {through: Review})
//User.belongsToMany(Product, {through: Review})
Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Order,
  OrderLineItem,
  Review
}
