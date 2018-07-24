import React from 'react'
import {ProductCard} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProducts} from '../store'

// const dummyData = [
//   {
//     name: 'Test',
//     id: 1,
//     description: 'Test description',
//     price: '$3.00',
//     imageUrl: 'https://www.fillmurray.com/200/300'
//   },
//   {
//     name: 'Test 2',
//     id: 2,
//     description: 'Test description 2',
//     price: '$4.00',
//     imageUrl: 'https://www.fillmurray.com/200/300'
//   },
//   {
//     name: 'Test 3',
//     id: 3,
//     description: 'Test description 3',
//     price: '$5.00',
//     imageUrl: 'https://www.fillmurray.com/200/300'
//   }
// ]

class AllProducts extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  products: getAvailableProducts(state.products)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
