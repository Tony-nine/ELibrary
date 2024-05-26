/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHotels, setFilteredHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:5285/api/Hotels');
                const data = await response.json();
                setHotels(data);
                setFilteredHotels(data); // Initialize with all hotels
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = hotels.filter(hotel =>
            hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredHotels(filtered);
    };

    return (
        <>
            <Header />
            <Container className="my-5">
                <h2 className="text-center mb-5">Hotels</h2>

                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form className="mt-4" onSubmit={handleSearch}>
                            <Row>
                                <Col md={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Where are you going?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>

                                <Col md={2}>
                                    <Button variant="primary" type="submit">Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    {filteredHotels.map((hotel) => (
                        <Col md={4} key={hotel.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={hotel.pictureUrl || 'default-hotel.jpg'} alt={hotel.name} />
                                <Card.Body>
                                    <Link to={`/hotels/${hotel.id}`}><Card.Title>{hotel.name}</Card.Title></Link>
                                    <Card.Text>{hotel.location}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Hotels;
