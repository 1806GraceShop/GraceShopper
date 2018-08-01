import axios from 'axios'

// Helpers
export const ascending = (val1, val2) => val1 - val2

function union(a, b) {
  const cache = {}
  a.forEach(item => (cache[item] = true))
  b.forEach(item => (cache[item] = true))
  return Object.keys(cache)
}

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const MERGED_CARTS = 'MERGED_CARTS'
const CART_ADD_ITEM = 'CART_ADD_ITEM'
const CART_EDIT_ITEM = 'CART_EDIT_ITEM'
const CART_EMPTY = 'CART_EMPTY'
const NEW_CART_CREATED = 'NEW_CART_CREATED'

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
const mergedCart = cart => ({type: MERGED_CARTS, cart})
export const emptyCart = () => ({type: CART_EMPTY})
export const cartCreated = cartId => ({type: NEW_CART_CREATED, cartId})
// THUNK CREATORS

export const getCartItems = () => dispatch =>
  axios
    .get('/api/me/cart')
    .then(({data}) => dispatch(gotCart(data)))
    .catch(err => err.status === 404 || console.log(err))

export const addItemToCart = ({cartId, quantity, productId}) => dispatch => {
  if (cartId)
    axios
      .post(`/api/carts/${cartId}/items`, {quantity, productId})
      .then(({data}) => dispatch(addedItem(data)))
      .catch(err => console.error(err))
  else
    axios
      .post('/api/carts/', {quantity, productId})
      .then(({data}) => {
        dispatch(addedItem(data.lineItem))
      })
      .catch(err => console.error(err))
}

export const mergeCart = currentCart => dispatch => {
  // Normalizes the current cart with Key = productId.
  const cartByProdId = currentCart.allIds.reduce((acc, id) => {
    acc[currentCart.byId[id].productId] = currentCart.byId[id]
    return acc
  }, {})

  axios
    // get the stored cart for this user.
    .get('/api/me/cart')
    .then(({data}) => {
      // Normalize what the DB tells use using ProductId as key
      const dbByProdId = data.cartLineItems.reduce((result, item) => {
        result[item.productId] = item
        return result
      }, {})

      // generate a list of all product Ids...(db and cart)
      let allProdIds = union(Object.keys(cartByProdId), Object.keys(dbByProdId))

      const cartLineItems = allProdIds.map(id => {
        if (id in cartByProdId && id in dbByProdId) {
          dbByProdId[id].quantity += cartByProdId[id].quantity
          return dbByProdId[id]
        }
        if (id in cartByProdId) return cartByProdId[id]
        if (id in dbByProdId) return dbByProdId[id]
      })

      return {...data, cartLineItems}
    })
    .then(updatedLineItems => {
      axios
        .put(
          `/api/carts/${updatedLineItems.id}/items`,
          updatedLineItems.cartLineItems
        )
        .then(() => dispatch(mergedCart(updatedLineItems)))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

export const newCart = () => dispatch => {
  axios
    .post('/api/carts/')
    .then(({data}) => {
      dispatch(cartCreated(data.cartId))
    })
    .catch(err => console.error(err))
}

export const editItemInCart = ({cartId, lineItem}) => dispatch => {
  axios
    .put(`/api/carts/${cartId}/items/${lineItem.id}`, lineItem)
    .then(({data}) => {
      dispatch(editedItem(data))
    })
    .catch(err => console.error(err))
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case MERGED_CARTS: // intentional fallthrough
    case GOT_CART:
      return {
        ...state,
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
    case NEW_CART_CREATED:
      return {
        ...defaultCart,
        cartId: action.cartId
      }
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
