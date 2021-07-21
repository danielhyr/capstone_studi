import "./Message.scss";
import { format } from "timeago.js";


export default function Message({ message, own, image }) {

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
            <div className="message__Bottom">{format(message.createdAt)}</div>
        </div>
    );
}