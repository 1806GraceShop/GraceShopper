import axios from 'axios'
import history from '../history'
import productCategories from './productCategories'
import { AllProducts } from '../components';

// ACTION TYPES

const GET_CATEGORIES = 'GET_CATEGORIES'

const ADD_CATEGORY = 'ADD_CATEGORY'

const CATEGORY_UPDATED = 'CATEGORY_UPDATED'

/**
 * INITIAL STATE
 */
const defaultCategories = {
  byId: {
    0: {
      id: 0,
      name: 'Loading...'
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

// THUNK CREATORS

export const getCategories = () => dispatch => {
  axios
    .get(`/api/categories`)
    .then(({data}) => dispatch(gotCategories(data)))
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        byId: action.categories.reduce((result, category) => {
          result[category.id] = category
          return result
        }, {}),
        allIds: action.categories.map(category => category.id)
      }
    default:
      return state
  }
}

// SELECTORS

export const getAllCategories = (state) => {
  return Object.values(state.categories.byId).sort((a, b) => a - b)
}