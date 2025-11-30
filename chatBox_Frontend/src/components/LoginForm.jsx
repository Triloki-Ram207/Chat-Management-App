import React from "react";
import { useForm } from "react-hook-form";
import "../cssFiles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api/auth.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../stateManagement/memberSlice.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      dispatch(
        setAuth({
          member: response.member,
          token: response.token,
        })
      );
      localStorage.setItem("authToken", response.token);

      toast.success("Logged in successfully!");
      navigate("/navigation");
    } catch (error) {
      console.error("Login failed:", error);
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    }
  };
  return (
    <div className="login-container">
      <h2>Sign in to your Plexify</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="error">Email is required</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="error">Password is required</span>}

        <button type="submit">Log in</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;
