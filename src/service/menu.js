/**
 * @file 用户sevice 
 */
// 状态值
const SET_MENU_MAPPER = 'SET_MENU_MAPPER';
const CLEAR_MENU_MAPPER = 'CLEAR_MENU_MAPPER';
const FETCH_FAILURE = 'FETCH_FAILURE';

// 设置menu
const setMenuMapper = menu => ({
  type: SET_MENU_MAPPER,
  menu
})

// 异常
export const fetchFailure = err => ({
  type: FETCH_FAILURE,
  err
})
// 清空menu
export const clearMenuMapper = () => ({
  type: CLEAR_MENU_MAPPER
})

export const setMenu = menu =>(
  dispatch => dispatch(setMenuMapper(menu))
)
