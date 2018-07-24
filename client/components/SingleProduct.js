import React from 'react'
import {connect} from 'react-redux'
// import {getAvailableProducts, getProducts} from '../store'

// const dummyData = {
//   name: 'Product Name',
//   id: 1,
//   description: 'Test description',
//   price: 3.0,
//   quantity: 10,
//   imageUrl: 'https://www.fillmurray.com/200/300'
// }

class SingleProduct extends React.Component {
  componentDidMount() {
    //componentDidMount is only here so my linter won't yell at me regarding this being a class component
  }

  render() {
    const {name, imageUrl, description, quantity, price} = this.props.product
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <h4>{name}</h4>
            <h6>${price}</h6>
            <h6>Qty: {quantity}</h6>
            <p>{description}</p>
            <div className="row">
              <a className="col s3 waves-effect waves-light btn">
                Edit Product
              </a>
              <a className="col s3 waves-effect waves-light btn">Add to Cart</a>
            </div>
          </div>
          <div className="col s6">
            <img src={imageUrl} />
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
  //   // getProducts: () => dispatch(getProducts())
})

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.productId
  return {
    product: state.byId[id]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
