/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../components/AuthService';
import Header from './Header';
import Footer from './Footer';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';

const MainPage = () => {
    return (
        <>
            <Header /><section className="hero-section bg-dark text-white text-center d-flex align-items-center" style={{ height: '60vh', background: 'url(hero-bg.jpg) no-repeat center center/cover' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1>Find Your Perfect Hotel Room</h1>
                            <Link to="/hotels">
                                <Button variant="primary" size="lg" className="mt-4">Find hotel now!</Button>
                            </Link>
                    </Col>
                </Row>
            </Container>
        </section><section className="how-it-works my-5">
                <Container>
                    <h2 className="text-center mb-5">How It Works</h2>
                    <Row>
                        <Col md={4} className="text-center">
                            <i className="material-icons mb-3">search</i>
                            <h3>Search</h3>
                            <p>Find the perfect hotel for your trip.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <i className="material-icons mb-3">book_online</i>
                            <h3>Book</h3>
                            <p>Book your hotel room easily.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <i className="material-icons mb-3">favorite</i>
                            <h3>Enjoy</h3>
                            <p>Enjoy your stay and explore!</p>
                        </Col>
                    </Row>
                </Container>
            </section><Footer />
        </>
    );
};

export default MainPage;
