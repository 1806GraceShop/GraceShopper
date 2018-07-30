import React from 'react'
import {connect} from 'react-redux'
import {addItemToCart, editItemInCart, getQuantityById} from '../store'

class ModifyCartButton extends React.Component {
  // Expects a prodId prop to be give to it from higher order component.
  // Also expects a dumb button that can take an 'add' prop to be given to it.
  // expects a 'by' prop that should be a func that returns the next quantity.

  add = () => {
    const {productId, quantity, inCart } = this.props
    if () {
      this.props.editItemInCart({
        productId,
        quantity: this.props.adjust(quantity)
      })
    } else
      this.props.addItemToCart({
        productId,
        quantity: this.props.adjust(quantity)
      })
  }

  render() {
    const WrappedButton = this.props.buttonTypeComponent
    return <WrappedButton add={this.add} />
  }
}
const mapStateToProps = (state, {productId}) => ({
  quantity: getQuantityById(state.cart, productId),
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: lineItem => dispatch(addItemToCart(lineItem)),
  editItemInCart: lineItem => dispatch(editItemInCart(lineItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
