import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LancheMap from './pages/LancheMap';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<LancheMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
