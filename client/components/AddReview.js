import React from 'react'
import {ReviewForm} from '../components'
import {postReview} from '../store'
import {connect} from 'react-redux'

class AddReview extends React.Component {
  submit = addedReview => {
    this.props.postReview(addedReview)
    //this will redirect to the thunk id
  }

  render() {
    return <ReviewForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postReview: (newReview) => dispatch(postReview(newReview))
  }
}

export default connect(null, mapDispatchToProps)(AddReview)

