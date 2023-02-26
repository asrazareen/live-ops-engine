import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Nav = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [coins,setCoins] = useState(0);
    const [gems,setGems] = useState(0);
    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate("/")
    }
    const fetchData = async () => {
        const token = sessionStorage.getItem("token")
        const response = await fetch("http://localhost:5050/product/user", {
            headers: { Authorization: token }
        })

        const user = await response.json();
        setName(user.name)
        setCoins(user.coins)
        setGems(user.gems)
        //console.log(name)
    }
    useEffect(() => {
        fetchData()
    },[name])
    
    return(
        <>
        <div className="nav-container" >
            <div >
                <h2 className="logo" >Logo</h2>
                
            </div>
            <div className="username" >
                <h1>{name} </h1>
                <div>
                    <p>Gems:{gems}</p>
                    <p>Coins:{coins}</p>
                </div>
            </div>
            <div className="right-nav" >
                <h3 className="nav" onClick={()=>navigate("/main")} >Home</h3>
                {name == "Asra123" ? (
                    <h3 className="nav" onClick={()=>navigate("/sell")} >Sell</h3>
                ):(
                    null
                )
            }
                <h3 className="nav" onClick={handleLogout} >Logout</h3>
            </div>
        </div>
        </>
    )
}

export default Nav;