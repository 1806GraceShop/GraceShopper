import React from 'react'

const ProductCard = props => (
  <div className="col s12 m4">
    <div className="card small">
      <div className="card-image">
        <img src={props.imageUrl} />
        <span className="card-title">{props.name}</span>
      </div>
      <div className="card-content">
        <p>{props.description}</p>
        <p>{props.price}</p>
      </div>
      <div className="card-action">
        <a href="#">Add to Card</a>
      </div>
    </div>
  </div>
)

export default ProductCard
