import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import validator from 'validator'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be at most 500 characters` : undefined
const minLength = min => value =>
  value && value.length < min ? `Must be at least 10 characters` : undefined
const maxLength500 = maxLength(500)
const minLength10 = minLength(10)

const minRating = value =>
  value && value < 0 ? `Must be at least 0` : undefined
const maxRating = value =>
  value && value > 5 ? `Must be at most 5` : undefined


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let ReviewForm = props => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <div className="container">
      <h3>Reviews</h3>
      <br />
      <form id="review-form" className="row" onSubmit={handleSubmit}>
        <div className="col s12 input-field">
          <Field
            name="body"
            type="text"
            component={renderField}
            label="Body"
            className="materialize-textarea"
            validate={[required, maxLength500, minLength10]}
          />
        </div>
        <div className="col s12 m6 input-field">
          <Field
            name="rating"
            type="number"
            component={renderField}
            label="Rating"
            validate={[required, minRating, maxRating]}
          />
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
      {/* Hackish, needs to be rethought, but neccessary to keep materialize from
      blocking input with labels. see https://materializecss.com/text-inputs.html */}
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

const mapStateToProps = (state, { match }) => ({
  // This `initialValues` variable name below is required by redux-forms
  initialValues: state.reviews.byId[match.params.reviewId]
})

ReviewForm = reduxForm({ form: 'reviewFrom' })(ReviewForm)
ReviewForm = connect(mapStateToProps, null)(ReviewForm)

export default ReviewForm