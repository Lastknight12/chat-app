import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  
  return (
    <div className='formContainer'>
      <div className="loginformWrapper">
        <div className="form">
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <input type="email" />
              <span>Email</span>
              <i></i>
            </div>
            <div className="password">
              <input type="password" />
              <span>Password</span>
              <i></i>
            </div>
            <button>Sign In</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>You don't have an account? <Link className='link' to="/register" element="Register">Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login