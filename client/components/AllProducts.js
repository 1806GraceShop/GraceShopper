import React from 'react'
import {ProductCard} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProducts} from '../store'

class AllProducts extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

const mapStateToProps = state => ({
  products: getAvailableProducts(state.products)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
