import React,{useState,useEffect} from "react";
import axios from "axios";
function Frdrqt(){
    const[data,pickdata]=useState([]);
    const getItem=()=>{
        var url="http://localhost:1234/request";
        axios.get(url)
        .then(response=>pickdata(response.data));
    }
    useEffect(()=>{
        getItem()
    },[true])
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-4">
                    {
                        data.map((info,pos)=>{
                            if (localStorage.getItem("username") !=info.send) {
                            return(
                                <div key={pos}>
                                    <h5>{info.send}</h5>
                                    <button className="btn btn-success">Accept Request</button>
                                </div>
                            )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Frdrqt;