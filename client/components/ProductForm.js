import React from 'react'

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

const ProductForm = props => (
  <form onSubmit={props.submitFn}>
    <div className="input-field">
      <input
        type="text"
        name="title"
        value={props.product.title}
        onChange={props.changeFn}
      />
      <label className={props.active} htmlFor="title">
        Product Title
      </label>
      <span className="helper-text">Cannot be empty</span>
    </div>
    <div className="input-field">
      <input
        type="number"
        name="price"
        value={props.product.price}
        onChange={props.changeFn}
      />
      <label className={props.active} htmlFor="price">
        Product Price
      </label>
      <span className="helper-text">Cannot be empty, must be > 0</span>
    </div>
    <div className="input-field">
      <input
        type="number"
        name="inventory"
        value={props.product.inventory}
        onChange={props.changeFn}
      />
      <label className={props.active} htmlFor="inventory">
        Product Inventory
      </label>
      <span className="helper-text">Cannot be empty, must be >= 0</span>
    </div>
    <div className="input-field">
      <input
        type="url"
        name="imageURL"
        className="validate"
        value={props.product.imageUrl}
        onChange={props.changeFn}
      />
      <label className={props.active} htmlFor="imageURL">
        product Image Url
      </label>
      <span
        className="helper-text"
        data-error="Invalid URL"
        data-success="Valid URL!"
      >
        Must be a valid URL.
      </span>
    </div>
    <div className="input-field">
      <textarea
        id="resizeTextArea"
        name="description"
        className="materialize-textarea"
        value={props.product.description}
        onChange={props.changeFn}
      />
      <label className={props.active} htmlFor="description">
        Product Description
      </label>
    </div>
    <p>Categories Placeholder</p>
    <button
      className="btn waves-effect waves-light"
      disabled={
        !props.product.title || !props.product.price || !props.product.inventory
      }
      type="submit"
    >
      Submit
      <i className="material-icons right">send</i>
    </button>
    {/* TODO: Necessary for materialize to init, move to a helper script file
      and load that in the html file? */}
    {[
      () =>
        setTimeout(() => {
          M.textareaAutoResize($('#resizeTextArea'))
        }, 100)
    ].forEach(func => func())}
  </form>
)

export default ProductForm
