import React, { useState,useEffect } from "react";
import bgimage from "./images/bg.jpg"
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const [see, setSee] = useState(false)
    const [name, setName] = useState("");
    const [password, setPasword] = useState("");
    const [token, settoken] = useState("");
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name)
        formData.append("password", password)
        const res = await fetch('http://localhost:5050/user/login',
            {
                method: "post",
                body: formData
            }
        )
        const response = await res.json();
        if (response.token) {
            settoken(response.token);
            sessionStorage.setItem("token", response.token);
        }
        setMessage(response.message);
        console.log(message)
        //console.log(token)

    }

    useEffect(() => {
        setTimeout(() => {
            if (token) {
                console.log(token)
                console.log(message)
                setMessage("")
                navigate("/main")
            }
            else {
                setMessage("");
                setName("");
                setPasword("")
            }
        }, 3000)
    }, [message])


    return (
        <>
         {
        message?
        (
            <div className="message-box" >
                <h3>{message}</h3>
                <div  >
                    <button className="btn" 
                    onClick={() => {
                        if (token) {
                            console.log(token)
                            console.log(message)
                            setMessage("")
                            setName("")
                            navigate("/main")
                        }
                        else {
                            setMessage("");
                            setName("");
                            setPasword("")
                        }
                    }}
                    >Ok</button>
                </div>
            </div>
        ):
        (null)
    }
            <div className="login-container" >
                <img src={bgimage} alt="bg"
                    className="login-bg" />
                <div className="login-content" >
                    <div >
                        <h1 className="login-left">This is a platform where you can buy game coins. </h1>
                    </div>
                    <div className="login-right">
                        <input className="input" placeholder="Enter your Player_Id" 
                        onChange={(e) => {setName(e.target.value)}} />
                        <div className="pass" >
                            <input className="password" placeholder="Enter your Password" 
                            onChange={(e) => {setPasword(e.target.value)}} />
                            {
                                see ? <VisibilityIcon className="icon" onClick={() => {
                                    if (see) {
                                        setSee(false)
                                        // console.log("here")
                                        // document.getElementById("password").setAttribute("type","password")
                                    }
                                }} />
                                    : <VisibilityOffIcon className="icon" onClick={() => {

                                        // console.log("clicked")


                                        setSee(true)
                                        // document.getElementById("password").setAttribute("type","text")



                                    }} />
                            }<br />
                        </div>

                        <button className="btn" onClick={handleLogin} >Login</button>
                        <p>Don't Have an Account? <span className="span" onClick={() => { navigate("/register") }}>Register</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage