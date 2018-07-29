import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCart} from '../store'

/**
 * COMPONENT
 */
export const CartView = ({cart}) => {
  return (
    <div className="container">
      <h3>Your Cart</h3>
      <table className="striped responsive-table">
        <thead>
          <tr>
            <th>Item Name </th>
            <th>Item Price </th>
            <th>Quantity </th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.lineItemId}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: getCart(state)
  }
}

export default connect(mapState)(CartView)

/**
 * PROP TYPES
 */
CartView.propTypes = {
  cart: PropTypes.array
}
