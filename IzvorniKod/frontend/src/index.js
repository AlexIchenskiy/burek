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
import Register from './pages/Register/register.js';
import Editor from './pages/Editor/Editor';
import AuthProvider from './provider/authProvider.js';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme.js';
import Post from './pages/Post/Post.js';
import Logout from './components/Logout/Logout.js';
import Profile from './pages/Profile/Profile.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/home' />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/editor" element={<Editor />} />
          <Route exact path="/post/:id" element={<Post />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

reportWebVitals();
