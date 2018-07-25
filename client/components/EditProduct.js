import React from 'react'
import {ProductForm} from '../components'
import {updateProductById} from '../store'
import {connect} from 'react-redux'

class EditProducts extends React.Component {
  submit = editedProduct => {
    this.props.updateProductById(editedProduct)
    this.props.history.push(`/product/${this.props.match.params.productId}`)
  }
  render() {
    return <ProductForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => ({
  updateProductById: product => dispatch(updateProductById(product))
})

export default connect(null, mapDispatchToProps)(EditProducts)
