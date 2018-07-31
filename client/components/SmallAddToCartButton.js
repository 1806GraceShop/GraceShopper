import React from 'react'

const SmallAddToCartButton = props => (
  <button
    type="button"
    onClick={props.add}
    className="waves-effect waves-teal btn-small"
    disabled={!props.productQuantity}
  >
    <i className="material-icons" alt="add to cart">
      add
    </i>
  </button>
)

export default SmallAddToCartButton
