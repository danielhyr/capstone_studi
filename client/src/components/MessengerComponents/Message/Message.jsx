import "./Message.scss";
import { format } from "timeago.js";

export default function Message({message, own}) {
    console.log(message)
  return (
<div className={own ? "message own" : "message"}>
          <div className="message-Top">
        <img
          className="message__Img"
          src=""
          alt=""
        />
        <p className="message__Text">{message.text}</p>
      </div>
      <div className="message__Bottom">{message.createdAt}</div>
    </div>
  );
}