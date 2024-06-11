import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import LancheMap from './pages/LancheMap';
import Finder from './pages/Finder';
import CreateFinder from './pages/Create-finder';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={LancheMap} />
        <Route path="/finder/create" component={CreateFinder} />
        <Route path="/finder/:id" component={Finder} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
