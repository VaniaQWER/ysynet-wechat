const initialState = {
  userInfo: {

  }
}
const userReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_USER_MAPPER':
      return {
        ...state, ...action.user
      }
    case 'CLEAR_USER_MAPPER':
      return {
        userInfo: {
      
        }
      }
    default:
      return state
  }
}
export default userReducer;