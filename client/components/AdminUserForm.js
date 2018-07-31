import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let AdminUserForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 m6 input-field">
          <Field name="firstName" component="input" type="text" />
          <label htmlFor="title">First Name!</label>
        </div>
        <div className="col s12 m6 input-field">
          <Field name="lastName" component="input" type="text" />
          <label htmlFor="title">Last Name</label>
        </div>
        <div className="col s12 input-field">
          <Field name="address" component="input" type="text" />
          <label htmlFor="title">Address</label>
        </div>
        <div className="col s12 input-field">
          <Field name="email" disabled={true} component="input" type="text" />
          <label htmlFor="title">Email</label>
        </div>
        <button
          className="btn waves-effect waves-light"
          disabled={pristine || submitting}
          type="submit"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
      <script>
        {setTimeout(() => {
          M.updateTextFields()
        }, 1)}
      </script>
    </div>
  )
}

const mapStateToProps = (state, {match}) => {
  return {
    initialValues: state.allUsers.byId[match.params.userId]
  }
}

AdminUserForm = reduxForm({form: 'adminUserForm', enableReinitialize: true})(
  AdminUserForm
)
AdminUserForm = connect(mapStateToProps)(AdminUserForm)

export default AdminUserForm
