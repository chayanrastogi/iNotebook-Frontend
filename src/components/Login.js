import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        const response = await fetch(`https://inotebook-backend-kr4e.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save auth-token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Logged In Successfully", 'success');
        }
        else{
            props.showAlert("Email already in-use", 'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="registration-form" >
            <form onSubmit={handleSubmit}>
                <div className="form-icon">
                    <span><i className="fa-solid fa-user" style={{ color: "#ffffff" }} /></span>
                </div>
                {/* <div className="form-group">
                    <input type="text" className="form-control item" id="username" placeholder="Fullname" />
                </div> */}
                <div className="form-group" onChange={onChange}>
                    <input type="email" className="form-control item" id="email" name='email' onChange={onChange} value={credentials.email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control item" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" minLength={5}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block create-account">Login</button>
                </div>
            </form>
            <div className="social-media">
                <h5>Not a User?</h5>
                <Link to="/signup">Register</Link>
            </div>
        </div>
    )
}

export default Login
