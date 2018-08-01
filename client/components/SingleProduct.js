import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  ModifyCartButton,
  BigAddToCartButton,
  AdminToolEditProduct,
  AllReviews
} from '../components'
import {getProductsReviews} from '../store'

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
            <ModifyCartButton
              productId={props.product.id}
              actionName="add"
              buttonTypeComponent={BigAddToCartButton}
              nextQuantity={quantity => ++quantity}
            />
          </div>
        </div>
        <p className="col s12 m7 pull-m5 flow-text">{description}</p>
      </div>
      <br />
      <div className="col s12">
        <Link
          to={`review/${props.match.params.productId}/add`}
          className="waves-effect green darken-2 waves-light btn"
        >
          Login to Rate and Review
          <i className="material-icons right">rate_review</i>
        </Link>
        <AllReviews review={props.review} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const productId = Number(ownProps.match.params.productId)
  return {
    product: state.products.byId[productId] || state.products.byId[0],
    review: getProductsReviews(state.reviews, productId),
    isAdmin: !!state.user.admin
  }
}

export default connect(mapStateToProps)(SingleProduct)
