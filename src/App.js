import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MainPage from './components/MainPage';
import Logout from './components/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard/*" element={<MainPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route exact path="logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
