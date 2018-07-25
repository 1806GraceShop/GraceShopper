import React from 'react'
import {ReviewForm} from '../components'
import {updateReviewById} from '../store'
import {connect} from 'react-redux'

class EditReview extends React.Component {
  submit = editedReview => {
    this.props.updateReviewById(editedReview)
    this.props.history.push(`/review/${this.props.match.params.reviewId}`)
  }
  render() {
    return <ReviewForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => ({
  updateReviewById: review => dispatch(updateReviewById(review))
})

export default connect(null, mapDispatchToProps)(EditReview)


