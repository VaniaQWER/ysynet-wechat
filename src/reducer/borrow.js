const initialState = {
  baseDetail:{

  }
};
const borrowReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_BORROW_MAPPER':
      return {
        ...action.borrow
      }
    default:
      return state
  }
}
export default borrowReducer;