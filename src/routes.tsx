import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LancheMap from './pages/LancheMap';
import Finder from './pages/Finder';
import CreateFinder from './pages/Create-finder';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<LancheMap />} />
        <Route path="/finder/create" element={<CreateFinder />} />
        <Route path="/finder/:id" element={<Finder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
