import React from 'react'
import {ProductCard, Categories, AdminToolAddProduct} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProductsByCategory, getProductsBySearch} from '../store'

const ProductsList = props => {
  const {isAdmin} = props
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m4 l3">
          <div>
            <Categories />
          </div>
        </div>
        <div className="col s12 m8 l9">
          <AdminToolAddProduct isAdmin={isAdmin} />
          {props.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

const mapProducts = state => ({
  products: getAvailableProducts(state.products) || [],
  isAdmin: !!state.user.admin
})

const mapCategories = (state, ownProps) => ({
  products: getProductsByCategory(state, +ownProps.match.params.catId),
  isAdmin: !!state.user.admin,
})

const mapSearch = (state, ownProps) => ({
  products: getProductsBySearch(state.products, ownProps.match.params.productName),
  isAdmin: !!state.user.admin
})

export const AllProducts = connect(mapProducts)(ProductsList)
export const ProductsByCategory = connect(mapCategories)(ProductsList)
export const ProductsBySearch = connect(mapSearch)(ProductsList)

