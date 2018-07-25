import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const PRODUCT_UPDATED = 'PRODUCT_UPDATED'
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

const productUpdated = updatedProduct => ({
  type: PRODUCT_UPDATED,
  updatedProduct
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

export const updateProductById = product => dispatch => {
  axios
    .put(`/api/products/${product.id}`, product)
    .then(({data}) => dispatch(productUpdated(data)))
    .catch(err => console.error(err))
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
    case PRODUCT_UPDATED:
      return {
        byId: {
          ...state.byId,
          [action.updatedProduct.id]: action.updatedProduct
        },
        allIds: [...state.allIds]
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
