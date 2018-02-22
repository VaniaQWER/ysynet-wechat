/**
 * @file redux 报修
 */
// 状态值
const SET_REPAIR_MAPPER = 'SET_REPAIR_MAPPER';

// 设置user
const setRepairMapper = repair => ({
  type: SET_REPAIR_MAPPER,
  repair
})

// 详情
const SET_CHECK_MAPPER = 'SET_CHECK_MAPPER';

const setCheckMapper = check => ({
  type: SET_CHECK_MAPPER,
  check
})

export const setRepair = repair => (
  dispatch => dispatch(setRepairMapper(repair))
)
export const setCheckDetial = check=> (
  dispatch => dispatch(setCheckMapper(check))
)