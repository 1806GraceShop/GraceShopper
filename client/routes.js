import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AddProduct,
  EditProduct,
  AdminHome,
  AddReview,
  EditReview,
  AllReviews,
  CartView,
  ProductsByCategory,
  ProductsBySearch
} from './components'
import {
  me,
  getProducts,
  getCategories,
  getProdCats,
  getReviews,
  getCartItems
} from './store'

const ProtectedRoute = ({component: Comp, condition, redirect, path}) => (
  <Route
    path={path}
    render={props =>
      condition ? <Comp {...props} /> : <Redirect to={redirect} />
    }
  />
)

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {' '}
        {/* ALL VISITORS ACCESS */}
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/category/:catId" component={ProductsByCategory} />
        <Route exact path="/search/:productName" component={ProductsBySearch} />
        <Route exact path="/search" component={AllProducts} />
        <Route exact path="/cart" component={CartView} />
        <Route
          exact
          path="/product/:productId([0-9]*)"
          component={SingleProduct}
        />
        <Route
          exact
          path="/review/:productId/:reviewId([0-9]*)"
          component={AllReviews}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* LOGGED IN USER ACCESS */}
        <ProtectedRoute
          path="/product/review/:productId/add"
          component={AddReview}
          condition={isLoggedIn}
          redirect="/login"
        />
        <ProtectedRoute
          path="/review/:productId/:reviewId/edit"
          component={EditReview}
          condition={isLoggedIn}
          redirect="/login"
        />
        <ProtectedRoute
          path="/home"
          component={UserHome}
          condition={isLoggedIn}
          redirect="/login"
        />
        {/* ADMIN ACCESS ONLY */}
        <ProtectedRoute
          path="/admin/user/:userId"
          component={AdminHome}
          condition={true}
          redirect="/login"
        />
        <ProtectedRoute
          path="/admin"
          component={AdminHome}
          condition={true}
          redirect="/login"
        />
        <ProtectedRoute
          path="/product/:productId/edit"
          component={EditProduct}
          condition={isAdmin}
          redirect="/login"
        />
        <ProtectedRoute
          path="/product/add"
          component={AddProduct}
          condition={isAdmin}
          redirect="/login"
        />
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
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getCategories())
      dispatch(getProducts())
      dispatch(getProdCats())
      dispatch(getReviews())
      dispatch(getCartItems())
    }
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
