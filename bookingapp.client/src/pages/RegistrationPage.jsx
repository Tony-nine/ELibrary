/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(username);
        console.log(password);

        try {
            const response = await fetch('http://localhost:5285/api/Auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            //console.log(data);
            navigate('/');

        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h2 className="mb-4">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default RegistrationPage;
