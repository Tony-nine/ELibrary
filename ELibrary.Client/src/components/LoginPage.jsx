/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated, getUserId, getToken } from '../services/AuthService';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './Header';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        event.preventDefault();
        try {
            const token = await login(username, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert("Something went wrong. Please try again")
        }
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <div>
                    <h1>Login Page</h1>

                    <h2 className="mb-4">Login</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </Container>
        </>


    );
};

export default LoginPage;