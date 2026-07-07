import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/privacy" element={<App />} />
    <Route path="/terms" element={<App />} />
    <Route path="/fastfood" element={<App />} />
    <Route path="/tiffin" element={<App />} />
    <Route path="/spices" element={<App />} />
    <Route path="/about" element={<App />} />
    <Route path="/contact" element={<App />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
