import React from 'react'

const SmallModifyCartButton = props => (
  <button
    type="button"
    onClick={props.modifyCart}
    className="waves-effect waves-teal btn-small"
    disabled={props.disabled}
  >
    <i className="material-icons" alt={`${props.actionName} to cart`}>
      {props.actionName}
    </i>
  </button>
)

export default SmallModifyCartButton
