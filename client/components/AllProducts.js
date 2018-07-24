import React from 'react'
import {ProductCard} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProducts} from '../store'

class AllProducts extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <p>Filtering Placeholder</p>
          </div>
          <div className="col s12 m8 l9">
            {this.props.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
