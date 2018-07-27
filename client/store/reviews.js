import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEWS = 'ADD_REVIEWS'
const REVIEW_UPDATED = 'REVIEW_UPDATED'

/**
 * INITIAL STATE
 */
const defaultReviews = {
  byId: {
    0: {
      id: 0,
      rating: 0,
      description: 'Loading...',
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = review => ({
  type: ADD_REVIEWS,
  review
})

const reviewUpdated = updatedReview => ({
  type: REVIEW_UPDATED,
  updatedReview
})

export const getReviews = () => dispatch => {
  axios
    .get(`/api/reviews`)
    .then(({ data }) => dispatch(gotReviews(data)))
    .catch(error => console.error(error))
}

export const postReview = newReview => dispatch => {
  axios
    .post('/api/reviews', newReview)
    .then(({ data }) => {
        dispatch(addReview(data))
        console.log('this is the data', data)

        history.push(`/review/${data.productId}/${data.id}`)
      }
    )
    .catch(error => console.error(error))
}

export const updateReviewById = review => dispatch => {
  axios
    .put(`/api/reviews/${review.id}`, review)
    .then(({ data }) => dispatch(reviewUpdated(data)))
    .catch(err => console.error(err))

}

// REDUCER

export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        byId: action.reviews.reduce((result, review) => {
          result[review.id] = review
          return result
        }, {}),
        allIds: action.reviews.map(review => review.id)
      }
    case ADD_REVIEWS:
      return {
        byId: { ...state.byId, [action.review.id]: action.review },
        allIds: [...state.allIds, action.review.id]
      }

    case REVIEW_UPDATED:
      return {
        byId: {
          ...state.byId,
          [action.updatedReview.id]: action.updatedReview
        },
        allIds: [...state.allIds]
      }
    default:
      return state
  }
}
