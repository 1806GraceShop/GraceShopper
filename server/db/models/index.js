const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const ProductCategory = require('./productCategory')
const Order = require('./order')
const OrderLineItem = require('./orderLineItem')
const Review = require('./review')
const Cart = require('./cart')
const CartLineItem = require('./cartLineItem')

Product.belongsToMany(Category, {through: ProductCategory})
Category.belongsToMany(Product, {through: ProductCategory})

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

Cart.belongsTo(User)
Cart.hasMany(CartLineItem)
CartLineItem.belongsTo(Cart)
Product.belongsToMany(Cart, {through: CartLineItem})
Cart.belongsToMany(Product, {through: CartLineItem})


module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Order,
  OrderLineItem,
  Review,
  Cart,
  CartLineItem
}
