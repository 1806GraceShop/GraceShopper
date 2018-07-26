import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const CART_ADD_ITEM = 'CART_ADD_ITEM'

// INITIAL STATE
const defaultCart = {
  byId: {
    // [lineItemId : int]: {
    //   productId: 0,
    //   quantity: 0,
    // }
  },
  allIds: [],
  sessionId: ''
}

// ACTION CREATORS

const addedItem = cartLineItem => ({
  type: CART_ADD_ITEM,
  cartLineItem
})
// const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS

export const addItemToCart = productId => (dispatch, getStore) => {
  // TODO -- wire up DB.

  dispatch(addedItem(fakeData))
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        byId: {...state.byId, [action.cartLineItem.id]: action.cartLineItem},
        allIds: [
          ...state.allIds.filter(id => id !== action.cartLineItem.id),
          action.cartLineItem.id
        ]
      }
    default:
      return state
  }
}

export const isProductInCart = (cartState, productId) => {
  Object.values(cartState.allIds).find(
    lineItem => lineItem.productId === productId
  )
}

export const getTotalItemsInCart = cartState =>
  cartState.allIds.reduce((sum, id) => sum + cartState.byId[id].quantity, 0)

// Returns an array of products in the cart, with an extra key that is the
// current quantity of that product.
export const getCart = state =>
  state.cart.allIds.map(lineItemId => {
    const {productId, quantity} = state.cart.byId[lineItemId]
    const {title, price} = state.products.byId[productId]
    return {
      lineItemId,
      quantity,
      productId,
      title,
      price
    }
  })
