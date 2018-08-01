import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCartItemsWithDetails} from '../store'
import {
  ModifyCartButton,
  SmallModifyCartButton,
  DeleteCartButton
} from '../components'

/**
 * COMPONENT
 */
export const CartView = ({cart, emptyCart}) => {
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
          {emptyCart ? (
            <tr>
              <td colSpan="5">Your cart is empty!</td>
            </tr>
          ) : (
            cart.map(item => (
              <tr key={item.cartItemId}>
                <td className="valign-wrapper">
                  <img src={item.product.imageURL} height="50px" />
                  <p style={{paddingLeft: '10px'}}>{item.product.title}</p>
                </td>
                <td>${item.product.price}</td>
                <td className="right-align">
                  <ModifyCartButton
                    productId={item.product.id}
                    buttonTypeComponent={SmallModifyCartButton}
                    actionName="remove"
                    nextQuantity={quantity => --quantity}
                  />
                </td>
                <td className="center-align">{item.cartItem.quantity}</td>
                <td className="left-align">
                  <ModifyCartButton
                    productId={item.product.id}
                    buttonTypeComponent={SmallModifyCartButton}
                    actionName="add"
                    nextQuantity={quantity => ++quantity}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <br />

      <div className="left">
        <DeleteCartButton disabled={emptyCart} />
      </div>
      <br />
      <button type="button" className="btn right" disabled={emptyCart}>
        Checkout
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  cart: state.cart.cartId ? getCartItemsWithDetails(state) : [],
  emptyCart: !state.cart.cartId || !state.cart.allIds.length
})

export default connect(mapState)(CartView)

/**
 * PROP TYPES
 */
CartView.propTypes = {
  cart: PropTypes.array
}
