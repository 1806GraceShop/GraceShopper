/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/orders/', () => {
        beforeEach(() => {
            return Order.create({
                status: 'created',
                buyerName: "Jacoby Kang",
                buyerAddress: "2301 Vanderbilt Place"
            })

        })

        it('GET /api/orders', async () => {
            const res = await request(app)
                .get('/api/orders')
                .expect(200)

            expect(res.body).to.be.an('array')
            expect(res.body[0].status).to.be.equal('created')
            expect(res.body[0].buyerName).to.be.equal("Jacoby Kang")
            expect(res.body[0].buyerAddress).to.be.equal("2301 Vanderbilt Place")

        })
    }) // end describe('/api/users')

    // describe('/api/orders/:orderId', () => {
    //     beforeEach(() => {
    //         return Order.create(
    //             {
    //                 quantity: 1,
    //                 orderedPrice: "20.50",
    //                 orderId: 1
    //             })

    //     })

    //     it('GET /api/orders/:orderId', async () => {
    //         const res = await request(app)
    //             .get('/api/orders/' + 1)
    //             .expect(200)

    //         // expect(res.body).to.be.an('array')
    //         expect(res.body[0].quantity).to.be.equal(1)
    //         expect(res.body[0].orderedPrice).to.be.equal("20.50")
    //         expect(res.body[0].orderId).to.be.equal(1)

    //     })
    // }) // end describe('/api/users')
}) // end describe('User routes')