import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BASE_URL;
const token = localStorage.getItem("token");

export const getIncome = async (userId: number) => {
    const response = await axios.get(`${API_URL}/acounting/income/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data.income;
}

export const addIncomes = async (userId: number | undefined, name: string | undefined, amount: number | undefined) => {
    const response = await axios.post(`${API_URL}/acounting/income`, {
        user_id: userId,
        name: name,
        amount: amount
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const deleteIncomes = async (id: number) => {
    const response = await axios.delete(`${API_URL}/acounting/delete/income/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const changeIncomeData = async (id: number, name: string, amount: number) => {
    const response = await axios.put(`${API_URL}/acounting/change/income/${id}`, {
        name: name,
        amount: amount
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}