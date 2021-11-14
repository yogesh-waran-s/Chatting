// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// function Home() {
//     const [data, pickdata] = useState([]);
//     const getItem = () => {
//         var url = "http://localhost:1234/user";
//         axios.get(url)
//             .then(response => pickdata(response.data));
//     }
//     const request = (number, send, sna) => {
//         var url = "http://localhost:1234/request";
//         var data1 = {
//             to: send + " " + sna,
//             send: localStorage.getItem("username"),
//             status: "requested",
//             number: number
//         }
//         axios.post(url, data1)
//         window.location.reload();
//     }
//     const [value, pickvalue] = useState([]);
//     const getData = () => {
//         var url = "http://localhost:1234/request";
//         axios.get(url).then(response => pickvalue(response.data))
//     }
//     useEffect(() => {
//         getItem()
//         getData()
//     }, [true])

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-lg-6">
//                     {
//                         data.map((info, pos) => {
//                             if (localStorage.getItem("username") != (info.fname + " " + info.sname)) {
//                                 return (
//                                     value.map((info1) => {
//                                         if (info.number != info1.number) {
//                                             return (
//                                                 <div key={pos}>
//                                                     <h5>{info.fname}</h5>
//                                                     <button className="btn btn-primary btn-sm" onClick={request.bind(this, info.number, info.fname, info.sname)}>Add friend</button>
//                                                 </div>
//                                             )
//                                         }
//                                     })
//                                 )
//                             }
//                         })
//                     }
//                 </div>

//                 <div className="col-lg-6">
//                     {
//                         value.map((info, pos) => {
//                             return (
//                                 <div key={pos}>
//                                     <h5>{info.to}</h5>
//                                     <button className="btn btn-success btn-sm" >Accept friend</button>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Home;

import { useState } from "react/cjs/react.development";
import React, { useEffect } from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import axios from "axios";
function Home() {
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
    const [statusDetail, getstatusDetail] = useState([]);
    const getProfile = () => {
        axios.get("http://localhost:1234/statusData")
            .then(response => {
                getstatusDetail(response.data);
            })
    }
    useEffect(() => {
        getData()
        getItem()
        getProfile()
    }, [true])
    return (
        <div className="container-fluid bg-info home">
            <div className="row">

                {
                    data.map((info, pos) => {
                        if (localStorage.getItem("username") != (info.fname + " " + info.sname)) {
                            return (
                                data1.map((info1, pos1) => {
                                    if (info.gender == "Male") {
                                        return (
                                            <div className="col-lg-3  canrd m-3 ss" key={pos}>
                                                <div className="cs">
                                                    <div className="card-body  text-center"><img src={info1.male} className="pro" width="100px" height="100px" /></div>
                                                    <div className=" text-center text-primary"><h1 >{info.fname}</h1></div>
                                                    <div className="bt">
                                                        <button className="btn btn-primary">
                                                            <label className="text-success ">
                                                                <Link to={`/chat/detail/${info.number}`} className="chate">About</Link>
                                                            </label>
                                                            
                                                        </button>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  className="text-success">
                                                                <label className="text-dark">Message<i className="fa fa-comments"></i></label>
                                                                
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    }
                                    else if (info.gender == "Female") {
                                        return (
                                            <div className="col-lg-3 canrd m-3 ss" key={pos}>
                                                <div className="cs">
                                                    <div className="card-body  text-center"><img src={info1.female} width="100px" height="100px" /></div>
                                                    <div className=" text-center text-primary"><h1 >{info.fname}</h1></div>
                                                    <div className="bt">
                                                        <button className="btn btn-primary">
                                                            <label className="text-success ">
                                                                <Link to={`/chat/detail/${info.number}`} className="chate">About</Link>
                                                            </label>
                                                            
                                                        </button>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                            <label className="text-dark">Message<i className="fa fa-comments"></i></label>

                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    } 
                                    else if (info.gender == "She:'Wish her a happy birthday'") {
                                        return (
                                            <div className="col-lg-3 canrd m-3 ss" key={pos}>
                                                <div className="cs">
                                                    <div className="card-body  text-center"><img src={info1.She} width="100px" height="100px" /></div>
                                                    <div className=" text-center text-primary"><h1 >{info.fname}</h1></div>
                                                    <div className="bt">
                                                        <button className="btn btn-primary">
                                                            <label className="text-success ">
                                                                <Link to={`/chat/detail/${info.number}`} className="chate">About</Link>
                                                            </label>
                                                            
                                                        </button>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                            <label className="text-dark">Message<i className="fa fa-comments"></i></label>

                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    } 
                                    else if (info.gender == "He:'Wish him a happy birthday'") {
                                        return (
                                            <div className="col-lg-3 canrd m-3 ss" key={pos}>
                                                <div className="cs">
                                                    <div className="card-body  text-center"><img src={info1.He} width="100px" height="100px" /></div>
                                                    <div className=" text-center text-primary"><h1 >{info.fname}</h1></div>
                                                    <div className="bt">
                                                        <button className="btn btn-primary">
                                                            <label className="text-success ">
                                                                <Link to={`/chat/detail/${info.number}`} className="chate">About</Link>
                                                            </label>
                                                            
                                                        </button>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                            <label className="text-dark">Message<i className="fa fa-comments"></i></label>

                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    } 
                                    else if (info.gender == "They:'Wish they a happy birthday'") {
                                        return (
                                            <div className="col-lg-3 canrd m-3 ss" key={pos}>
                                                <div className="cs">
                                                    <div className="card-body  text-center"><img src={info1.They} width="100px" height="100px" /></div>
                                                    <div className=" text-center text-primary"><h1 >{info.fname}</h1></div>
                                                    <div className="bt">
                                                        <button className="btn btn-primary">
                                                            <label className="text-success ">
                                                                <Link to={`/chat/detail/${info.number}`} className="chate">About</Link>
                                                            </label>
                                                            
                                                        </button>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                            <label className="text-dark">Message<i className="fa fa-comments"></i></label>

                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
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