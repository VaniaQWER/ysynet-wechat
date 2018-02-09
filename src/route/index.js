import React from 'react'
import {
  HashRouter as Router, Switch
} from 'react-router-dom';
import RouteWithSubRoutes from './routeWithSubRoutes';
import Workplace from '../container/workplace';
import Repair from './repair';
import WaitForRepair from './waitForRepair';
const routes = [
  { path: '/login', exact: true, component: () => <div>Login</div> },
  { path: '/register', exact: true, component: () =>  <div>register</div> },
  { path: '/workplace', exact: true, component: Workplace },
  ...Repair, ...WaitForRepair
]


const RouterMonitor = () => (
  <Router>
    <Switch>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))
      }
    </Switch>
  </Router>
)

export default RouterMonitor