import React from 'react'
import { connect } from 'react-redux'
import { getProductsReviews } from '../store'
import {Link} from 'react-router-dom'

class AllReviews extends React.Component {

    render() {
        console.log('here is the review object', this.props.review)

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
                                            to={`/review/${this.props.match.params.productId}/${this.props.match.params.productId}/edit`}
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

const mapStateToProps = (state, ownProps) => {
    console.log('ownprops', ownProps)
    const urlProductId = Number(ownProps.match.params.productId)
    return {
        review: getProductsReviews(state.reviews, urlProductId)
    }
}

export default connect(mapStateToProps, null)(AllReviews)
