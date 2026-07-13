import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Auth.css";

export default function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({

email:"",
password:""

});

const [error,setError]=useState("");

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const login=async(e)=>{

e.preventDefault();

setError("");

try{

const res = await API.post(
  "/auth/login",
  form
);

localStorage.setItem("token",res.data.token);

localStorage.setItem("user",JSON.stringify(res.data.user));

navigate("/dashboard");

}catch (err) {
  console.log(err.response?.data);

  setError(
    err.response?.data?.message ||
    "Invalid email or password"
  );
}

};

return(

<div className="auth-page">

<div className="auth-container">

<div className="left-panel">

<h1>VoiceStock AI</h1>

<h3>Smart AI Shopping Assistant</h3>

<p>

✔ Voice Shopping

<br/>

✔ AI Recommendations

<br/>

✔ Shopping History

<br/>

✔ Smart Insights

</p>

</div>

<div className="right-panel">

<form className="auth-card" onSubmit={login}>

<h2>Welcome Back</h2>

<p>Login to continue shopping smarter.</p>

{error && <div className="error">{error}</div>}

<div className="input-group">

<label>Email</label>

<input

type="email"

name="email"

onChange={handleChange}

required

/>

</div>

<div className="input-group">

<label>Password</label>

<input

type="password"

name="password"

onChange={handleChange}

required

/>

</div>

<button className="auth-btn">

Login

</button>

<div className="bottom-link">

Don't have an account?

{" "}

<Link to="/register">

Register

</Link>

</div>

</form>

</div>

</div>

</div>

);

}