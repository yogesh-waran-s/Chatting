import React, { Component } from 'react';
import axios from 'axios';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            getdob: [],
            userlogin:[],
            fieldlist: {},
            errorlist: {},
            msg: "",
            mesg:"",
            nav:"",
            userdata:{}
        }
    }
    pickValue = (obj) => {
        let fieldlist = this.state.fieldlist;
        fieldlist[obj.target.name] = obj.target.value;
        if(fieldlist["gender"]=="Custom" ||
            fieldlist["gender"]=="She:'Wish her a happy birthday'"||
            fieldlist["gender"]=="He:'Wish him a happy birthday'"||
            fieldlist["gender"]=="They:'Wish they a happy birthday'")
        {
            this.state.nav=<>
                    <div className="col-lg-12 mb-3">
                        <select className="form-select"  name="gender" onChange={this.pickValue}>
                            <option value="She:'Wish her a happy birthday'">She:"Wish her a happy birthday"</option>
                            <option  value="He:'Wish him a happy birthday'">He:"Wish him a happy birthday"</option>
                            <option  value="They:'Wish they a happy birthday'">They:"Wish they a happy birthday"</option>
                        </select>
                    </div>
            </>
        }
        else{
            this.state.nav=<></>
        }
        this.setState({
            fieldlist
        })
    }
    

    getdob1 = () => {
        var url = "http://localhost:1234/d0b";
        axios.get(url).then(response => {
            this.setState({
                getdob: response.data
            })
        });
    }
    componentDidMount() {
        this.getdob1();
        this.getData();
    }

    sendMessage = (obj) => {
        obj.preventDefault();
        let fieldlist = this.state.fieldlist;
        let errorlist = this.state.errorlist;
        let loginstatus = true;
        if (!fieldlist["fname"] || fieldlist["fname"] == "") {
            loginstatus = false;
            errorlist["fnameerror"] = "Please Enter First Name";
        }
        else {
            errorlist["fnameerror"] = "";
        }
        if (!fieldlist["sname"] || fieldlist["sname"] == "") {
            loginstatus = false;
            errorlist["snameerror"] = "Please Enter Surename";
        }
        else {
            errorlist["snameerror"] = "";
        }
        let mpattern = /^[0-9]\d{9}$/;
        if(!mpattern.test(fieldlist["number"])){
            loginstatus=false;
            errorlist["numbererror"]="Please Enter Number";
        }
        else{
            errorlist["numbererror"]="";
        }
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!epattern.test(fieldlist["email"])){
            loginstatus=false;
            errorlist["emailerror"]="Please Enter Email";
        }
        else{
            errorlist["emailerror"]="";
        }
        let ppattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!ppattern.test(fieldlist["password"])){
            loginstatus=false;
            errorlist["passworderror"]="Please Enter vaild Password";
        }
        else{
            errorlist["passworderror"]="";
        }
        if(!fieldlist["date"]||fieldlist["date"]==""){
            errorlist["dateerror"]="Please Enter Date";
        }
        else{
            errorlist["dateerror"]="";
        }
        if(!fieldlist["month"]||fieldlist["month"]==""){
            errorlist["montherror"]="Please Enter month";
        }
        else{
            errorlist["montherror"]="";
        }
        if(!fieldlist["year"]||fieldlist["year"]==""){
            errorlist["yearerror"]="Please Enter Year";
        }
        else{
            errorlist["yearerror"]="";
        }
        if(!fieldlist["gender"]||fieldlist["gender"]==""){
            errorlist["gendererror"]="Please Select Gender";
        }
        else{
            errorlist["gendererror"]="";
        }
        this.setState({
            errorlist
        })
        if(this.state.errorlist.fnameerror=="" && 
          this.state.errorlist.snameerror==""  &&
          this.state.errorlist.numbererror=="" && 
          this.state.errorlist.emailerror==""  &&
          this.state.errorlist.dateerror==""   &&
          this.state.errorlist.montherror==""  &&
          this.state.errorlist.yearerror==""   &&
          this.state.errorlist.gendererror=="" && 
          this.state.errorlist.passworderror==""){
        var url = "http://localhost:1234/user";
        axios.post(url, this.state.fieldlist)
        window.location.reload();

        }
        //console.log(this.state.fieldlist);
    }
    
   
    getData=()=>{
        var url = "http://localhost:1234/user";
        axios.get(url).then(response=>{
           this.setState({
            userlogin:response.data
           })
        })
    }

    pickData=(obj)=>{
        var userdata=this.state.userdata;
        userdata[obj.target.name]=obj.target.value;
    }
    save=()=>{
        var userdata=this.state.userdata;
        var errorlist=this.state.errorlist;
        console.log(this.state.userdata);
        var formstatus=false;
                if((userdata["logemail"]=="") || (userdata["logpassowrd"]=="")){
                    this.setState({
                        mesg:"Please Enter Email & Password"
                    })

                }
                
                else{
                   
                    this.setState({
                        msg:"Loading Please Wait"
                    })
                    this.state.userlogin.map((info1,pos)=>{
                       
                            if((userdata["logemail"]==info1.email||userdata["logemail"]==info1.number)&&userdata["logpassword"]==info1.password){
                                formstatus=true;
                                localStorage.setItem("username",(info1.fname+" "+info1.sname));
                                localStorage.setItem("userfname",(info1.fname));
                                localStorage.setItem("userid",info1.id);
                                localStorage.setItem("usernumber",info1.number);
                                localStorage.setItem("usergender",info1.gender);
                                window.location.href="http://localhost:3000/#/home"
                                window.location.reload();
                                
                            }
                            else{
                                this.setState({
                                    msg:"Not Found"
                                })
                            }
                        })
                   
                }
         
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="con">
                            <div className="con1">
                                <label className="text-primary la">Chatting</label>
                                <h6 className="h"> Connecting people to each other.</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 car">
                        <div className="card p-3">
                        <i className="text-success">{this.state.msg}</i>
                        <i className="text-danger">{this.state.mesg}</i>
                            
                            <input type="text" placeholder="Email" className="form-control form-control-lg mt-3 mb-3" name="logemail" onChange={this.pickData}/>
                            <input type="password" placeholder="Password" className="form-control form-control-lg mb-3" name="logpassword" onChange={this.pickData} />
                            <button className="bt btn-primary mb-3" onClick={this.save}>Login</button>
                            <div >
                               <div className="text-center"><a href="" className="for" >Forgotten Password</a></div> 
                                <hr />
                                <div className="text-center"><button type="button" className="bta" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Create New Account
                                </button>
                                </div>
                                <div>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="text-center">Sign Up</h1>

                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="">

                                                        <form action="#" method="POST"  className="">
                                                            <p>{this.mesg}</p>
                                                            <div className="row mb-3">
                                                                <div className="col-lg-6"><input type="text" placeholder="First Name" className="form-control" name="fname" onChange={this.pickValue} />
                                                                <i className="text-danger">{this.state.errorlist.fnameerror}</i>
                                                            </div>

                                                                <div className="col-lg-6"><input type="text" placeholder="SureName" className="form-control" name="sname" onChange={this.pickValue} />
                                                                <i className="text-danger">{this.state.errorlist.snameerror}</i>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <input type="number" placeholder="Mobile Number" className="form-control" name="number" onChange={this.pickValue} />
                                                                <i className="text-danger">{this.state.errorlist.numbererror}</i>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <input type="email" placeholder="Email" className="form-control" name="email" onChange={this.pickValue} />
                                                                <i className="text-danger">{this.state.errorlist.emailerror}</i>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <div className="col-lg-4">
                                                                    <select className="form-control" name="date" onChange={this.pickValue}>
                                                                        {
                                                                            this.state.getdob.map((info, pos) => {
                                                                                return (
                                                                                    info.date.map((date, pos) => {
                                                                                        return (
                                                                                            <option key={pos}>{date}</option>
                                                                                        )
                                                                                    })
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <i className="text-danger">{this.state.errorlist.dateerror}</i>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <select className="form-select" name="month" onChange={this.pickValue}>
                                                                        {
                                                                            this.state.getdob.map((info, pos) => {
                                                                                return (
                                                                                    info.month.map((month, pos) => {
                                                                                        return (
                                                                                            <option key={pos} >{month}</option>
                                                                                        )
                                                                                    })
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <i className="text-danger">{this.state.errorlist.montherror}</i>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <select className="form-control" name="year" onChange={this.pickValue}>
                                                                        {
                                                                            this.state.getdob.map((info, pos) => {
                                                                                return (
                                                                                    info.year.map((year, pos) => {
                                                                                        return (
                                                                                            <option key={pos}>{year}</option>
                                                                                        )
                                                                                    })
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <i className="text-danger">{this.state.errorlist.yearerror}</i>
                                                                </div>
                                                                {/* <div className="col-lg-12 mt-3">
                                                                    <select className="form-select" placeholder="gender" onChange={this.pickValue} name="gender">
                                                                        <option >--select--</option>
                                                                        <option >Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                    <i className="text-danger">{this.state.errorlist.gendererror}</i>
                                                                </div> */}
                                                                
                                                            </div>
                                                            <div className="row mb-3">
                                                                <div className="col-lg-4 ">
                                                                  <label className="border gen col-lg-12 p-2"> Male<input type="radio" className=" gend" name="gender" value="Male"  onChange={this.pickValue}/> </label>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                <label className="border gen col-lg-12 px-2 py-2"> Female<input type="radio" className=" ge"  name="gender" value="Female"  onChange={this.pickValue}/> </label>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                <label className="border gen col-lg-12 px-2 py-2">Custom<input type="radio" className="ge"  name="gender" value="Custom"   onChange={this.pickValue} onClick={this.custom}/> </label>
                                                                </div>
                                                            </div>
                                                            {this.state.nav}
                                                            <i className="text-danger">{this.state.errorlist.gendererror}</i>
                                                            <div className="col-lg-12 mb-1">
                                                                <input type="password" placeholder="Password " className="form-control" name="password" onChange={this.pickValue} />
                                                                <i className="text-danger">{this.state.errorlist.passworderror}</i>
                                                            </div>
                                                                <details>
                                                                    <summary>Password constraints</summary>
                                                                    <ul>
                                                                        <ol>
                                                                            <li>Use Minimum 8 character</li>
                                                                            <li>Use one upper case compulsary</li>
                                                                            <li>use one numerical compulsary</li>
                                                                            <li>use one special compulsary</li>
                                                                        </ol>
                                                                    </ul>
                                                                </details>
                                                            <small className="s">By clicking Sign Up, you agree to our
                                                             <label className="text-info t"> Terms, Data Policy </label> and 
                                                             <label className="text-info t"> Cookie </label>
                                                              Policy. You may receive SMS notifications from us and can opt out at any time.</small>
                                                            <div className="col-lg-12 text-center">
                                                                <button className=" mt-3 px-5 a" onClick={this.sendMessage}>Register</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )

    }

}
export default Login;
