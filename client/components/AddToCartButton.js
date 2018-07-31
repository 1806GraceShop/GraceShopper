import React from 'react'
import {connect} from 'react-redux'
import {addItemToCart, editItemInCart, addToCartQuantity} from '../store'

class AddToCartButton extends React.Component {
  // Expects a prodId prop to be give to it from higher order component.
  // Also expects a dumb button that can take an 'add' prop to be given to it.
  add = () => {
    const {productId, modifyCartQuantity} = this.props
    if (this.props.isInCart) {
      this.props.editItemInCart({productId, modifyCartQuantity})
    } else this.props.addItemToCart({productId, modifyCartQuantity})
  }

  render() {
    const WrappedButton = this.props.buttonTypeComponent
    return <WrappedButton add={this.add} productQuantity={this.props.productQuantity}/>
  }
}
const mapStateToProps = (state, {productId}) => ({
  modifyCartQuantity: addToCartQuantity(state.cart, productId),
  isInCart: !!state.cart.byProductId[productId],
  productQuantity: state.products.byId[productId].inventory
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: lineItem => dispatch(addItemToCart(lineItem)),
  editItemInCart: lineItem => dispatch(editItemInCart(lineItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
