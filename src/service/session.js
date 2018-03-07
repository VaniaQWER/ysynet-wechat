/**
 * @file 用户session 
 */
// 状态值
const SET_USER_SESSION_MAPPER = 'SET_USER_SESSION_MAPPER';
const CLEAR_USER_SESSION_MAPPER = 'CLEAR_USER_SESSION_MAPPER';
const FETCH_FAILURE = 'FETCH_FAILURE';

// 设置SessionId
const setUserSession = id => ({
  type: SET_USER_SESSION_MAPPER,
  id
})
// 异常
export const fetchFailure = err => ({
  type: FETCH_FAILURE,
  err
})
// 清空SessionId
export const clearUserSeeionMapper = () => ({
  type: CLEAR_USER_SESSION_MAPPER
})

export const setSessionId = id => (
  dispatch => dispatch(setUserSession(id))
)


