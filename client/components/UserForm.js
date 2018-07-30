import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let UserForm = props => {
  const {handleSubmit, pristine, submitting} = props
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
          // M.AutoInit()
          M.updateTextFields()
          M.textareaAutoResize(document.getElementById('description'))
        }, 1)}
      </script>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  initialValues: state.user
})

UserForm = reduxForm({form: 'userForm'})(UserForm)
UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm)

export default UserForm
