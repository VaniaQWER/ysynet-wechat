const initialState = {
  session: ''
};
const sessionReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_USER_SESSION_MAPPER':
      return {
        session: action.id
      }
    case 'CLEAR_USER_SESSION_MAPPER':
      return { sessionId: '' };
    default:
      return state
  }
}
export default sessionReducer;