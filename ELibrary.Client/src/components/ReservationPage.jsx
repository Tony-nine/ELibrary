import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { getUserId, useCheckAuthentication } from '../services/AuthService';
import { fetchBook, fetchCreateReservation } from '../services/ApiService';
import Header from './Header';

function ReservationPage() {
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [ReservationStartDate, setReservationStartDate] = useState('');
    const [ReservationEndDate, setReservationEndDate] = useState('');
    const [isAudiobook, setIsAudiobook] = useState(false);
    const [quickPickUp, setQuickPickUp] = useState(false);
    const { bookId } = useParams();

    useCheckAuthentication();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await fetchBook(bookId);
                setBook(bookData);
                if (!bookData.haveAudiobook) {
                    setQuickPickUp(false);
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchData();
    }, [bookId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = getUserId();
        const reservationData = {
            bookId: parseInt(bookId),
            userId: parseInt(userId),
            ReservationStartDate,
            ReservationEndDate,
            type: isAudiobook? 1 : 0,
            quickPickUp
        };

        try {
            const response = await fetchCreateReservation(reservationData);

            if (response.ok) {
                navigate("/books");
            } else {
                console.error('Error creating reservation:', response.statusText);
                alert("Something went wrong. Please try again");
            }
        } catch (error) {
            console.error('Error creating booking:', error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Create a New Reservation</h2>

                {book && (
                    <Col md={{ span: 4, offset: 4 }} className="mb-4">
                        <Card style={{ width: '100%', maxWidth: '15rem', margin: 'auto' }}>
                            <Card.Img variant="top" src={book.pictureUrl || 'default-book.jpg'} alt={book.name} />
                            <Card.Body>
                                <Card.Title>{book.name}</Card.Title>
                                <Card.Text>Year: {new Date(book.year).getFullYear()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="ReservationStartDate">
                        <Form.Label>Check-in Date</Form.Label>
                        <Form.Control style={{maxWidth: '15rem'}}
                            type="date"
                            value={ReservationStartDate}
                            onChange={(e) => setReservationStartDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="ReservationEndDate">
                        <Form.Label>Check-out Date</Form.Label>
                        <Form.Control style={{ maxWidth: '15rem' }}
                            type="date"
                            value={ReservationEndDate}
                            onChange={(e) => setReservationEndDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="isAudiobook">
                        <Form.Check
                            type="checkbox"
                            label="I need audiobook"
                            checked={isAudiobook}
                            onChange={(e) => setIsAudiobook(e.target.checked)}
                            disabled={!book?.haveAudiobook} // Disable if no audiobook
                        />
                    </Form.Group>

                    <Form.Group controlId="quickPickUp">
                        <Form.Check
                            type="checkbox"
                            label="Quick Pick Up"
                            checked={quickPickUp}
                            onChange={(e) => setQuickPickUp(e.target.checked)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">Reserve</Button>
                </Form>
            </div>
        </>
    );
}

export default ReservationPage;
