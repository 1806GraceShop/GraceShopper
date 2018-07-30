import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class AllReviews extends React.Component {

    render() {
        console.log('this is the props for reviews', this.props)
        return (
            <div className="container">
                <div className="column">
                    <div>
                        {this.props.review.map(review => (
                            <div key={review.id} className="col s12 m4 l3">
                                <div className="card small">
                                    <div className="card-content">
                                        <span className="card-title grey-text text-darken-4" id={`review_${review.id}`}>
                                            {review.body}
                                        </span>
                                    </div>
                                    <div className="card-action">
                                        <span>
                                            {review.rating}
                                        </span>
                                        <Link
                                            to={`/review/${review.productId}/${review.id}/edit`}
                                            className="waves-effect right red waves-light btn"
                                        >
                                            Edit Review
                <i className="material-icons right">edit</i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}



export default connect(null, null)(AllReviews)
