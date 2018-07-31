import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODCATS = 'GET_PRODCATS'

const ADD_PRODCAT = 'ADD_PRODCAT'

const PRODCAT_UPDATED = 'PRODCAT_UPDATED'

/**
 * INITIAL STATE
 */
const defaultProdCats = {
  byId: {
    0: {
      id: 0,
      productId: 0,
      categoryId: 0
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotProdCats = prodCats => {
  console.log('ProdCats in Action creator', prodCats)
  return {
  type: GET_PRODCATS,
  prodCats
}
}

// const addProdCat = ProdCat => ({
//   type: ADD_PRODCAT,
//   ProdCat
// })

// const prodCatUpdated = updatedProdCat => ({
//   type: PRODCAT_UPDATED,
//   updatedProdCat
// })

// THUNK CREATORS

export const getProdCats = () => dispatch => {
  console.log('Im in PRODCATS!')
  axios
    .get('/api/prodcats')
    .then(({data}) => {
      console.log('data inside thunk', data)
      dispatch(gotProdCats(data))
    })
    .catch(error => console.error(error))
}

// export const postProdCats = newProdCat => dispatch => {
//   axios
//     .post('/api/prodcats', newProdCat)
//     .then(({data}) => {
//       dispatch(addProdCat(data))
//       history.push(`/prodcats/${data.id}`)
//     })
//     .catch(error => console.error(error))
// }

// export const updateCategoryById = category => dispatch => {
//   axios
//     .put(`/api/prodcats/${category.id}`, category)
//     .then(({data}) => dispatch(prodCatUpdated(data)))
//     .catch(err => console.error(err))
// }

// REDUCER

export default function(state = defaultProdCats, action) {
  console.log('action.prodCats in reducer', action.prodCats)
  switch (action.type) {
    case GET_PRODCATS:
      return {
        byId: action.prodCats.reduce((result, prodCat) => {
          result[prodCat.id] = prodCat
          return result
        }, {}),
        allIds: action.prodCats.map(prodCat => prodCat.id)
      }
    // case ADD_PRODCAT:
    //   return {
    //     byId: {...state.byId, [action.prodCat.id]: action.prodCat},
    //     allIds: [...state.allIds, action.prodCat.id]
    //   }
    // case PRODCAT_UPDATED:
    //   return {
    //     byId: {
    //       ...state.byId,
    //       [action.updatedProdCat.id]: action.updatedProdCat
    //     },
    //     allIds: [...state.allIds]
    //   }
    default:
      return state
  }
}

// SELECTORS

//  SET THESE ALL UP TO PRODCATS !!!!!!!!

// export const getAvailableCategories = categoriesState => {
//   return categoriesState.allIds.reduce((result, id) => {
//     if (categoriesState.byId[id].inventory) result.push(categoriesState.byId[id])
//     return result
//   }, [])
// }

// // multiple categories selectable

// export const getProductsByCategory = (state, categoryId) => {
//   const prodCats = state.productCategories   /// whatever I name when I create the combined reducer
//   Object.values(prodCats.byId).filter(prodCat => prodCat.categoryId === categoryId).map(filteredProdCat => filteredProdCat.productId) // this gets me an array of only the objects... then filtered by only the categories we want (chain)

// }