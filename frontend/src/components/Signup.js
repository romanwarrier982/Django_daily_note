import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = () => {

    const [error, setError] = useState();  
    const [success, setSuccess] = useState(''); 

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        re_password: "",
    });
    const { first_name, last_name, username, email, password, re_password } = formData;

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {  
        e.preventDefault();  
        if (password === re_password) {  
            try {  
                await axios.post('http://localhost:8000/api/auth/signup/', {  
                    first_name,  
                    last_name,  
                    username,  
                    email,  
                    password  
                }, {  
                    headers: {  
                        'Content-Type': 'application/json'  
                    },  
                    withCredentials: true,  
                });  
                setSuccess('User created successfully!');  
                setError('');

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
            } catch (error) {  
                let errorMessage = 'Error creating user. Please try again.'; // Default error message  
    
                // Check if error response exists  
                if (error.response) {  
                    // If the response data is an object, extract meaningful error messages  
                    const backendErrors = error.response.data.error;
                    console.log(backendErrors)
    
                    if (typeof backendErrors === 'string') {  
                        errorMessage = backendErrors; // Single string error  
                    } else if (Array.isArray(backendErrors)) {  
                        errorMessage = backendErrors.join(', '); // Join array messages into a single string  
                    } else if (typeof backendErrors === 'object') {  
                        // Handle nested objects, assuming the object might have messages we want to display
                        errorMessage = Object.values(backendErrors).flat().join(', ');  
                    }  
                } else {  
                    // The request was made but no response was received  
                    errorMessage = 'Network error. Please try again later.';  
                }  
                
                setError(errorMessage); // Set the formatted error message  
                setSuccess('');  
            }  
        } else {  
            setError('Password does not match. Please try again.');  
        }  
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter First Name"
                            name='first_name'
                            type='text'
                            value={first_name}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter Last Name"
                            name='last_name'
                            type='text'
                            value={last_name}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
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
                        <label>Email</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter Email"
                            name='email'
                            type='email'
                            value={email}
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
                    <div className="form-group mt-3">
                        <label>Confirm</label>
                        <input
                            name='re_password'
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={re_password}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p className="my-3">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}  
                    {success && <p style={{ color: 'green' }}>{success}</p>} 
                </div>
            </form>
        </div>
    );
};

export default Signup;