import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  byId: {
    '0': {
      id: 0,
      name: 'Loading...',
      description: 'Loading...',
      price: '$...',
      quantity: 0,
      imageUrl: ''
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotProducts = products => ({
  type: GET_PRODUCTS,
  products
})
// const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS

// TODO: Think about whether we need to check auth in any of these.
export const getProducts = () => dispatch => {
  axios
    .post(`/api/products`)
    .then(products => dispatch(gotProducts(products)))
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        byId: action.products.reduce((result, product) => {
          result[product.id] = product
          return result
        }, {}),
        allIds: action.products.map(product => product.id)
      }
    default:
      return state
  }
}

export const getAvailableProducts = productsState => {
  return productsState.allIds.map(id => {
    if (productsState.byId[id].quantity) return productsState.byId[id]
  })
}
