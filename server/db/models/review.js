const db = require('../db')
const Sequelize = require('sequelize')

const Review  = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            max: 5,
            min: 0
        }
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 5000]
        }
    }
})

module.exports = Review