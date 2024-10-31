/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { isAuthenticated, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false); 
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">E-Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  />
            <Navbar.Collapse id="basic-navbar-nav" className="row-reverse">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link href="/reservations">My Reservations</Nav.Link>
                            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/login">
                                <Button variant="outline-light" className="mr-2">Login</Button>
                            </Nav.Link>
                            <Nav.Link href="/registration">
                                <Button variant="outline-light">Sign Up</Button>
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;