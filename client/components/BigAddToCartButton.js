import React from 'react'

const BigAddToCartButton = props => (
  <button
    className="waves-effect waves-light btn teal lighten-1"
    alt="Add to Cart"
    type="button"
    onClick={() => {
      props.modifyCart()
      M.toast({html: 'Added to Cart!', classes: 'green lighten-3'})
    }}
    disabled={props.disabled}
  >
    Add to Cart
    <i className="material-icons right" alt="Add to cart">
      add_shopping_cart
    </i>
  </button>
)

export default BigAddToCartButton
