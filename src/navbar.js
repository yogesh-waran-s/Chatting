import React,{useState,useEffect} from "react";
import axios from "axios";
import { HashRouter, Link, Route } from 'react-router-dom';
function Navbar() {
    const logout = () => {
        
        window.location.href = "http://localhost:3000/#/";
        window.location.reload();
        localStorage.clear();
       
    }
    const[data,pickdata]=useState([]);
    const getItem=()=>{
        var url="http://localhost:1234/request";
        axios.get(url)
        .then(response=>pickdata(response.data));
    }
    const[data1,pickdata1]=useState([]);
    const getData=()=>{
        var url="http://localhost:1234/data";
        axios.get(url)
        .then(response=>pickdata1(response.data));
    }
    useEffect(()=>{
        getItem()
        getData()
    },[true])
    if (localStorage.getItem("userid") != null) {
        var navbar = <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid ">
                    {/* <a className="navbar-brand" href="/">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                
                                <Link className="nav-link" to="/chat">Chat <i className="fa fa-comments"></i></Link>
                            </li>
                        </ul>
                        <ul className=" navbar-nav ">
                            
                        <li className="nav-item active">
                                <Link className="nav-link" to="/mydata">
                                   
                                  <p>  {localStorage.getItem("username")}</p>
                                    
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/logout" onClick={logout}>Logout <i className="fa fa-power-off"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    }
    else {
        var navbar = <>
        </>
    }
    return (
     <div className="container-fluid fix ">
         <div className="row  ">
             <div className="col-lg-12 ">
                 { navbar}
             </div>
         </div>
     </div>
    )
}
export default Navbar;