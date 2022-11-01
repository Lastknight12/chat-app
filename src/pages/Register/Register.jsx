import React from 'react'
import Adduser from "../../img/add-user.png"
import Login from "../Login/Login.jsx"
import "./register.scss"
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [ err, setErr ] = useState(false)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <div className="form">
            <span className="title">Register</span>
              <form onSubmit={handleSubmit}>
                <div className="text">
                  <input required type="text" />
                  <span>Username</span>
                  <i></i>
                </div>
                <div className="email">
                  <input required type="email" />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="password">
                  <input required type="password" />
                  <span>Password</span>
                  <i></i>
                </div>
                  <input required type="file" style={{display:"none"}} id="file"/>
                  <label htmlFor="file" className='label'>
                    <img src={Adduser} alt="AddAvatar" />
                    <span>Add an avatar</span>
                  </label>
                  <button disabled={loading}>Sign Up</button>
                  {loading && "Uploading and compressing the image please wait..."}
                  { err && <span>Something went wrong</span> }
              </form>
          <p>You do have an account? <Link className='link' to="/login" element="Login">Signin</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register