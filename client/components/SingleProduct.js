import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AddToCartButton, AdminToolEditProduct} from '../components'

const SingleProduct = props => {
  const {isAdmin, match, product} = props
  const {title, imageURL, description, inventory, price} = product

  return (
    <div className="container">
      <br />
      <div className="row">
        <AdminToolEditProduct
          isAdmin={isAdmin}
          match={match}
          inventory={inventory}
        />
        <h3 className="col s12">{title}</h3>
        <div className="col s12 m5 push-m7 center-align">
          <img className="responsive-img" src={imageURL} />
        </div>
        <div className="col s12 m7 pull-m5 center-align">
          <h6 className="col s12 m3 flow-text">${price}</h6>
          <div className="col s12 m9">
            <AddToCartButton productId={props.product.id} />
          </div>
        </div>
        <p className="col s12 m7 pull-m5">{description}</p>
      </div>
      <br />
      <div className="col s12">
        <h5>Reviews</h5>
        <h6>First Review Title</h6>
        <p>Reviews content here...</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.byId[id] || state.products.byId[0],
    isAdmin: !!state.user.admin
  }
}

export default connect(mapStateToProps)(SingleProduct)
