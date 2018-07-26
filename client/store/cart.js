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

let fakeIds = 1
let fakequantity = 1
export const addItemToCart = productId => dispatch => {
  let fakeData = {
    id: Math.round(Math.random()) ? fakeIds++ : fakeIds,
    quantity: fakequantity++,
    productId
  }
  dispatch(addedItem(fakeData))
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
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

export const getTotalItemsInCart = cartState =>
  cartState.allIds.reduce((sum, id) => sum + cartState.byId[id].quantity, 0)
