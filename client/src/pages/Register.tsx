import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

export const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navi = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await register(username, email, password);
            setUser(user.user);
            navi('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='register'>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className='input2'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
