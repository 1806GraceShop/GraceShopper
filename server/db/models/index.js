const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const ProductCategory = require('./productCategory')
const Order = require('./order')
const OrderLineItem = require('./orderLineItem')
const Review = require('./review')
const Cart = require('./cart')
const CartItem = require('./cartItem')

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
Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)
Product.belongsToMany(Cart, {through: CartItem})
Cart.belongsToMany(Product, {through: CartItem})

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Order,
  OrderLineItem,
  Review,
  Cart,
  CartItem
}
