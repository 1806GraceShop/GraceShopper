import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserForm from './UserForm'
import {updateUser, getCartItems, mergeCart} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  submit = user => {
    this.props.updateUser(user)
  }
  componentDidMount() {
    if (this.props.currentCart.allIds.length)
      this.props.mergeCart(this.props.currentCart)
    else this.props.getCartItems()
  }

  render() {
    const {user, email} = this.props
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col s12">
            <h5>Welcome, {user.firstName || email}!</h5>
          </div>
          <div className="col s12 m6">
            <h5>My User Information</h5>
            <UserForm {...this.props} onSubmit={this.submit} />
          </div>
          <div className="col s12 m6">
            <h5>Past Orders</h5>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    user: state.user,
    email: state.user.email,
    currentCart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    getCartItems: () => dispatch(getCartItems()),
    mergeCart: cartState => dispatch(mergeCart(cartState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
