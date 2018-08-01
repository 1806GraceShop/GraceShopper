import React from 'react'
import {connect} from 'react-redux'
import {getCartId, newCart} from '../store'

const DeleteCartButton = props => (
  <button
    className="btn-small red darken-3 left waves-effect waves-dark right"
    alt="Delete Cart"
    type="button"
    onClick={props.deleteCart}
    disabled={props.disabled}
  >
    <i className="material-icons white-text right" alt="Delete Cart">
      remove_shopping_cart
    </i>{' '}
    Delete Cart
  </button>
)

const mapStateToProps = state => ({
  cartId: getCartId(state)
})
const mapDispatchToProps = dispatch => ({
  deleteCart: () => dispatch(newCart())
})
export default connect(mapStateToProps, mapDispatchToProps)(DeleteCartButton)
