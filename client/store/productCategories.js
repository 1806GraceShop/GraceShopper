import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODCATS = 'GET_PRODCATS'

const ADD_PRODCAT = 'ADD_PRODCAT'

const PRODCAT_UPDATED = 'PRODCAT_UPDATED'

/**
 * INITIAL STATE
 */
const defaultProdCats = {
  byId: {
    0: {
      id: 0,
      productId: 0,
      categoryId: 0
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotProdCats = prodCats => {
  return {
    type: GET_PRODCATS,
    prodCats
  }
}

// THUNK CREATORS

export const getProdCats = () => dispatch => {
  axios
    .get('/api/prodcats')
    .then(({data}) => {
      dispatch(gotProdCats(data))
    })
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultProdCats, action) {
  switch (action.type) {
    case GET_PRODCATS:
      return {
        byId: action.prodCats.reduce((result, prodCat) => {
          result[prodCat.id] = prodCat
          return result
        }, {}),
        allIds: action.prodCats.map(prodCat => prodCat.id)
      }
    default:
      return state
  }
}
