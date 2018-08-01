import React from 'react'
import {Link} from 'react-router-dom'
import ModifyCartButton from './ModifyCartButton'

const ProductCard = ({product}) => (
  <div className="col s12 m6 xl4">
    <div className="card large hoverable">
      <Link to={`/product/${product.id}`}>
        <div className="card-image">
          <img src={product.imageURL} />
        </div>

        <div className="card-content">
          <span className="card-title grey-text text-darken-4">
            {product.title}
          </span>
        </div>
      </Link>
      <div className="card-action">
        <span>
          {'$ '}
          {product.price}
        </span>
        <ModifyCartButton
          productId={product.id}
          actionName="add"
          buttonTypeComponent={props => (
            <button
              className="btn-floating white right"
              alt="Add to Cart"
              type="button"
              onClick={props.modifyCart}
              disabled={props.disabled}
            >
              <i className="material-icons green-text" alt="Add to cart">
                add_shopping_cart
              </i>{' '}
            </button>
          )}
          nextQuantity={quantity => ++quantity}
        />
      </div>
    </div>
  </div>
)

export default ProductCard
