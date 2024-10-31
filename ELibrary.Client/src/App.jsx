/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Books from './components/Books';
import ReservationPage from './components/ReservationPage';
import MyReservations from './components/MyReservations';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:bookId/reserve" element={<ReservationPage />} />
                <Route path="/reservations" element={<MyReservations />} />
            </Routes>
        </Router>
    );
};

export default App;
