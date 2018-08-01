import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  addItemToCart,
  editItemInCart,
  getCartId,
  getLineItemByProductId,
  inventoryByProductId
} from '../store'

class ModifyCartButton extends React.Component {
  // Expects a prodId prop to be give to it from higher order component.
  // Also expects a dumb button that can take an 'add' prop to be given to it.
  modifyCart = () => {
    const {productId, cartId, lineItem, quantity} = this.props

    console.log('LINE ITEM', lineItem, lineItem.length)

    if (lineItem.id && cartId) {
      this.props.editItemInCart({
        cartId,
        lineItem: {...lineItem, quantity}
      })
    } else this.props.addItemToCart({cartId, productId, quantity})
  }
  validate = () => {}

  render() {
    const WrappedModifyCartButton = this.props.buttonTypeComponent
    return (
      <WrappedModifyCartButton
        modifyCart={this.modifyCart}
        actionName={this.props.actionName}
        disabled={this.props.disabled}
      />
    )
  }
}
const mapStateToProps = (state, {productId, nextQuantity}) => {
  const inventory = inventoryByProductId(state, productId)
  const lineItem = getLineItemByProductId(state, productId)
  const nextQuantityValue = nextQuantity(lineItem.quantity || 0)
  const quantity = nextQuantityValue >= 0 ? nextQuantityValue : 0
  return {
    lineItem,
    quantity,
    cartId: getCartId(state),
    disabled: (!lineItem.quantity && !quantity) || inventory < quantity
  }
}

const mapDispatchToProps = dispatch => ({
  addItemToCart: lineItem => dispatch(addItemToCart(lineItem)),
  editItemInCart: lineItem => dispatch(editItemInCart(lineItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCartButton)

ModifyCartButton.propTypes = {
  actionName: PropTypes.string.isRequired,
  // nextQuantity of f(currentQuantity) = nextQuantity after button push
  nextQuantity: PropTypes.func.isRequired
}
