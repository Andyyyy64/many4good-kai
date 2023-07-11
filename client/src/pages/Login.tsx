import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navi = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            console.log(user)
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId',user.user.id);
            localStorage.setItem('email',user.user.email);
            localStorage.setItem('username',user.user.username);
            setUser(user.user);
            navi('/');
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            alert(error.response.data.message);
            // Handle error here
        }
    };
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};
