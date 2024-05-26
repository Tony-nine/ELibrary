import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getToken, isAuthenticated } from '../components/AuthService';
import Header from './Header';
function BookingPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated()); // Check authentication status when component mounts
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [breakfastIncluded, setBreakfastIncluded] = useState(false);
    const { roomId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            roomId: parseInt(roomId),
            checkInDate,
            checkOutDate,
            guestName,
            guestEmail,
            breakfastIncluded
        };

        try {
            //console.log(bookingData);
            const token = getToken();
            const response = await fetch('http://localhost:5285/api/Bookings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                navigate("/bookings");
            } else {
                // Handle error response
                console.error('Error creating booking:', response.statusText);
                alert("Something went wrong. Please try again");
            }
        } catch (error) {
            console.error('Error creating booking:', error.message);
        }
    };

    return (
        <><Header />
            <div className="container mt-5">
            <h2>Create a New Booking</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="checkInDate">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="checkOutDate">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="guestName">
                    <Form.Label>Guest Name</Form.Label>
                    <Form.Control type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="guestEmail">
                    <Form.Label>Guest Email</Form.Label>
                    <Form.Control type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="breakfastIncluded">
                    <Form.Check type="checkbox" label="Include Breakfast" checked={breakfastIncluded} onChange={(e) => setBreakfastIncluded(e.target.checked)} />
                </Form.Group>

                <Button variant="primary" type="submit">Book</Button>
            </Form>
            </div>
        </>
    );
}

export default BookingPage;
