import API_BASE_URL from '../constants/ApiConstants';
import { getToken } from './AuthService';

export const fetchReservations = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/Reservations`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch reservations');
        }
    } catch (error) {
        console.error(error);
    }
};

export const fetchCreateReservation = async (reservationData) => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/Reservations`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            return response;
        } else {
            throw new Error('Failed to create reservation');
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    }
};

export const fetchBooks = async (searchQuery, filterYear, filterAudiobook) => {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.append('name', searchQuery);
    if (filterYear) queryParams.append('year', filterYear);
    if (filterAudiobook) queryParams.append('haveAudiobook', filterAudiobook);

    try {
        const response = await fetch(`${API_BASE_URL}/Books?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch books');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

export const fetchBook = async (bookId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Books/${bookId}`);
        if (!response.ok) throw new Error('Failed to fetch book');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching book:', error);
    }
};
