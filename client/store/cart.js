import axios from 'axios'
import history from '../history'

// Helpers
export const ascending = (val1, val2) => val1 - val2

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const CART_ADD_ITEM = 'CART_ADD_ITEM'
const CART_EDIT_ITEM = 'CART_EDIT_ITEM'
const CART_EMPTY = 'CART_EMPTY'
const CART_CREATED = 'CART_CREATED'

// INITIAL STATE
const defaultCart = {
  cartId: 0,
  byId: {},
  allIds: []
}

// ACTION CREATORS

const addedItem = item => ({type: CART_ADD_ITEM, item})
const editedItem = item => ({type: CART_EDIT_ITEM, item})
const gotCart = cart => ({type: GOT_CART, cart})
export const emptyCart = () => ({type: CART_EMPTY})
// THUNK CREATORS

export const getCartItems = () => dispatch =>
  axios
    .get('/api/me/cart')
    .then(({data}) => dispatch(gotCart(data)))
    .catch(err => err.status === 404 || console.log(err))

export const addItemToCart = ({cartId, quantity, productId}) => dispatch => {
  console.log('ADDING', cartId, quantity, productId)
  if (cartId)
    axios
      .post(`/api/carts/${cartId}/items`, {quantity, productId})
      .then(({data}) => dispatch(addedItem(data)))
      .catch(err => console.error(err))
  else
    axios
      .post('/api/carts/', {quantity, productId})
      .then(({data}) => {
        console.log('GOT BACK FROM POST TO /carts ', data.lineItem)
        dispatch(addedItem(data.lineItem))
      })
      .catch(err => console.error(err))
}

export const editItemInCart = ({cartId, lineItem}) => dispatch => {
  console.log('EDITING', cartId, lineItem)
  axios
    .put(`/api/carts/${cartId}/items/${lineItem.id}`, lineItem)
    .then(({data}) => {
      console.log('DATA', data)
      dispatch(editedItem(data))
    })
    .catch(err => console.error(err))
}

// REDUCER
export default function(state = defaultCart, action) {
  console.log('CART ACTION', action)
  switch (action.type) {
    case GOT_CART:
      return {
        cartId: action.cart.id,
        byId: action.cart.cartLineItems.reduce((result, item) => {
          result[item.id] = item
          return result
        }, {}),
        allIds: action.cart.cartLineItems.map(item => item.id).sort(ascending)
      }
    case CART_ADD_ITEM: // intentional fallthrough
    case CART_EDIT_ITEM:
      return {
        ...state,
        cartId: action.item.cartId,
        byId: {...state.byId, [action.item.id]: action.item},
        allIds: state.allIds
          .filter(id => id !== action.item.id)
          .concat(action.item.id)
          .sort(ascending)
      }
    case CART_EMPTY:
      return defaultCart
    default:
      return state
  }
}

export const getCartId = state => state.cart.cartId

export const getLineItemByProductId = (state, productId) => {
  return (
    Object.values(state.cart.byId).find(
      lineItem => lineItem.productId === productId
    ) || {}
  )
}

export const cartQuantityByProdId = (state, productId) => {
  return getLineItemByProductId(state, productId).quantity || 0
}

export const isInCartByProductId = (state, productId) => {
  return Object.values(state.cart.byId).reduce(
    (found, lineItem) =>
      found || lineItem.productId === productId ? true : found,
    false
  )
}

export const getTotalItemsInCart = state =>
  state.cart.allIds.reduce((sum, id) => sum + state.cart.byId[id].quantity, 0)

export const getCartItemsWithDetails = state =>
  state.cart.allIds.map(id => ({
    cartItemId: id,
    product: state.products.byId[state.cart.byId[id].productId],
    cartItem: state.cart.byId[id]
  }))
