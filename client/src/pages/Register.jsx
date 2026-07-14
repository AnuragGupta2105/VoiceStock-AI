import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Auth.css";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const register = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      const res = await API.post("/auth/register", form);

      setSuccess("✅ Account created successfully!");

      setLoading(false);

      setTimeout(() => {

        navigate("/login");

      }, 1200);

    }

    catch (err) {

      setLoading(false);

      setError(

        err.response?.data?.message ||

        "Registration Failed. Please try again."

      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-container">

        <div className="left-panel">

          <h1>VoiceStock AI</h1>

          <h3>Smart AI Shopping Assistant</h3>

          <p>

            ✔ Voice Shopping

            <br />

            ✔ AI Recommendations

            <br />

            ✔ Shopping History

            <br />

            ✔ Smart Insights

          </p>

        </div>

        <div className="right-panel">

          <form
            className="auth-card"
            onSubmit={register}
          >

            <h2>Create Account</h2>

            <p>

              Join VoiceStock AI today.

            </p>

            {error && (

              <div className="error">

                {error}

              </div>

            )}

            {success && (

              <div className="success">

                {success}

              </div>

            )}

            <div className="input-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                required
              />

            </div>

            <button
              className="auth-btn"
              disabled={loading}
            >

              {loading

                ? "Creating Account..."

                : "Create Account"}

            </button>

            <div className="bottom-link">

              Already have an account?{" "}

              <Link to="/login">

                Login

              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}