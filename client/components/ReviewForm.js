import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let ReviewForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div className="container">
      <h3>Reviews</h3>
      <br />
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 input-field">
          <Field
            id="description"
            name="description"
            component="textarea"
            className="materialize-textarea"
          />
          <label htmlFor="description">Review</label>
        </div>
        
        {/* star rating */}

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

const mapStateToProps = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  initialValues: state.reviews.byId[match.params.reviewId]
})

ReviewForm = reduxForm({form: 'reviewFrom'})(ReviewForm)
ReviewForm = connect(mapStateToProps, null)(ReviewForm)

export default ReviewForm