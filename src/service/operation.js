/**
 * @file redux 报修
 */
// 状态值
const SET_REPAIR_MAPPER = 'SET_REPAIR_MAPPER';
const SET_CHECK_PARMAS_MAPPER = 'SET_CHECK_PARMAS_MAPPER';

const SET_PARTS_MAPPER = 'SET_PARTS_MAPPER';

const SET_CHECK_MAPPER = 'SET_CHECK_MAPPER';
// 设置user
const setRepairMapper = repair => ({
  type: SET_REPAIR_MAPPER,
  repair
})

// 详情

const setCheckMapper = check => ({
  type: SET_CHECK_MAPPER,
  check
})

/* 验收参数 */

const  setCheckParmasMapper = parmas =>({
  type: SET_CHECK_PARMAS_MAPPER,
  parmas
})

/* 配件 */

const  setPartsMapper = parts =>({
  type: SET_PARTS_MAPPER,
  parts
})

export const setRepair = repair => (
  dispatch => dispatch(setRepairMapper(repair))
)
export const setCheckDetial = check=> (
  dispatch => dispatch(setCheckMapper(check))
)

export const setCheckParmas = parmas => (
  dispatch => dispatch(setCheckParmasMapper(parmas))
)
/* 配件 */
export const setParts = parts=> (
  dispatch => dispatch(setPartsMapper(parts))
)