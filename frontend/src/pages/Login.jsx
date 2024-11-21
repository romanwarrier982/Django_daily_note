import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/api';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {  
        try {
            const response = await login(data);
            localStorage.setItem('access_token', response.access);  
            localStorage.setItem('refresh_token', response.refresh);
            window.location.href = '/'
        } catch (error) {
            console.error("Login failed:", error.response.data);  
            alert("Login failed. Please check your credentials.");  
        }  
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            {...register("username", { required: true })}
                            className="form-control mt-1"
                            placeholder="Username or Email"
                        />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                        {errors.password && <span>This field is required</span>}  
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