const { db } = require('./server/db')
const Product = require('./server/db/product')
const ProductData = require('./ProductData')


const seed = async () => {
    try {
        await db.sync({ force: true })

        await Promise.all(ProductData.map(products =>
            Product.create(products)
        ))

        db.close()

    } catch (error) {
        console.log('There is an error in seeding', error)
    }
}

seed()

