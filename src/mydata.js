import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
function Mydata(){
    const[nickname,getNickName] = useState("");
    const[status,getStatus] = useState("");
    const[about,getAbout] = useState("");
    const updateProfile=()=>{
        var url="http://localhost:1234/statusData";
        var data={
            nickname:nickname,
            status:status,
            about:about,
            mobileNumber:localStorage.getItem("usernumber"),
            name:localStorage.getItem("userfname")
        }
        axios.post(url,data)
        .then(response=>{
            getNickName("");
            getStatus("");
            getAbout("")
            getProfile();
        })
        
    }
    const[statusDetail,getstatusDetail] = useState([]);
    const getProfile=()=>{
        axios.get("http://localhost:1234/statusData")
        .then(response=>{
            getstatusDetail(response.data);
        })
    }
    useEffect(()=>{
        getProfile();
    },[true])
    var counter=0;
    statusDetail.map((detail)=>{
        if(localStorage.getItem("usernumber")==detail.mobileNumber){
                counter+=1;
        }
    })
    if(counter==0){
        var display=<>
                    <div className="col-lg-12 text-center">
                        <input className="form-control" type="text" value={nickname} onChange={obj=>getNickName(obj.target.value)} placeholder="Enter Nick Name"/>
                        <input className="form-control mt-4" type="text" value={status} onChange={obj=>getStatus(obj.target.value)} placeholder="Update Status"/>
                        <textarea className="form-control mt-4" placeholder="Write About You..." onChange={obj=>getAbout(obj.target.value)}></textarea>
                        <button className="btn btn-success mt-4" onClick={updateProfile}>Update</button>
                    </div> 
                </>
    }
    else if(counter==1){
        var display=<>
                    {
                   statusDetail.map((detail,index)=>{
                       if(localStorage.getItem("usernumber")==detail.mobileNumber){
                           return(
                               <div className="col-lg-12" key={index}>
                                   <div className="text-end"><Link to={`/mydata/${detail.id}`}><i className="fa fa-edit"></i></Link></div>
                                   <h4 className="text-primary">Nick Name : <label className="text-dark">{detail.nickname}</label></h4>
                                   <h5  className="text-primary">Status :  <label className="text-dark">{detail.status}</label></h5>
                                   <h5  className="text-primary">About : <label className="text-dark"> {detail.about}</label></h5>
                               </div>
                           )
                       }
                   })
               }
                    </>
    }
    const[data,pickdata]=useState([]);
    const getuser=()=>{
        var url="http://localhost:1234/user";
        
        axios.get(url)
        .then(response=>pickdata(response.data))
        }
    useEffect(()=>{
        getuser()
      
    },[true])
   return(
       <div className="container mt-3">
           <div className="row">
               <div className="col-lg-6">
                   {
                       data.map((userdata,pos)=>{
                           if(localStorage.getItem("username")==(userdata.fname+" "+userdata.sname))
                           return(
                               <div key={pos}>
                                   <h1 className="text-success text-center">My Details</h1>
                                   <p>Name : {userdata.fname} {userdata.sname}</p>
                                   <p>Number : {userdata.number}</p>
                                   <p>Email : {userdata.email}</p>
                                   <p>Gender : {userdata.gender}</p>
                                   <p>Date of Birth : {userdata.date}/{userdata.month}/{userdata.year}</p>
                                   <p>Password : {userdata.password}</p>
                               </div>
                           )
                       })
                   }
               </div>
               <div className="col-lg-6">  {display}</div>
             
           </div>
       </div>
   )
}
export default Mydata;