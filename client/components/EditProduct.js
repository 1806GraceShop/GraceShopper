import React from 'react'
import {ProductForm} from '../components'

class EditProducts extends React.Component {
  submit = values => {
    console.log(values)
  }
  render() {
    return <ProductForm {...this.props} onSubmit={this.submit} />
  }
}

export default EditProducts
