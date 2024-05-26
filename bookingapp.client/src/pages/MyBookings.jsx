import React, { useEffect, useState } from 'react';
import { getToken } from '../components/AuthService';
import { Table, Container, Alert } from 'react-bootstrap';
import Header from './Header';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = getToken();
            try {
                const response = await fetch('http://localhost:5285/api/Bookings/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    setError('Failed to fetch bookings');
                }
            } catch (error) {
                setError('Failed to fetch bookings');
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
                <h2>My Bookings</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {bookings.length > 0 ? (
                    <div className="table-responsive">
                        <Table striped bordered hover className="table-responsive">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Hotel</th>
                                    <th>Room type</th>
                                    <th>Check-in Date</th>
                                    <th>Check-out Date</th>
                                    <th>Guest Name</th>
                                    <th>Guest Email</th>
                                    <th>Breakfast Included</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.room.hotel?.name || 'N/A'}</td>
                                        <td>{booking.room.type}</td>
                                        <td>{formatDate(booking.checkInDate)}</td>
                                        <td>{formatDate(booking.checkOutDate)}</td>
                                        <td>{booking.guestName}</td>
                                        <td>{booking.guestEmail}</td>
                                        <td>{booking.breakfastIncluded ? 'Yes' : 'No'}</td>
                                        <td>{booking.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <p>No bookings found.</p>
                )}
            </Container>
        </>
    );
};

export default MyBookings;
