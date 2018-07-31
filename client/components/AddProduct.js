import React from 'react'
import {ProductForm} from '../components'
import {postProduct, getProducts} from '../store'
import {connect} from 'react-redux'

class AddProducts extends React.Component {
  submit = addedProduct => {
    this.props.postProduct(addedProduct)
    //this will redirect to the thunk id
  }

  render() {
    return <ProductForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newProduct => dispatch(postProduct(newProduct))
  }
}

export default connect(null, mapDispatchToProps)(AddProducts)
