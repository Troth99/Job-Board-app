import { API_BASE } from "../api";

export const loginUser = async (email: string, password: string) => {
        if (!email || !password) {
        throw new Error('Email and password are required');
    }
    try {
        const response = await fetch(`${API_BASE}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

     
        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText);
        }

    
        const data = await response.json();

        console.log(data)
        if (data && data.token) {
            return data;
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Login Error:', error);
        throw error; 
    }
};


export function getAuthToken(): string | null {
    return localStorage.getItem('authToken')
}