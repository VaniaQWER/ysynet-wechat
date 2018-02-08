const initialState = {
  assetsRecord: {
    assetsRecordGuid: '',
    assetsRecord: '', //资产编号
    equipmentName: '', // 资产名称
    fmodel: '', // 型号
    spec: '',// 规格
    useFstate: '',// 是否在用
    guaranteeFlag: '',// 是否在用
    files: [], // 预览图片
    faultDescribeText: '', // 故障描述 文字
    faultDescribe: '', // 故障描述 key
    deposit: '', // 报修地址
    rrpairPhone: '' // 维修电话
  },
  useFstate: '',
  urgentFlag: '',
  spare: '',
  faultDescribe: [],
  files: [],
  submitFiles:[],
  failCause: ''
};
const repairReducer = (state = initialState , action) => {
  switch (action.type) {
    case 'SET_REPAIR_MAPPER':
      return {
        ...action.repair
      }
    default:
      return state
  }
}
export default repairReducer;