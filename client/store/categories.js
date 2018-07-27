import axios from 'axios'
import history from '../history'

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

const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

const categoryUpdated = updatedCategory => ({
  type: CATEGORY_UPDATED,
  updatedCategory
})

// THUNK CREATORS

export const getCategories = () => dispatch => {
  axios
    .get(`/api/categories`)
    .then(({data}) => dispatch(gotCategories(data)))
    .catch(error => console.error(error))
}

export const postCategory = newCategory => dispatch => {
  axios
    .post('/api/categories', newCategory)
    .then(({data}) => {
      dispatch(addCategory(data))
      history.push(`/category/${data.id}`)
    })
    .catch(error => console.error(error))
}

export const updateCategoryById = category => dispatch => {
  axios
    .put(`/api/categories/${category.id}`, category)
    .then(({data}) => dispatch(categoryUpdated(data)))
    .catch(err => console.error(err))
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
    case ADD_CATEGORY:
      return {
        byId: {...state.byId, [action.category.id]: action.category},
        allIds: [...state.allIds, action.category.id]
      }
    case CATEGORY_UPDATED:
      return {
        byId: {
          ...state.byId,
          [action.updatedCategory.id]: action.updatedCategory
        },
        allIds: [...state.allIds]
      }
    default:
      return state
  }
}

export const getAvailableCategories = categoriesState => {
  return categoriesState.allIds.reduce((result, id) => {
    if (categoriesState.byId[id].inventory) result.push(categoriesState.byId[id])
    return result
  }, [])
}
