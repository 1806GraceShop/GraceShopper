import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
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

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({
  type: GET_PRODUCTS,
  products
})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

// TODO: Think about whether we need to check auth in any of these.
export const getProducts = () => dispatch => {
  axios
    .post(`/api/products`)
    .then(products => dispatch(gotProducts(products)))
    .catch(error => console.error(error))
}

// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
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
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}

export const getAvailableProducts = productsState => {
  return productsState.allIds.map(id => {
    if (productsState.byId[id].quantity) return productsState.byId[id]
  })
}
