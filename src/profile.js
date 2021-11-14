import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {  Link } from "react-router-dom";
const Profile=()=>{
    const[val,pickval]=useState([]);
    const[data,pickdata]=useState([]);
    const getdata=()=>{
        var url="http://localhost:1234/data";
        
        axios.get(url)
        .then(response=>pickval(response.data))
        }
        const getuser=()=>{
            var url="http://localhost:1234/user";
            
            axios.get(url)
            .then(response=>pickdata(response.data))
            }
        useEffect(()=>{
            getdata()
            getuser()
            getProfile()
        },[true])
        const{profile}=useParams();
        console.log(profile);
        const[statusDetail,getstatusDetail] = useState([]);
        const getProfile=()=>{
            axios.get("http://localhost:1234/statusData")
            .then(response=>{
                getstatusDetail(response.data);
            })
        }
    return(
       <div className="container " >
           <div className="row">
               <div className="col-lg-12">
                  
               <Link to={`/chat/${profile}`}><i className="fa fa-arrow-left fa-2x" ></i></Link>
               {
                       data.map((info,pos)=>{
                           if(info.number==profile)
                           return(
                               <div key={pos}>
                                   <h1 className="text-success text-center">{info.fname} {info.sname}</h1>
                                   
                               </div>
                           )
                       })
                   }
                   <hr/>
                   </div>
                   <div className="col-lg-6">
               {
                       data.map((info,pos)=>{
                           if(info.number==profile)
                           return(
                               <div key={pos}>
                                   <p> <label className="text-primary" >Contact</label>: {info.number}</p>
                                   <p><label className="text-primary" >Email : </label><a href={`mailto:${info.email}`}>{info.email}</a></p>
                                   <p><label className="text-primary" > Gender :</label> {info.gender}</p>
                                   <p><label className="text-primary" > DoB : </label>{info.date}/{info.month}/{info.year}</p>
                               </div>
                           )
                       })
                   }
                   </div>
                   <div className="col-lg-6">
                    {
                        // data.map((info, pos) => {
                        //     return (
                                statusDetail.map((info1, pos1) => {
                                    if (profile== info1.mobileNumber)
                                        return (
                                            <div key={pos1}>
                                                <p><label className="text-primary" > Nick Name :</label> {info1.nickname}</p>
                                                <p><label className="text-primary" > Status</label> {info1.status}</p>
                                                <p><label className="text-primary" > WriteUp:</label> {info1.about}</p>
                                            </div>
                                        )

                                })
                        //     )
                        // })
                    }
               </div>
           </div>
       </div>
    )
}
export default Profile;