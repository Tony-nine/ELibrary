import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../components/AuthService';
import Header from './Header';

function HotelRooms() {
    const navigate = useNavigate();
    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [hotelName, setHotelName] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated()); // Check authentication status when component mounts
    }, []);
    if (!isLoggedIn) {
        navigate("/login");
    }

    useEffect(() => {
        fetch(`http://localhost:5285/api/Hotels/${hotelId}`)
            .then(response => response.json())
            .then(data => setHotelName(data.name))
            .catch(error => console.error('Error fetching hotel name:', error));
        // Fetch rooms for the selected hotel using hotelId
        fetch(`http://localhost:5285/api/Rooms/Hotel/${hotelId}`)
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, [hotelId]);

    
    return (
        <><Header />
            <Container className="my-5">
                <h2 className="text-center mb-5">Rooms of Hotel { hotelName}</h2>
            <Row>
                {rooms.map(room => (
                    <Col md={4} key={room.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={room.pictureUrl || 'default-room.jpg'} alt={room.name} />
                            <Card.Body>
                                
                                <Card.Text>{room.type}</Card.Text>
                                <Link to={`/booking/room/${room.id}`}>Book this room</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container></>
    );
}

export default HotelRooms;
