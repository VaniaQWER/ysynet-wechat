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


export const setRepair = repair => (
  dispatch => dispatch(setRepairMapper(repair))
)