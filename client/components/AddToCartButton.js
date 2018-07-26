import React from 'react'
import {connect} from 'react-redux'
import {addItemToCart} from '../store'

class AddToCartButton extends React.Component {
  // Expects a prodId prop to be give to it from higher order component.
  add = () => {
    this.props.addItemToCart(this.props.prodId)
  }

  render() {
    return (
      <button
        className="waves-effect waves-light btn"
        alt="Add to Cart"
        type="button"
        onClick={this.add}
      >
        Add to Cart
        <i className="material-icons right" alt="Add to cart">
          add_shopping_cart
        </i>
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItemToCart: productId => dispatch(addItemToCart(productId))
})

export default connect(null, mapDispatchToProps)(AddToCartButton)
