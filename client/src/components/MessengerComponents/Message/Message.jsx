import "./Message.scss";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Message({ message, own, image }) {
    console.log(message)

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-Top">
                <div className="message-wrapper">
                    <img
                        className="message__Img"
                        src= {image}
                        alt=""
                    />
                </div>
                <p className="message__Text">{message.text}</p>
            </div>
            <div className="message__Bottom">{message.createdAt}</div>
        </div>
    );
}