import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTotalItemsInCart, logout, emptyCart} from '../store'

const CartBadge = props => (
  <li>
    <Link to="/cart">
      {' '}
      Cart{' '}
      <span
        className="new light-blue darken-1 badge"
        data-badge-caption="items"
      >
        {props.cartSize}
      </span>
    </Link>
  </li>
)

const LoggedInLinks = props => (
  <span>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <li>
      <a href="#" onClick={props.handleClick}>
        Logout
      </a>
    </li>
  </span>
)

const LoggedOutLinks = props => (
  <span>
    {' '}
    <li>
      {' '}
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/signup">Sign Up</Link>
    </li>
  </span>
)

const Navbar = props => (
  <div className="navbar-fixed">
    <nav className="light-red lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo logo-container">
          <i className="material-icons">store_mall_directory</i>
          <span className="flow-text truncate"> Grace Shopper </span>
        </Link>

        <ul className="right hide-on-med-and-down">
          {props.isLoggedIn ? <LoggedInLinks {...props} /> : <LoggedOutLinks />}
          <CartBadge {...props} />
        </ul>
        <ul id="nav-mobile" className="sidenav">
          <CartBadge {...props} />
          {props.isLoggedIn ? <LoggedInLinks {...props} /> : <LoggedOutLinks />}
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartSize: getTotalItemsInCart(state)
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(emptyCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
