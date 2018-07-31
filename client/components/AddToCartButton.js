import React from 'react'
import {connect} from 'react-redux'
import {
  addItemToCart,
  editItemInCart,
  quantityByProductId,
  getCartId,
  getLineItemByProductId
} from '../store'

class AddToCartButton extends React.Component {
  // Expects a prodId prop to be give to it from higher order component.
  // Also expects a dumb button that can take an 'add' prop to be given to it.
  add = () => {
    const {productId, cartId, lineItem} = this.props
    console.log('LINE ITEM', lineItem, lineItem.length)
    if (lineItem.id && cartId) {
      this.props.editItemInCart({
        cartId,
        lineItem: {...lineItem, quantity: lineItem.quantity + 1}
      })
    } else this.props.addItemToCart({cartId, productId, quantity: 1})
  }

  render() {
    const WrappedButton = this.props.buttonTypeComponent
    return <WrappedButton add={this.add} productQuantity={this.props.productQuantity}/>
  }
}
const mapStateToProps = (state, {productId}) => ({
  quantity: quantityByProductId(state, productId),
  lineItem: getLineItemByProductId(state, productId),
  cartId: getCartId(state),
  productQuantity: state.products.byId[productId].inventory // TODO: Replace with selector.

})

const mapDispatchToProps = dispatch => ({
  addItemToCart: lineItem => dispatch(addItemToCart(lineItem)),
  editItemInCart: lineItem => dispatch(editItemInCart(lineItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
