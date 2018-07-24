import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper container">
        <Link to="/" href="#" className="brand-logo">
          <i className="material-icons">store_mall_directory</i>Grace Shopper
        </Link>
        {/* TODO: Handle links when viewport gets small. */}
        <ul className="right">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <li>
                {' '}
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
