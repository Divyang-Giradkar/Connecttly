import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/Login.css'; 

const LoginForm = () => {
    const [role, setRole] = useState('user');
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (newRole, e) => {
        e.preventDefault();
        setRole(newRole);
        setIsSignup(false);
    };

    const handleLoginChange = (e) => {
        e.preventDefault();
        setIsSignup((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const apiUrl = `https://connecttly.onrender.com/api/${role}/${isSignup ? 'signup' : 'login'}`;
        const data = isSignup ? { username, email, password } : { email, password };
    
        try {
            const response = await axios.post(apiUrl, data);
    
            if (!isSignup && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('role', role); // Store role in localStorage
    
                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }
    
            alert(response.data.message || `${isSignup ? 'Signup' : 'Login'} successful!`);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="login-form-container">
            <form className="login-form-box" onSubmit={handleSubmit}>
                <div className="login-form-header">
                    <button
                        className={`role-button ${role === 'user' ? 'active-role' : ''}`}
                        onClick={(e) => handleRoleChange('user', e)}
                    >
                        User Login
                    </button>
                    <button
                        className={`role-button ${role === 'admin' ? 'active-role' : ''}`}
                        onClick={(e) => handleRoleChange('admin', e)}
                    >
                        Admin Login
                    </button>
                </div>

                <div className="login-form-title">
                    <span>
                        {role === 'user' ? 'User' : 'Admin'} {isSignup ? 'Signup' : 'Login'} Form
                    </span>
                </div>

                {isSignup && (
                    <input
                        type="text"
                        placeholder={`Enter ${role} username`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                )}
                <input
                    type="email"
                    placeholder={`Enter ${role} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder={`Enter ${role} password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button className="login-submit-button">{isSignup ? 'Signup' : 'Login'} as {role}</button>
                <h5 className="login-toggle-text" onClick={handleLoginChange}>
                    Click here for {isSignup ? 'Login' : 'Signup'}
                </h5>
            </form>
        </div>
    );
};

export default LoginForm;
