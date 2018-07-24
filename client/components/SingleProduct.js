import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store'

class SingleProduct extends React.Component {
  render() {
    console.log('this.props', this.props)
    const {title, imageURL, description, inventory, price} = this.props.product
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <h4>{title}</h4>
            <h6>${price}</h6>
            <h6>Qty: {inventory}</h6>
            <p>{description}</p>
            <div className="row">
              <a className="col s3 waves-effect waves-light btn">
                Edit Product
              </a>
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
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

const mapStateToProps = (state, ownProps) => {
  console.log('state.products = ', state.products)
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.byId[id] || state.products.byId[0]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
