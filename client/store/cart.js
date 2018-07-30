import axios from 'axios'
import history from '../history'

// Helpers
export const ascending = (val1, val2) => val1 - val2

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const CART_ADD_ITEM = 'CART_ADD_ITEM'
const CART_EDIT_ITEM = 'CART_EDIT_ITEM'

// INITIAL STATE
const defaultCart = {
  byProductId: {
    0: {}
    // [lineItemId : int]: {
    //   productId: 0,
    //   quantity: 0,
    // }
  },
  allProductIds: []
  // sessionId: ''
}

// ACTION CREATORS

const addedItem = item => ({type: CART_ADD_ITEM, item})
const editedItem = item => ({type: CART_EDIT_ITEM, item})
const gotCart = items => ({type: GOT_CART, items})

// const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS

export const getCartItems = () => dispatch =>
  axios
    .get('/api/carts/')
    .then(({data}) => dispatch(gotCart(data || [])))
    .catch(err => console.log(err))

export const addItemToCart = lineItem => dispatch => {
  axios
    .post('/api/carts/', lineItem)
    .then(({data}) => dispatch(addedItem(data)))
    .catch(err => console.error(err))
}

export const editItemInCart = lineItem => dispatch => {
  axios
    .put('/api/carts/', lineItem)
    .then(({data}) => {
      console.log('DATA', data)
      dispatch(editedItem(data))
    })
    .catch(err => console.error(err))
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return {
        ...state,
        byProductId: action.items.reduce((result, item) => {
          result[item.productId] = item
          return result
        }, {}),
        allProductIds: action.items.map(item => item.productId).sort(ascending)
      }
    case CART_ADD_ITEM:
    case CART_EDIT_ITEM:
      return {
        ...state,
        byProductId: {
          ...state.byProductId,
          [action.item.productId]: action.item
        },
        allProductIds: state.allProductIds
          .filter(id => id !== action.item.productId)
          .concat(action.item.productId)
          .sort(ascending)
      }
    default:
      return state
  }
}

export const getQuantityById = (cartState, id) =>
  id in cartState.byProductId ? cartState.byProductId[id].quantity : 0
export const isProductInCart = (cartState, productId) => {
  Object.values(cartState.allIds).find(
    lineItem => lineItem.productId === productId
  )
export const addToCartQuantity = (cartState, id) => {
  return id in cartState.byProductId
    ? cartState.byProductId[id].quantity + 1
    : 1
}

export const getTotalItemsInCart = cartState =>
  cartState.allProductIds.reduce(
    (sum, id) => sum + cartState.byProductId[id].quantity,
    0
  )

export const getCartItemsWithDetails = state =>
  state.cart.allProductIds.map(id => ({
    cartItemId: id,
    product: state.products.byId[id],
    cartItem: state.cart.byProductId[id]
  }))
