import React from 'react'
import {
  HashRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';
import asyncComponent from './asyncComponent';
import Repair from './repair';
import WaitForRepair from './waitForRepair';
import Check from './check';
import StartToRepair from './startToRepair';
import RepairRecord from './repairRecord';
import Borrow from './borrow';
const routes = [
  { path: '/login/:openId', component: asyncComponent(() =>import ('../container/login'),'登陆')},
  { path: '/register', exact: true, component: () =>(<div> register </div>)},
  /* { path: '/register', exact: true, component: asyncComponent(() => import("../container/register"), 'register')}, */
  { path: '/error', exact: true, component: asyncComponent(() => import("../container/error"), '错误')},
  { path: '/construct', exact: true,component: asyncComponent(() => import("../container/workplace/construct"),'正在建设中')}, 
  { path: '/workplace/:userId', component: asyncComponent(() => import("../container/workplace"), '我的工作台') },
  { path: '/myinfo', exact: true,component: asyncComponent(() => import("../container/workplace/myInfo"),'我的')}, 
  { path: '/modifyUserName', exact: true,component: asyncComponent(() => import("../container/workplace/modifyUserName"),'修改我的用户名')}, 
  ...Repair, ...WaitForRepair, ...Check, ...StartToRepair, ...RepairRecord, ...Borrow
]


const RouterMonitor = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/workplace"/>} />
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))
      }
      <Route component={() => <div>404</div>} />
    </Switch>
  </Router>
)

export default RouterMonitor