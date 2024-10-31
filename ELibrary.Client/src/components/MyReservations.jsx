import { useEffect, useState } from 'react';
import { useCheckAuthentication } from '../services/AuthService';
import { fetchReservations } from '../services/ApiService'
import { Table, Container, Alert } from 'react-bootstrap';
import Header from './Header';

const MyReservations = () => {
    useCheckAuthentication();
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await fetchReservations();
                if (data.length === 0) {
                    setReservations([]);
                } else {
                    setReservations(data);
                }
            } catch (error) {
                setError('Failed to fetch reservations');
            }
        };

        fetchBookings();
    }, []);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h2>My Reservations</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {reservations.length > 0 ? (
                    <div className="table-responsive">
                        <Table striped bordered hover className="table-responsive">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Book year</th>
                                    <th>Audiobook</th>
                                    <th>Reserved from</th>
                                    <th>Reserved to</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Quik Pick Up</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.bookName}</td>
                                        <td>{reservation.bookYear}</td>
                                        <td>{reservation.type ? 'Yes' : 'No'}</td>
                                        <td>{formatDate(reservation.reservationStartDate)}</td>
                                        <td>{formatDate(reservation.reservationEndDate)}</td>
                                        <td>{reservation.userName}</td>
                                        <td>{reservation.userEmail}</td>
                                        <td>{reservation.quickPickUp ? 'Yes' : 'No'}</td>
                                        <td>{reservation.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <p>No reservations found.</p>
                )}
            </Container>
        </>
    );
};

export default MyReservations;
