import React from 'react'

const BigAddToCartButton = props => (
  <button
    className="waves-effect waves-light btn teal lighten-1"
    alt="Add to Cart"
    type="button"
    onClick={() => {
      props.modifyCart()
      M.toast({html: '<h6>Added to Cart!</h6>', classes: 'green lighten-1'})
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
