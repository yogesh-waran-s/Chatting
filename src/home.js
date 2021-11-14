import { useState } from "react/cjs/react.development";
import React, { useEffect } from 'react';
function Home(){
    const [data, pickdata] = useState([]);
    const getItem = () => {
        var url = "http://localhost:1234/user";
        axios.get(url)
            .then(response => pickdata(response.data));
    }
    const [data1, pickdata1] = useState([]);
    const getData = () => {
        var url = "http://localhost:1234/gender";
        axios.get(url)
            .then(response => pickdata1(response.data));
    }
    useEffect(()=>{
        getData()
        getItem()
    },[true])
    return(
        <div className="container-fluid">
            <div className="row">
                lknjlk
                {
                    data.map((info,pos)=>{
                        if(localStorage.getItem("username")!=(info.fname+" "+info.sname)){
                            return(
                                data1.map((info1,pos1)=>{
                                    if(info.gender=="Male"){
                                        return(
                                            <div className="col-lg-4" key={pos}>
                                                <img src={info1.male} width="50px" height="50px"/>
                                                <p>{info.name}</p>
                                            </div>
                                        )
                                    }
                                })
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
export default Home;