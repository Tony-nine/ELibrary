/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Hotels from './pages/Hotels';
import HotelRooms from './pages/HotelRooms';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:hotelId" element={<HotelRooms />} />
                <Route path="/booking/room/:roomId" element={<BookingPage />} />
                <Route path="/bookings" element={<MyBookings />} />
            </Routes>
        </Router>
    );
};

export default App;
