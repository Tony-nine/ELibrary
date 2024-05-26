/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <Container>
                <Row>
                    <Col>
                        &copy; 2024 Booking App. Created as practice task for Present Connection company BDT team internship
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
