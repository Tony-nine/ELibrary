/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import { fetchBooks } from '../services/ApiService'

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterAudiobook, setFilterAudiobook] = useState('');

    const fetchBooksData = async () => {
        const data = await fetchBooks(searchQuery, filterYear, filterAudiobook);
        setBooks(data);
        setFilteredBooks(data);
    };

    useEffect(() => {
        fetchBooksData();
    }, []);

    const handleFilterChange = () => {
        fetchBooksData();
    };

    return (
        <>
            <Header />
            <Container className="my-5">
                <h2 className="text-center mb-5">Books</h2>

                <Form className="mb-4">
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="nameFilter">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Enter book name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="yearFilter">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                    placeholder="Enter year"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="audiobookFilter">
                                <Form.Label>Has Audiobook</Form.Label>
                                <Form.Select
                                    value={filterAudiobook}
                                    onChange={(e) => setFilterAudiobook(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" className="mt-3" onClick={handleFilterChange}>
                        Apply Filters
                    </Button>
                </Form>

                <Row>
                    {filteredBooks.map((book) => (
                        <Col md={4} key={book.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={book.pictureUrl || 'default-book.jpg'} alt={book.name} />
                                <Card.Body>
                                    <Card.Title>{book.name}</Card.Title>
                                    <Card.Text>{new Date(book.year).getFullYear()}</Card.Text>
                                    <Card.Text>
                                        Audiobook available: {book.haveAudiobook ? "Yes" : "No"}
                                    </Card.Text>
                                    <Link to={`/books/${book.id}/reserve`}>
                                        <Button variant="primary">Reserve this book</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Books;
