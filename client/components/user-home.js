import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, email} = props

  return (
    <div className="container">
      <h3>Welcome, {user.firstName || email}!</h3>
      <div className="row">
        <h3 className="col s12">Hello</h3>
        <div className="col s12 m5 push-m7 center-align">
          {/* <img className="responsive-img" src={imageURL} /> */}
        </div>

        <p className="col s12 m7 pull-m5">Description</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
