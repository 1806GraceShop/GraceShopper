import React from 'react'
import {ProductCard, AdminToolAddProduct} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts} from '../store'

const AllProducts = props => {
  const {isAdmin} = props
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m4 l3">
          <p>Filtering Placeholder</p>
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

const mapStateToProps = state => ({
  products: getAvailableProducts(state.products),
  isAdmin: !!state.user.admin
})

export default connect(mapStateToProps)(AllProducts)
