import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserForm from './UserForm'
import {updateUser} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  submit = user => {
    this.props.updateUser(user)
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
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
