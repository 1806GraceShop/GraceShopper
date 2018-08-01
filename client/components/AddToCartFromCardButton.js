import React from 'react'

const AddToCartFromCardButton = props => (
  <button
    className="btn-floating white right"
    alt="Add to Cart"
    type="button"
    onClick={props.modifyCart}
    disabled={props.disabled}
  >
    <i className="material-icons green-text" alt="Add to cart">
      add_shopping_cart
    </i>{' '}
  </button>
)

export default AddToCartFromCardButton
