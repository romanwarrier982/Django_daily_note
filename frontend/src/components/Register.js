import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../store/auth";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
    });
    const { first_name, last_name, email, password, re_password } = formData;

    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === re_password) {
            dispatch(signup(first_name, last_name, email, password, re_password));
            setAccountCreated(true);
        }
    };

    useEffect(() => {
        isAuthenticated && navigate("/");
        accountCreated && navigate("/login");
    }, [isAuthenticated, accountCreated, navigate]);

    return (
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Create your account</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={handleOnChange}
                        className="form-control"
                        id="first_name"
                        required
                        placeholder="Enter First Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={handleOnChange}
                        className="form-control"
                        id="last_name"
                        required
                        placeholder="Enter Last Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        className="form-control"
                        id="email"
                        required
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
                        required
                        placeholder="Password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="re_password">Confirm Password</label>
                    <input
                        type="password"
                        name="re_password"
                        value={re_password}
                        onChange={handleOnChange}
                        className="form-control"
                        id="re_password"
                        required
                        placeholder="Confirm Password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary  mt-3"
                    style={{ borderRadius: "50px" }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;