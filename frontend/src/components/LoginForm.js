import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styling/Login.css';

const LoginForm = () => {
    const [role, setRole] = useState('user');
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
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
        setLoading(true); // Start loading

        const apiUrl = `https://connecttly.onrender.com/api/${role}/${isSignup ? 'signup' : 'login'}`;
        const data = isSignup ? { username, email, password } : { email, password };

        try {
            const response = await axios.post(apiUrl, data);

            if (!isSignup && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('role', role);

                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }

            toast.success(response.data.message || `${isSignup ? 'Signup' : 'Login'} successful!`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form-box" onSubmit={handleSubmit}>
                <div className="login-form-header">
                    <button
                        className={`role-button ${role === 'user' ? 'active-role' : ''}`}
                        onClick={(e) => handleRoleChange('user', e)}
                        disabled={loading} // Disable role change during loading
                    >
                        User Login
                    </button>
                    <button
                        className={`role-button ${role === 'admin' ? 'active-role' : ''}`}
                        onClick={(e) => handleRoleChange('admin', e)}
                        disabled={loading} // Disable role change during loading
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
                        disabled={loading} // Disable input during loading
                    />
                )}
                <input
                    type="email"
                    placeholder={`Enter ${role} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    disabled={loading} // Disable input during loading
                />
                <input
                    type="password"
                    placeholder={`Enter ${role} password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    disabled={loading} // Disable input during loading
                />
                <button 
                    className="login-submit-button" 
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Processing...' : `${isSignup ? 'Signup' : 'Login'} as ${role}`}
                </button>
                <h5 
                    className="login-toggle-text" 
                    onClick={handleLoginChange} 
                    style={{ cursor: 'pointer', color: loading ? 'gray' : 'inherit' }} 
                    disabled={loading} // Disable toggle during loading
                >
                    Click here for {isSignup ? 'Login' : 'Signup'}
                </h5>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default LoginForm;
