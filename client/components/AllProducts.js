import React from 'react'
import {ProductCard, Categories} from '../components'
import {connect} from 'react-redux'
import {getAvailableProducts, getProducts, getProductsByCategory} from '../store'


// ^^^^^^^^^^ don't forget to wire up and import the new components and stores

// This is from https://reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}// ---------------------------------------------------------------------------


class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.categoryClick = this.categoryClick.bind(this)
  }

categoryClick(catId) {
  console.log('CLICK HAPPENED:', catId)
  this.setState({
    catId
})
}


  // const productsByCategory = this.props.productsByCategory


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <p>
              <ErrorBoundary>
              <p>Filtering Placeholder in AllProducts component</p>
              {/* <Categories /> */}
              <Categories handleClick={this.categoryClick} />
              </ErrorBoundary>
            </p>
          </div>
          <div className="col s12 m8 l9">
            {this.props.products.map(product => (
              <ProductCard key={product.id} product={product} />

//       ^^^^^^^^ this is where I have to tell it that I want to map all or filtered products (maybe... see my code and what Mike slacked me)


            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

//  ^^^^^^^^ shouldn't have to do anything here since weva already dispathced and reterieved all the datsa

const mapStateToProps = (state, ownProps) => ({ //// own props optional.... i have all of state available to me.
  products: getAvailableProducts(state.products),
  // productsByCategory: getProductsByCategory(state, catId)
})

// ^^^^^^^^  call a different getAvailableProduct(state.FILTEREDproductds)

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
