import React from 'react'
import {Link} from 'react-router-dom'
import {ModifyCartButton, AddToCartFromCardButton} from '../components'

const ProductCard = ({product}) => (
  <div className="col s12 m6 xl4">
    <div className="card large z-depth-3">
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
          buttonTypeComponent={AddToCartFromCardButton}
          nextQuantity={quantity => ++quantity}
        />
      </div>
    </div>
  </div>
)

export default ProductCard
