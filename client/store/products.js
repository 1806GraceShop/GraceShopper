import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'

const ADD_PRODUCT = 'ADD_PRODUCT'

const PRODUCT_UPDATED = 'PRODUCT_UPDATED'

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

const productUpdated = updatedProduct => ({
  type: PRODUCT_UPDATED,
  updatedProduct
})

// THUNK CREATORS

export const getProducts = () => dispatch => {
  axios
    .get(`/api/products`)
    .then(({data}) => dispatch(gotProducts(data)))
    .catch(error => console.error(error))
}

export const postProduct = newProduct => dispatch => {
  axios
    .post('/api/products', newProduct)
    .then(({data}) => {
      dispatch(addProduct(data))
      history.push(`/product/${data.id}`)
    })
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
    case ADD_PRODUCT:
      return {
        byId: {...state.byId, [action.product.id]: action.product},
        allIds: [...state.allIds, action.product.id]
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

// SELECTORS

export const getAvailableProducts = productsState => {
  return productsState.allIds.reduce((result, id) => {
    if (productsState.byId[id].inventory) result.push(productsState.byId[id])
    return result
  }, [])
}

export const getProductsByCategory = (state, catId) => {
  return Object.values(state.productCategories.byId).reduce(
    (result, prodCat) => {
      if (prodCat.categoryId === catId) {
        result.push(state.products.byId[prodCat.productId])
      }
      return result
    },
    []
  )
}
