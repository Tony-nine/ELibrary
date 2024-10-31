import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../constants/ApiConstants';


const register = async (username, password, name, email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, name, email }),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();

        if (data) {
            const token = data.token;
            const userId = data.id;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            return token;
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};

const getToken = () => {
    return localStorage.getItem('token');
};

const getUserId = () => {
    return localStorage.getItem('userId');
};

const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

const useCheckAuthentication = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = isAuthenticated();
        if (!loggedIn) {
            navigate("/login");
        }
    }, [navigate]);
};

export { register, login, logout, getToken, getUserId, isAuthenticated, useCheckAuthentication };
