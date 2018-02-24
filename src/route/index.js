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
const routes = [
  { path: '/login', exact: true, component: () => <div>Login</div> },
  { path: '/register', exact: true, component: () =>  <div>register</div> },
  { path: '/workplace', exact: true, component: asyncComponent(() => import("../container/workplace"), '我的工作台') },
  ...Repair, ...WaitForRepair, ...Check, ...StartToRepair
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