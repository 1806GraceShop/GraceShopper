'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  ProductCategory,
  Order,
  OrderLineItem,
  Review,
  Cart
} = require('../server/db/models')

const cartData = require('./CartData.json')
const productData = require('./ProductData.json')
const categoriesData = require('./CategoriesData.json')
const productCategoriesData = require('./ProductCategoriesData.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'codylastname',
      address: '123 main st, city, ST, ZIP',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'murphylastname',
      address: '456 main st, city, ST, ZIP',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all(
    productData.map(product => Product.create(product))
  )

  const categories = await Promise.all(
    categoriesData.map(category => Category.create(category))
  )

  const productCategories = await Promise.all(
    productCategoriesData.map(productCategory =>
      ProductCategory.create(productCategory)
    )
  )

  const carts = await Promise.all(cartData.map(cart => Cart.create(cart)))

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${productCategories.length} productCategory associations`)
  console.log(`seeded ${cartData.length} carts successfully`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
