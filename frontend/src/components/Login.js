import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = formData;

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:8000/token/', { username: username, password: password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }, { withCredentials: true });

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        console.log(localStorage.getItem('access_token'));
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/'
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter Username"
                            name='username'
                            type='text'
                            value={username}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p className="my-3">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;