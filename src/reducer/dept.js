const initialState = {
  dept:{

  }
};
const deptReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_DEPT_MAPPER':
      return {
        ...action.dept
      }
    default:
      return state
  }
}
export default deptReducer;