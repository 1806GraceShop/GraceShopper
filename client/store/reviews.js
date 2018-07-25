import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_REVIEWS = 'GET_REVIEWS'

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

export const getReviews = () => dispatch => {
  axios
    .get(`/api/reviews`)
    .then(({data}) => {
      dispatch(gotReviews(data))
    }
  )
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        byId: action.reviews.reduce((result, review) => {
          result[review.id] = review
          return result
        }, {}),
        allIds: action.reviews.map(review => review.id)
      }
    default:
      return state
  }
}
