import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODSEARCH = 'GET_PRODSEARCH'

const ADD_PRODSEARCH = 'ADD_PRODSEARCH'

const PRODSEARCH_UPDATED = 'PRODSEARCH_UPDATED'

/**
 * INITIAL STATE
 */
const defaultProdSearch = {
  byId: {
    0: {
      id: 0,
      productId: 0,
      productName: 'Loading...'
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotProdSearch = prodSearch => {
  return {
  type: GET_PRODSEARCH,
  prodSearch
}
}

// THUNK CREATORS

export const getProdSearch = () => dispatch => {
  axios
    .get('/api/prodsearch')
    .then(({data}) => {
      dispatch(gotProdSearch(data))
    })
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultProdSearch, action) {
  switch (action.type) {
    case GET_PRODSEARCH:
      return {
        byId: action.prodSearch.reduce((result, prodSearch) => {
          result[prodSearch.id] = prodSearch
          return result
        }, {}),
        allIds: action.prodSearch.map(prodSearch => prodSearch.id)
      }
    default:
      return state
  }
}