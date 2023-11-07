import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home';
import LoginForm from './pages/Login/loginform.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<Navigate replace to='/home' />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<LoginForm />} />
    </Routes>
  </Router>
);

reportWebVitals();
