import React,{useState,useEffect} from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Products from "./products";

const Main = () => {
    
    return(
        <>
        <Nav />
        <div className="" >
            <Products/>
        </div>
        </>
    )
}

export default Main