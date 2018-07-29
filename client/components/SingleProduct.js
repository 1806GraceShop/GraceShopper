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
        <div className="col s12">
          <div className="card red lighten-5  center-align">
            <div className="card-content">
              <div className="flow-text">Admin Tools</div>
              <div className="flow-text">
                (We have {inventory} of this product left.)
              </div>
              <Link
                to={`${props.match.url}/edit`}
                className="waves-effect red waves-light btn"
              >
                Edit Product
                <i className="material-icons right">edit</i>
              </Link>
            </div>
          </div>
        </div>
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
    product: state.products.byId[id] || state.products.byId[0]
  }
}

export default connect(mapStateToProps)(SingleProduct)
