import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const makeStarsArray = numberOfStars =>
  Array.from(new Array(numberOfStars), (val, index) => index + 1)

const AllReviews = props => (
  <div className="row">
    {props.review.map(review => (
      <div key={review.id} className="col s12">
        <div className="card blue-grey">
          <div className="card-content white-text">
            <p className="flow-text" id={`review_${review.id}`}>
              {review.body}
            </p>
          </div>
          <div className="card-action">
            {makeStarsArray(review.rating).map(star => (
              <div
                key={star}
                style={{display: 'inline-block', maxWidth: '10%'}}
              >
                <i className="material-icons small yellow-text">star_review</i>
              </div>
            ))}

            <Link
              to={`/review/${review.productId}/${review.id}/edit`}
              className="blue waves-effect right  waves-light btn"
            >
              Edit Review
              <i className="material-icons right">edit</i>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default connect(null, null)(AllReviews)
