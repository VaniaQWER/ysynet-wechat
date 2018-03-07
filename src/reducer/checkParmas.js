const initialState = {
    
};
const checkParmasReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_CHECK_PARMAS_MAPPER':
      return {
        checkParmas: action.parmas
      }
    default:
      return state
  }
}
export default checkParmasReducer;