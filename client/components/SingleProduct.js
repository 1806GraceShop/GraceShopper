import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AddToCartButton} from '../components'

const SingleProduct = props => {
  const {title, imageURL, description, inventory, price} = props.product
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col s6">
          <h4>{title}</h4>
          <div className="col s6">${price}</div>
          <div className="col s6">
            <AddToCartButton prodId={props.product.id} />
          </div>
          <h4>{title}</h4>
          <h6>${price}</h6>
          <h6>Qty: {inventory}</h6>
          <p>{description}</p>
          <div className="row">
            <Link
              to={`${props.match.url}/edit`}
              className="col s3 waves-effect waves-light btn"
            >
              Edit Product
            </Link>
            <a className="col s3 waves-effect waves-light btn">Add to Cart</a>
          </div>
        </div>
        <div className="col s6">
          <img src={imageURL} />
        </div>
        <div className="col s12">
          <h5>Reviews</h5>
          <h6>First Review Title</h6>
          <p>Reviews content here...</p>
        </div>
        <h6>Product Stock: {inventory}</h6>
        <p>{description}</p>
        <Link
          to={`${props.match.url}/edit`}
          className="waves-effect red waves-light btn"
        >
          Edit Product
          <i className="material-icons right">edit</i>
        </Link>
        <div className="col s6">
          <img src={imageURL} />
        </div>
        <div className="col s12">
          <h5>Reviews</h5>
          <h6>First Review Title</h6>
          <p>Reviews content here...</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.byId[id] || state.products.byId[0]
  }
}

export default connect(mapStateToProps)(SingleProduct)
