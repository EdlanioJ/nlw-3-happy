import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateOrphanage from '../pages/C/CreateOrphanage';
import Orphanage from '../pages/C/Orphanage';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Login from '../pages/Login';
import MyOrphanages from '../pages/Dashboard/MyOrphanages';
import Register from '../pages/Register';
import PrivateRoute from './private.routes';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/orphanages/create" component={CreateOrphanage} />

        <PrivateRoute path="/dashboard/create" component={CreateOrphanage} />
        <PrivateRoute path="/dashboard/orphanages" component={MyOrphanages} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
