import React from 'react'
import { connect } from 'react-redux'

class SingleReview extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m8 l9">
                        {/* {this.props.review.map(review => ( */}
                            <div className="col s12 m4 l3">
                                <div className="card large">
                                    <div className="card-content">
                                        <span className="card-title grey-text text-darken-4">
                                            {'sjkfkjbfkjbk'}
                                        </span>
                                    </div>
                                    <div className="card-action">
                                        <span>
                                            {5}
                                        </span>
                                        <i className="material-icons right green-text">
                    </i>
                                    </div>
                                </div>
                            </div>
                        {/* ))} */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = Number(ownProps.match.params.reviewId)
    return {
        review: state.reviews.byId[id] || state.reviews.byId[0]
    }
}

export default connect(mapStateToProps)(SingleReview)
