import axios from 'axios';

const API_URL = 'http://localhost:5285/api';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/Auth/login`, { username, password });
        // const { token } = response.data.data;
        // localStorage.setItem('token', token);
        // console.log('Token:', token);
        // localStorage.setItem('token', token);
        console.log('Response:', response);
        if (response?.data) {
            const { token } = response.data; // Destructure accessToken directly
            localStorage.setItem('token', token);
            localStorage.setItem('token', token);
            return token;
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

export { login, logout, getToken, isAuthenticated };
