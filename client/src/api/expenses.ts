import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_BASE_URL;
const token = localStorage.getItem('token');

export const getExpenses = async (userId: number) => {
    const response = await axios.get(`${API_URL}/acounting/expenses/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data.expenses;
};

export const addExpenses = async (userId: number, name: string | undefined, cost: number | undefined, isFood: boolean | undefined) => {
    const response = await axios.post(`${API_URL}/acounting/expenses`, {
        user_id: userId,
        name: name,
        cost: cost,
        is_food: isFood
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const deleteExpenses = async (id: number) => {
    const response = await axios.delete(`${API_URL}/acounting/delete/expenses/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const changeExpensesData = async (id: number, name: string, cost: number, isFood: boolean) => {
    const response = await axios.put(`${API_URL}/acounting/change/expenses/${id}`, {
        name: name,
        cost: cost,
        is_food: isFood
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}
