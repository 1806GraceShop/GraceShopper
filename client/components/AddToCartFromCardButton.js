import React from 'react'

const AddToCartFromCardButton = props => (
  <button
    className="btn-floating light-green lighten-5 right waves-effect waves-dark"
    alt="Add to Cart"
    type="button"
    onClick={() => {
      props.modifyCart()
      M.toast({html: '<h6>Added to Cart!</h6>', classes: 'green lighten-1'})
    }}
    disabled={props.disabled}
  >
    <i className="material-icons green-text text-darken-2" alt="Add to cart">
      add_shopping_cart
    </i>{' '}
  </button>
)

export default AddToCartFromCardButton
