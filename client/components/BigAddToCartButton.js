import React from 'react'

const BigAddToCartButton = props => (
  <button
    className="waves-effect waves-light btn"
    alt="Add to Cart"
    type="button"
    onClick={props.modifyCart}
    disabled={props.disabled}
  >
    Add to Cart
    <i className="material-icons right" alt="Add to cart">
      add_shopping_cart
    </i>
  </button>
)

export default BigAddToCartButton
