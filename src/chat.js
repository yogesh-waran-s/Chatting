import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, HashRouter } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import Chatting from "./chatting";
import ReactScrollableFeed from 'react-scrollable-feed'
import MyData from './mydata';
import Profile from "./profile";
function Chat() {
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
    const { numb } = useParams();


    useEffect(() => {
        getItem()
        getData()

    }, [true])

    return (
        <div className="container chat">
            <div className="row">
                <div className="col-lg-3">
                    {
                        data.map((info, pos) => {
                            if (localStorage.getItem("usernumber") != info.number)
                                return (
                                    data1.map((info1, pos) => {
                                        if (info.gender == "Female") {
                                            return (

                                                <ReactScrollableFeed>
                                                    <div className="border p-1 lii" key={pos}>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                                <img src={info1.female} width="30px" height="30px" className="pro" />
                                                                {info.fname}
                                                            </div>
                                                        </Link>
                                                        
                                                    </div>
                                                </ReactScrollableFeed>
                                            )
                                        }
                                        else if (info.gender == "Male") {
                                            return (

                                                <ReactScrollableFeed>
                                                    <div className="border p-1 lii" key={pos}>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                                <img src={info1.male} width="30px" height="30px" className="pro" />
                                                                {info.fname}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </ReactScrollableFeed>
                                            )
                                        } else if (info.gender == "He:'Wish him a happy birthday'") {
                                            return (

                                                <ReactScrollableFeed>
                                                    <div className="border p-1 lii" key={pos}>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                                <img src={info1.He} width="30px" height="30px" className="pro" />
                                                                {info.fname}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </ReactScrollableFeed>
                                            )
                                        } else if (info.gender == "She:'Wish her a happy birthday'") {
                                            return (

                                                <ReactScrollableFeed>
                                                    <div className="border p-1  lii" key={pos}>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                                <img src={info1.She} width="30px" height="30px" className="pro" />
                                                                {info.fname}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </ReactScrollableFeed>
                                            )
                                        } else if (info.gender == "They:'Wish they a happy birthday'") {
                                            return (

                                                <ReactScrollableFeed>
                                                    <div className="border p-1 lii" key={pos}>
                                                        <Link to={`/chat/${info.number}`} className="li">

                                                            <div  >
                                                                <img src={info1.They} width="30px" height="30px" className="pro" />
                                                                {info.fname}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </ReactScrollableFeed>
                                            )
                                        }
                                    })


                                )


                        })
                    }
                </div>


                <div className="col-lg-8">
                    <Switch>
                        <Route exact path="/chat/:numb" component={Chatting} />
                        <Route  path="/chat/detail/:profile" component={Profile}/>
                    </Switch>
                </div>
               

            </div>
        </div>
    )
}
export default Chat;