import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartItemsWithDetails} from '../store'

/**
 * COMPONENT
 */
export const CartView = ({cart}) => {
  return (
    <div className="container">
      <h3>Your Cart</h3>
      <table className="striped">
        <thead>
          <tr>
            <th>Item Name </th>
            <th>Item Price </th>
            <th />
            <th>Quantity </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.cartItemId}>
              <td>{item.product.title}</td>
              <td>${item.product.price}</td>
              <td className="right-align">
                <a className="waves-effect waves-teal btn-small">
                  <i className="material-icons ">remove</i>
                </a>
              </td>
              <td className="center-align">{item.cartItem.quantity}</td>
              <td className="left-align">
                <a className="waves-effect waves-teal btn-small">
                  <i className="material-icons">add</i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="btn right">
        CHECKOUT BUTTON PLACEHOLDER
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  cart: getCartItemsWithDetails(state)
})

export default connect(mapState)(CartView)

/**
 * PROP TYPES
 */
CartView.propTypes = {
  cart: PropTypes.array
}
