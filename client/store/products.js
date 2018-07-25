import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  byId: {
    0: {
      id: 0,
      title: 'Loading...',
      description: 'Loading...',
      price: '$...',
      inventory: 0,
      imageURL: ''
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})
// const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS

// TODO: Think about whether we need to check auth in any of these.
export const getProducts = () => dispatch => {
  axios
    .get(`/api/products`)
    .then(({data}) => dispatch(gotProducts(data)))
    .catch(error => console.error(error))
}

export const postProduct = (newProduct) => dispatch => {
  axios
    .post('/api/products', newProduct)
    .then(
      ({data}) => {
        dispatch(addProduct(data))
        history.push(`/product/${data.id}`)
      }
    )
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
    case ADD_PRODUCT:
      return {
        byId: {...state.byId, [action.product.id]: action.product},
        allIds: [...state.allIds, action.product.id]
      }
    default:
      return state
  }
}

export const getAvailableProducts = productsState => {
  return productsState.allIds.reduce((result, id) => {
    if (productsState.byId[id].inventory) result.push(productsState.byId[id])
    return result
  }, [])
}

