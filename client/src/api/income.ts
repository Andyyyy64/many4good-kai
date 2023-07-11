import axios from "axios";

const API_URL = "http://localhost:3000/acounting";
const token = localStorage.getItem("token");

export const getIncome = async (userId: number) => {
    const response = await axios.get(`${API_URL}/income/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data.income;
}

export const addIncomes = async (userId: number | undefined, name: string | undefined, amount: number | undefined) => {
    const response = await axios.post(`${API_URL}/income`, {
        user_id: userId,
        name: name,
        amount: amount
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const deleteIncomes = async (id: number) => {
    const response = await axios.delete(`${API_URL}/delete/income/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export const changeIncomeData = async (id: number, name: string, amount: number) => {
    const response = await axios.put(`${API_URL}/change/income/${id}`, {
        name: name,
        amount: amount
    }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}