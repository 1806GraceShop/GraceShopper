import React from 'react'
import { connect } from 'react-redux'
import {getProductsReviews} from '../store'

class AllReviews extends React.Component {
    
    render() {
        console.log('here is the review object', this.props.review)

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m8 l9">
                        {this.props.review.map(review => (
                            <div key = {review.id} className="col s12 m4 l3">
                                <div className="card large">
                                    <div className="card-content">
                                        <span className="card-title grey-text text-darken-4" id = {`review_${review.id}`}>
                                            {review.body}
                                        </span>
                                    </div>
                                    <div className="card-action">
                                        <span>
                                            {review.rating}
                                        </span>
                                        <i className="material-icons right green-text">
                    </i>
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
