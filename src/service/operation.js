/**
 * @file redux 报修
 */
// 状态值
const SET_REPAIR_MAPPER = 'SET_REPAIR_MAPPER';
const SET_CHECK_PARMAS_MAPPER = 'SET_CHECK_PARMAS_MAPPER';

const SET_PARTS_MAPPER = 'SET_PARTS_MAPPER';

const SET_CHECK_MAPPER = 'SET_CHECK_MAPPER';

const SET_BORROW_MAPPER = 'SET_BORROW_MAPPER';

// 科室选择
const SET_DEPT_MAPPER = 'SET_DEPT_MAPPER';

// 菜单权限

const SET_MENU_MAPPER = 'SET_MENU_MAPPER';
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

// 借用详情
const setBorrowMapper = borrow => ({
  type: SET_BORROW_MAPPER,
  borrow
})

// 科室选择
const setDeptMapper = dept => ({
  type: SET_DEPT_MAPPER,
  dept
})

// 菜单权限参数

const setMenuFstateMapper = fstate => ({
  type: SET_MENU_MAPPER,
  fstate
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
/* 
  借用详情
*/
export const setBorrowDetial = borrow=> (
  dispatch => dispatch(setBorrowMapper(borrow))
)
/* 
  菜单权限参数设置
*/
export const setMenuFstate = fstate=> (
  dispatch => dispatch(setMenuFstateMapper(fstate))
)

export const setDept = dept=> (
  dispatch => dispatch(setDeptMapper(dept))
)

export const setCheckParmas = parmas => (
  dispatch => dispatch(setCheckParmasMapper(parmas))
)
/* 配件 */
export const setParts = parts=> (
  dispatch => dispatch(setPartsMapper(parts))
)