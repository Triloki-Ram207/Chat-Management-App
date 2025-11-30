import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../cssFiles/SignupForm.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { signupUser } from '../api/auth.js';
import toast from "react-hot-toast";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
       await signupUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        termsAccepted: data.terms,
      });

      toast.success("Account created successfully!");
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      const message = error.response?.data?.message || "Signup failed. Try again.";
      toast.error(message);
      setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password');

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Create an account</h2>
        <NavLink to="/login" className="switch-link">Sign in instead</NavLink>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="input-group">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && <span className="error">First name is required</span>}
        </div>

        <div className="input-group">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && <span className="error">Last name is required</span>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="error">Email is required</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && <span className="error">Password must be at least 6 characters</span>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        </div>

        <label className="checkbox-label">
          <input type="checkbox" {...register('terms', { required: true })} />
          <span>
            By creating an account, I agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <span className="error">You must agree to the terms</span>}

        {apiError && <div className="error">{apiError}</div>}

        <button type="submit" disabled={!watch('terms') || loading}>
          {loading ? 'Creating...' : 'Create an account'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
