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
  EditProduct
} from './components'
import {me, getProducts, getCartItems} from './store'

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
        <Route
          exact
          path="/product/:productId([0-9]*)"
          component={SingleProduct}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* LOGGED IN USER ACCESS */}
        <ProtectedRoute
          path="/home"
          component={UserHome}
          condition={isLoggedIn}
          redirect="/login"
        />
        {/* ADMIN ACCESS ONLY */}
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
  console.log('STATE.USER =', state.user)

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
      dispatch(getProducts())
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
