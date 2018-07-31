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
  console.log('ProdCats in Action creator', prodCats)
  return {
  type: GET_PRODCATS,
  prodCats
}
}

// THUNK CREATORS

export const getProdCats = () => dispatch => {
  console.log('Im in PRODCATS!')
  axios
    .get('/api/prodcats')
    .then(({data}) => {
      console.log('data inside thunk', data)
      dispatch(gotProdCats(data))
    })
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultProdCats, action) {
  console.log('action.prodCats in reducer', action.prodCats)
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