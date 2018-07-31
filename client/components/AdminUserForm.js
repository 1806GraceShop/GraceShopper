import React from 'react'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'

let AdminUserForm = props => {
  const {admin, handleSubmit, pristine, submitting} = props
  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 m6 input-field">
          <Field name="firstName" component="input" type="text" />
          <label htmlFor="title">First Name</label>
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

        <div className="input-field col s12">
          <Field name="admin" id="adminSelect" component="select">
            <option value="" disabled selected>
              Administrator
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </Field>
          <label htmlFor="title">Admin</label>
        </div>

        <button
          className="col s6 btn waves-effect waves-light"
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
          M.FormSelect.init(document.getElementById('adminSelect'))
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
