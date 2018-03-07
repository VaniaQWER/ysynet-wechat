const initialState = {
    parts: []
  };
  const partsReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'SET_PARTS_MAPPER':
        return {
          session: action.parts
        }
      default:
        return state
    }
  }
  export default partsReducer;