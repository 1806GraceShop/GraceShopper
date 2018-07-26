import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AddProduct,
  EditProduct,
  AddReview,
  EditReview
} from './components'
import {me, getProducts, getReviews} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.loadInitialData()
    this.props.getReviews()
  }

  render() {
    const {isLoggedIn} = {isLoggedIn: true} // this.props FLAG FLAG FLAG

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllProducts} />
        <Route
          exact
          path="/product/:productId([0-9]*)"
          component={SingleProduct}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/product/add" component={AddProduct} />
            <Route path="/product/:productId/edit" component={EditProduct} />
            <Route path="/review/:productId/add" component={AddReview} />
            <Route path="/review/:productId/:reviewId/edit" component={EditReview} />
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    loadInitialData() {
      dispatch(me())
    },
    getReviews: () => dispatch(getReviews())

  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
