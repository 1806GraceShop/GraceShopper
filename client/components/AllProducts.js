import React from 'react'
import {ProductCard, Categories} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProducts, getProductsByCategory} from '../store'

const ProductsList = props => {
    console.log('this.props.products', props.products)
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <div>
              <Categories />
            </div>
          </div>
          <div className="col s12 m8 l9">
            {props.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
}

const mapProducts = (state) => ({ 
  products: getAvailableProducts(state.products) || []
})

const mapCategories = (state, ownProps) => {
  const catId = Number(ownProps.match.params.catId)
  return {
    products: getProductsByCategory(state, catId)
  }
}

export const AllProducts = connect(mapProducts)(ProductsList)
export const ProductsByCategory = connect(mapCategories)(ProductsList)