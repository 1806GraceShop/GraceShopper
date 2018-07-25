import React from 'react'
import { Field, reduxForm } from 'redux-form'

// TESTER

{
  /* <ProductForm
          product={{
            title: 'Test',
            price: '3.50',
            description: 'test description',
            inventory: 3,
            imageUrl:
              'https://m.media-amazon.com/images/M/MV5BMTQ1OTM0MjEwOF5BMl5BanBnXkFtZTYwNTQwNzI1._V1_.jpg'
          }}
        /> */
}

const titleField = (field) => (
  <div className="input-field">
    <input 
    {...field.input} 
      type="text"
      // name="title"
      // value={props.product.title}
      // onChange={props.changeFn}
    />
    <label htmlFor="title">
      Product Title
      </label>
      {field.meta.touched && field.meta.error &&
    <span className="helper-text">{field.meta.error}</span>}
  </div>
)

const ProductForm = props => {
  const { handleSubmit } = props
  return (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name="title" component={titleField} />
    </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  // <form onSubmit={props.handleSubmit}>
  //   <Field name="title" component={titleField}/>
  //   <div className="input-field">
  //     <input
  //       type="number"
  //       name="price"
  //       value={props.product.price}
  //       onChange={props.changeFn}
  //     />
  //     <label className={props.active} htmlFor="price">
  //       Product Price
  //     </label>
  //     <span className="helper-text">Cannot be empty, must be > 0</span>
  //   </div>
  //   <div className="input-field">
  //     <input
  //       type="number"
  //       name="inventory"
  //       value={props.product.inventory}
  //       onChange={props.changeFn}
  //     />
  //     <label className={props.active} htmlFor="inventory">
  //       Product Inventory
  //     </label>
  //     <span className="helper-text">Cannot be empty, must be >= 0</span>
  //   </div>
  //   <div className="input-field">
  //     <input
  //       type="url"
  //       name="imageURL"
  //       className="validate"
  //       value={props.product.imageUrl}
  //       onChange={props.changeFn}
  //     />
  //     <label className={props.active} htmlFor="imageURL">
  //       product Image Url
  //     </label>
  //     <span
  //       className="helper-text"
  //       data-error="Invalid URL"
  //       data-success="Valid URL!"
  //     >
  //       Must be a valid URL.
  //     </span>
  //   </div>
  //   <div className="input-field">
  //     <textarea
  //       id="resizeTextArea"
  //       name="description"
  //       className="materialize-textarea"
  //       value={props.product.description}
  //       onChange={props.changeFn}
  //     />
  //     <label className={props.active} htmlFor="description">
  //       Product Description
  //     </label>
  //   </div>
  //   <p>Categories Placeholder</p>
  //   <button
  //     className="btn waves-effect waves-light"
  //     disabled={
  //       !props.product.title || !props.product.price || !props.product.inventory
  //     }
  //     type="submit"
  //   >
  //     Submit
  //     <i className="material-icons right">send</i>
  //   </button>
  //   {/* TODO: Necessary for materialize to init, move to a helper script file
  //     and load that in the html file? */}
  //   {[
  //     () =>
  //       setTimeout(() => {
  //         M.textareaAutoResize($('#resizeTextArea'))
  //       }, 100)
  //   ].forEach(func => func())}
  // </form>
  )
}


export default reduxForm({})(ProductForm)



