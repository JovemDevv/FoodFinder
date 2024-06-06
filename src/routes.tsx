import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import LancheMap from './pages/LancheMap';
import Finder from './pages/Finder';
import CreateFinder from './pages/Create-finder';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={LancheMap} />
        <Route path="/finder/create" component={CreateFinder} />
        <Route path="/finder/:id" component={Finder} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
