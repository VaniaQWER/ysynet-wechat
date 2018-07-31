const initialState = {
  menuFstate: ''
};
const menuFstateReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_MENU_MAPPER':
      return {
        menuFstate : action.fstate
      }
    default:
      return state
  }
}
export default menuFstateReducer;