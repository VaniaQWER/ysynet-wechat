const initialState = {
  useFstate: '',
  urgentFlag: '',
  spare: '',
  faultDescribe: [],
  files: [],
  submitFiles:[],
};
const repairReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_REPAIR_MAPPER':
      return {
        repair: action.repair
      }
    default:
      return state
  }
}
export default repairReducer;