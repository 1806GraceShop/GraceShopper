import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let ProductForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div className="container">
      <h3>Add/Edit Product </h3>
      <br />
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 input-field">
          <Field name="title" component="input" type="text" />
          <label htmlFor="title">Product Name</label>
        </div>
        <div className="col s12 m6 input-field">
          <Field name="price" component="input" type="number" />
          <label htmlFor="price">Product Price</label>
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <div className="col s12 m6 input-field">
          <Field name="inventory" component="input" type="number" />
          <label className={props.active} htmlFor="inventory">
            Product Inventory
          </label>
        </div>
        <div className="col s12 input-field">
          <Field
            name="imageURL"
            component="input"
            type="url"
            className="validate"
          />
          <label htmlFor="imageURL">Product Image Url</label>
          <span
            className="helper-text"
            data-error="Invalid URL"
            data-success="Valid URL!"
          >
            Must be a valid URL.
          </span>
        </div>
        <div className="col s12 input-field">
          <Field name="categories" component="input" type="text" />
          <label htmlFor="catagories">Categories Placeholder Field</label>
        </div>
        <div className="col s12 input-field">
          <Field
            id="description"
            name="description"
            component="textarea"
            className="materialize-textarea"
          />
          <label htmlFor="description">Product Description</label>
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

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  initialValues: state.products.byId[match.params.productId]
})

ProductForm = reduxForm({form: 'productForm'})(ProductForm)
ProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductForm)

export default ProductForm
