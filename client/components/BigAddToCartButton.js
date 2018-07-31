import React from 'react'

// console.log('props in the big add', this.props)
const BigAddToCartButton = props => (
  <button
    className="waves-effect waves-light btn"
    alt="Add to Cart"
    type="button"
    onClick={props.add}
    disabled={!props.productQuantity}
  >
    Add to Cart
    <i className="material-icons right" alt="Add to cart">
      add_shopping_cart
    </i>
  </button>
)

export default BigAddToCartButton
