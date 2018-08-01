import React from 'react'

const AddToCartFromCardButton = props => (
  <button
    className="btn-floating light-green lighten-5 right waves-effect waves-dark"
    alt="Add to Cart"
    type="button"
    onClick={() => {
      props.modifyCart()
      M.toast({html: 'Added to Cart!', classes: 'green lighten-3'})
    }}
    disabled={props.disabled}
  >
    <i className="material-icons green-text text-darken-2" alt="Add to cart">
      add_shopping_cart
    </i>{' '}
  </button>
)

export default AddToCartFromCardButton
