import axios from 'axios'

//ACTION TYPES
const GET_ALL_USERS = 'GET_ALL_USERS'

//INITIAL STATE
const defaultUsers = {
  byId: {
    0: {
      id: 0,
      email: ''
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotUsers = users => ({
  type: GET_ALL_USERS,
  users
})

//THUNK CREATORS
export const getAllUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(({data}) => {
      console.log('DATA', data)
      dispatch(gotUsers(data))
    })
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultUsers, action) {
  console.log('action in reducer', action)
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        byId: action.users.reduce((obj, usr) => {
          obj[usr.id] = usr
          return obj
        }, {}),
        allIds: action.users.map(usr => usr.id)
      }
    default:
      return state
  }
}

//SELECTORS
export const getActiveUsers = state => {
  return state.allUsers.allIds.reduce((result, id) => {
    result.push(state.allUsers.byId[id])
    return result
  }, [])
}
