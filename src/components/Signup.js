import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        // const { name, email, password } = credentials;
        e.preventDefault();
        //API call
        const response = await fetch(`https://inotebook-backend-kr4e.onrender.com/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save auth-token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account Created", 'success');
        }
        else {
            props.showAlert("Invalid Credentials", 'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="registration-form" >
            <form onSubmit={handleSubmit}>
                <div className="form-icon">
                    <span><i className="fa-solid fa-user" style={{ color: "#ffffff" }} /></span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="name" name='name' onChange={onChange} value={credentials.name} placeholder="Fullname" />
                </div>
                <div className="form-group" >
                    <input type="email" className="form-control item" id="email" name='email' onChange={onChange} value={credentials.email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control item" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" minLength={5} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control item" id="cpassword" name='cpassword' onChange={onChange} placeholder="Confirm Password" minLength={5} />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={credentials.password.length < 5 || credentials.cpassword.length < 5} className="btn btn-block create-account">Sign Up</button>
                </div>
            </form>
            <div className="social-media">
                <h5>Already a User?</h5>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}

export default Signup
