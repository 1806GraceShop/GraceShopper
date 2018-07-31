import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminUserForm from './AdminUserForm'
import {updateUser} from '../store/user'
import {getAllUsers, getActiveUsers} from '../store'
import {Link} from 'react-router-dom'

class AdminHome extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  submit = user => {
    this.props.updateUser(user)
  }

  render() {
    const {user, email, allUsers} = this.props
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col s12">
            <h5>Welcome, ADMINISTRATOR {user.firstName || email}!</h5>
          </div>
          <div className="col s12 m6">
            <h5>Alter Indiscriminate User</h5>
            <AdminUserForm {...this.props} onSubmit={this.submit} />
          </div>
          <div className="col s12 m6">
            <h5>Users</h5>
            <div className="userScroll">
              {allUsers.map(usr => (
                <Link to={`/admin/user/${usr.id}`} key={usr.id}>
                  <p>{usr.email}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    email: state.user.email,
    allUsers: getActiveUsers(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  // email: PropTypes.string
}
