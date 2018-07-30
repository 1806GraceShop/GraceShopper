import axios from 'axios'
import history from '../history'
import productCategories from './productCategories'

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

// const addCategory = category => ({
//   type: ADD_CATEGORY,
//   category
// })

// const categoryUpdated = updatedCategory => ({
//   type: CATEGORY_UPDATED,
//   updatedCategory
// })

// THUNK CREATORS

export const getCategories = () => dispatch => {
  axios
    .get(`/api/categories`)
    .then(({data}) => dispatch(gotCategories(data)))
    .catch(error => console.error(error))
}

// export const postCategory = newCategory => dispatch => {
//   axios
//     .post('/api/categories', newCategory)
//     .then(({data}) => {
//       dispatch(addCategory(data))
//       history.push(`/category/${data.id}`)
//     })
//     .catch(error => console.error(error))
// }

// export const updateCategoryById = category => dispatch => {
//   axios
//     .put(`/api/categories/${category.id}`, category)
//     .then(({data}) => dispatch(categoryUpdated(data)))
//     .catch(err => console.error(err))
// }

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
    // case ADD_CATEGORY:
    //   return {
    //     byId: {...state.byId, [action.category.id]: action.category},
    //     allIds: [...state.allIds, action.category.id]
    //   }
    // case CATEGORY_UPDATED:
    //   return {
    //     byId: {
    //       ...state.byId,
    //       [action.updatedCategory.id]: action.updatedCategory
    //     },
    //     allIds: [...state.allIds]
    //   }
    default:
      return state
  }
}

// SELECTORS

// multiple categories selectable

// export const getProductsByCategory = (state, categoryId) => {
//   const prodCats = state.productCategories   /// whatever I name when I create the combined reducer
//   Object.values(prodCats.byId).filter(prodCat => prodCat.categoryId === categoryId).map(filteredProdCat => filteredProdCat.productId) // this gets me an array of only the objects... then filtered by only the categories we want (chain)
// }
export const getAllCategories = (state) => {
  return Object.values(state.categories.byId).sort((a, b) => a - b)
}

export const getProductsByCategory = (state, catId) => {
  Object.values(state.productCategories.byId).reduce((result, prodCat) => {
    if (prodCat.categoryId === catId) {
      result.push(state.products.byId[prodCat.productId])
    }
  }, [])
}