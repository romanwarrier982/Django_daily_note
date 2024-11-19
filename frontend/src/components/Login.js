import React, { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const [error, setError] = useState('');  

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (  
        <div className="container mt-5">  
            <h1>Login</h1>
            <p>Sign into your account</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                />
                </div>

                <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{ borderRadius: "50px" }}
                >
                Login
                </button>
            </form>

            <p className="my-3">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

            <p className="my-3">
                Forgot your password? <Link to="/reset-password">Reset Password</Link>
            </p>
        </div>  
    );  
};  

export default Login;