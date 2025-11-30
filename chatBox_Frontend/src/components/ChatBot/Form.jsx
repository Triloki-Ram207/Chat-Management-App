import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../cssFiles/ChatBot/Form.css";
import { createUser } from "../../api/user";
import toast from "react-hot-toast";

export default function IntroForm({ setUserRegistered, disable = false }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.name || !data.phone || !data.email) {
      toast.error("Please fill all details before submitting!");
      return;
    }

    setLoading(true);
    try {
      const response = await createUser(data);
      setUserRegistered(true);
      // console.log(response);
      sessionStorage.setItem("ticketId", response.ticket._id);
      sessionStorage.setItem("registeredUser", JSON.stringify(response.user));
      toast.success("Ticket created successfully!");
    } catch (error) {
      setApiError(error.message || "An error occurred");
      toast.error(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="intro-form"
      onSubmit={handleSubmit(onSubmit)}
      style={disable ? { width: "320px" } : {}}
    >
      <h3>Introduce Yourself</h3>

      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        id="name"
        placeholder="Your name"
        autoComplete="off"
        {...register("name", { required: true })}
      />
      {errors.name && <p className="error-text name-error">Name is required</p>}

      <label htmlFor="phone">Your Phone</label>
      <input
        type="tel"
        id="phone"
        placeholder="+1 (000) 000–0000"
        autoComplete="off"
        {...register("phone", { required: true })}
      />
      {errors.phone && (
        <p className="error-text phone-error">Phone is required</p>
      )}

      <label htmlFor="email">Your Email</label>
      <input
        type="email"
        id="email"
        placeholder="example@gmail.com"
        autoComplete="off"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <p className="error-text email-error">Email is required</p>
      )}

      <button
        type="submit"
        className="submit-btn"
        disabled={disable || loading}
      >
        {loading ? "Submitting..." : "Thank You!"}
      </button>
    </form>
  );
}
