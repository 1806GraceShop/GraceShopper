import React from 'react'

const ProductCard = ({product}) => (
  <div className="col s12 m6 l4 xl3">
    <div className="card large">
      <div className="card-image">
        <img src={product.imageURL} />
      </div>
      <div className="card-content">
        <span className="card-title grey-text text-darken-4">
          {product.title}
        </span>
      </div>
      <div className="card-action">
        <span>
          {'$ '}
          {product.price}
        </span>
        <i className="material-icons right green-text" alt="Add to cart">
          add_shopping_cart
        </i>
      </div>
    </div>
  </div>
)

export default ProductCard
