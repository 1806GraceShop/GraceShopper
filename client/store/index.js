import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import allUsers from './allUsers'
import reviews from './reviews'
import cart from './cart'
import categories from './categories'
import productCategories from './productCategories'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  user,
  allUsers,
  products,
  reviews,
  cart,
  categories,
  productCategories,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './reviews'
export * from './cart'
export * from './allUsers'
export * from './categories'
export * from './productCategories'
