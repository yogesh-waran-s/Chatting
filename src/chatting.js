import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactScrollableFeed from 'react-scrollable-feed'
import axios from "axios";
import { Link } from "react-router-dom";

import Picker from 'emoji-picker-react';
//import EmojiPicker from "emoji-picker-react";
function Chatting() {
    const [data, pickdata] = useState([]);
    const getItem = () => {
        var url = "http://localhost:1234/user";
        axios.get(url)
            .then(response => pickdata(response.data));
    }
    const [msg, pickmsg] = useState("");
    const save = () => {

        if (msg != "") {
            var url = "http://localhost:1234/msg";
            var data = {
                sender: localStorage.getItem("usernumber"),
                reciver: numb,
                msg: msg,
                time: dispalaydate
            }
            axios.post(url, data)
                .then(response => (
                    getItem1(),
                    pickmsg("")
                ))
        }

    }

    const [data1, pickdata1] = useState([]);
    const getItem1 = () => {
        var url = "http://localhost:1234/msg";
        axios.get(url)
            .then(response => pickdata1(response.data));
    }
    useEffect(() => {
        getItem()
        getItem1()
    }, [true])
    const { numb } = useParams();
    // const[inputStr,setInputStr]=useState('')
    // const[emoji,pickemoji]=useState(false);
    // const Emojiclick=(event,emojiObject)=>{
    //     setInputStr(prevInput => prevInput+emojiObject.emoji);
    //     pickemoji(false);
    // }
    const close = () => {
        window.location.href = "http://localhost:3000/#/chat";
    }
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        pickmsg(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    }
    console.log(localStorage.getItem("userfname"));
    const [data2, pickdata2] = useState([]);
    const getData = () => {
        var url = "http://localhost:1234/gender";
        axios.get(url)
            .then(response => pickdata2(response.data));
    }
    useEffect(() => {

        getData()

    }, [true])
    var showDate = new Date();
    var hour = showDate.getHours();
    var zone = "";
    if (0 < hour < 12) {
        zone = "am"
    }
    else {
        zone = "pm"
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    else {
        hour = hour
    }

    var dispalaydate = hour + "." + showDate.getMinutes() + " " + zone;

    console.log(dispalaydate);
    return (
        <div className="container ">
            <div className="row">


                <div className="col-lg-12 m-1 p-1 scroll">
                    <div className="">
                        {
                            data.map((info, pos) => {
                                if (numb == info.number && info.gender == "Male") {
                                    return (
                                        data2.map((info1, pos1) => {
                                            return (
                                                <div className="head" key={pos}>
                                                    <div>
                                                        <img src={info1.male} width="40px" height="40px" className="pro" />
                                                        <label className="text-success name "><Link to={`/chat/detail/${info.number}`} className="chater"> {info.fname}</Link></label>
                                                    </div>
                                                    <label className="text-end">
                                                        <i className="fa fa-window-close icon text-danger text-end" onClick={close}></i>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                else if (numb == info.number && info.gender == "Female") {
                                    return (
                                        data2.map((info1, pos1) => {
                                            return (
                                                <div className="head" key={pos}>
                                                    <div>
                                                        <img src={info1.female} width="40px" height="40px" className="pro" />
                                                        <label className="text-success name "><Link to={`/chat/detail/${info.number}`} className="chater">{info.fname}</Link></label>
                                                    </div>
                                                    <label className="text-end">
                                                        <i className="fa fa-window-close icon text-danger text-end" onClick={close}></i>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                else if (numb == info.number && info.gender == "He:'Wish him a happy birthday'") {
                                    return (
                                        data2.map((info1, pos1) => {
                                            return (
                                                <div className="head" key={pos}>
                                                <div>
                                                    <img src={info1.He} width="40px" height="40px" className="pro" />
                                                    <label className="text-success name"><Link to={`/chat/detail/${info.number}`} className="chater">{info.fname}</Link></label>
                                                </div>
                                                <label className="text-end">
                                                    <i className="fa fa-window-close icon text-danger text-end" onClick={close}></i>
                                                </label>
                                            </div>
                                            )
                                        })
                                    )
                                }
                                else if (numb == info.number && info.gender == "She:'Wish her a happy birthday'") {
                                    return (
                                        data2.map((info1, pos1) => {
                                            return (
                                                <div className="head" key={pos}>
                                                <div>
                                                    <img src={info1.She} width="40px" height="40px" className="pro" />
                                                    <label className="text-success name"><Link to={`/chat/detail/${info.number}`} className="chater">{info.fname}</Link></label>
                                                </div>
                                                <label className="text-end">
                                                    <i className="fa fa-window-close icon text-danger text-end" onClick={close}></i>
                                                </label>
                                            </div>
                                            )
                                        })
                                    )
                                }
                                else if (numb == info.number && info.gender == "They:'Wish they a happy birthday'") {
                                    return (
                                        data2.map((info1, pos1) => {
                                            return (
                                                <div className="head" key={pos}>
                                                    <div>
                                                        <img src={info1.They} width="40px" height="40px" className="pro" />
                                                        <label className="text-success name"><Link to={`/chat/detail/${info.number}`} className="chater">{info.fname}</Link></label>
                                                    </div>
                                                    <label className="text-end">
                                                        <i className="fa fa-window-close icon text-danger text-end" onClick={close}></i>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            })
                        }

                    </div>
                    <div className="ms">
                        <ReactScrollableFeed>
                            {
                                data1.map((info, pos) => {
                                    if (info.sender == localStorage.getItem("usernumber") && info.reciver == numb) {

                                        return (

                                            <div className="col-lg-12" key={pos}>
                                                <div className=" text-start chat"><label className="bg-primary text-white m-1 p-1">{info.msg} <label className="smal">{info.time}</label></label></div>
                                            </div>
                                        )
                                    }
                                    else if (info.reciver == localStorage.getItem("usernumber") && info.sender == numb) {
                                        return (
                                            <div className="col-lg-12" key={pos}>
                                                <p className=" text-end "><label className="bg-dark text-white m-1 p-1">{info.msg}  <label className="smal">{info.time}</label></label></p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </ReactScrollableFeed>
                    </div>
                    <div className="ty">
                        {
                            data.map((info, pos) => {
                                if (numb == info.number) {
                                    return (
                                        <form key={pos} className="input-group mt-3" >

                                            <input type="text" className="form-control text-primary " placeholder="Type Here" value={msg} onChange={obj => pickmsg(obj.target.value)} autoFocus />
                                            <label className="input-style"></label>
                                            <i className="fa fa-paper-plane input-group-text" onClick={save.bind(this, info.number)}></i>

                                            <div className=" emo">
                                                <img
                                                    className="emoji-icon"
                                                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                                    onClick={() => setShowPicker(val => !val)} />
                                                {showPicker && <Picker
                                                    pickerStyle={{ width: '100%' }} className="im"
                                                    onEmojiClick={onEmojiClick} />}

                                            </div>
                                        </form>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatting;