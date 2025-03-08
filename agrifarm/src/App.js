import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/Index';
import SUPotp from './components/SUPotp';
import SR from './components/SR';
import FD from './components/FD';
import { LoadScript } from '@react-google-maps/api';
import LD from './components/LD';
import Profile from './components/Profile';
import FMA2 from './components/FMA2';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCR4Uv-kiMwAK6xqJ7k4g-P22TFL-CHoMU'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<SUPotp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SR" element={<SR />} />
      <Route path="/farmer-dashboard" element={<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}><FD /></LoadScript>} />    
      <Route path="/labour-dashboard" element={<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}><LD /></LoadScript>} />    
      <Route path="/farmer-dashboard/profile" element={<Profile />} />
      <Route path="/labour-dashboard/profile" element={<Profile />} />
      <Route path="/fma2" element={<FMA2 />} />

      </Routes>
    </Router>
  );
}

export default App;