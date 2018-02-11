const initialState = {
    BaseInfoInfoData:{

    }
  };
  const checkReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'SET_CHECK_MAPPER':
        return {
          ...action.check
        }
      default:
        return state
    }
  }
  export default checkReducer;