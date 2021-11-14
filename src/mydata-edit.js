import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
function Editmydata(){
    const[nickname,getNickName] = useState("")
    const[status,getStatus] = useState("");
    const[about,getAbout] = useState("");
    const{editId} = useParams();
    const getProfile=()=>{
        var url="http://localhost:1234/statusData/"+editId;
        axios.get(url)
        .then(response=>{
            getNickName(response.data.nickname);
            getStatus(response.data.status);
            getAbout(response.data.about);
        })
    }
    const updateProfile=()=>{
        var url="http://localhost:1234/statusData/"+editId;
        var data={
            nickname:nickname,
            status:status,
            about:about,
            mobileNumber:localStorage.getItem("usernumber")
        }
        axios.put(url,data)
        window.location.href="http://localhost:3000/#/mydata";
    }
    useEffect(()=>{
        getProfile();
    },[true])
    return(
        <div className="col-lg-4 offset-4 text-center">
            <h1 className="text-center text-success">Edit My Profile</h1>
            <input className="form-control" type="text" value={nickname} onChange={obj=>getNickName(obj.target.value)} placeholder="Enter Nick Name"/>
            <input className="form-control mt-4" type="text" value={status} onChange={obj=>getStatus(obj.target.value)} placeholder="Update Status"/>
            <textarea className="form-control mt-4" value={about} onChange={obj=>getAbout(obj.target.value)}></textarea>
            <button className="btn btn-success mt-4" onClick={updateProfile}>Update</button>
        </div> 
    )
}
export default Editmydata;