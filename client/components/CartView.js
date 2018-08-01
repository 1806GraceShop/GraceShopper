import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartItemsWithDetails} from '../store'
import {ModifyCartButton, SmallModifyCartButton} from '../components'

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
                <ModifyCartButton
                  productId={item.product.id}
                  buttonTypeComponent={SmallModifyCartButton}
                  actionName="remove"
                />
              </td>
              <td className="center-align">{item.cartItem.quantity}</td>
              <td className="left-align">
                <ModifyCartButton
                  productId={item.product.id}
                  buttonTypeComponent={SmallModifyCartButton}
                  actionName="add"
                />
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
