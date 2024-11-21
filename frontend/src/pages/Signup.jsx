import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signup } from '../api';

const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await signup(data);
            alert("Registration successful!");
            window.location.href = '/login'
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            {...register("username", { required: true })}
                            className="form-control mt-1"
                            placeholder="Username"
                        />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            {...register("email", { required: true })}
                            className="form-control mt-1"
                            placeholder="Email"
                            type='email'
                        />
                        {errors.email && <span>This field is required</span>}
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
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            {...register("password2", { required: true })}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm Password"
                        />
                        {errors.password2 && <span>This field is required</span>}
                    </div>

                    <p className="my-3">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;