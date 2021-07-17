import React from 'react'
import './Online.scss'

function Online() {
    return (
        <div className="online">
        {/* {onlineFriends.map((o) => ( */}

          <div className="online-Friend" >
            <div className="online-ImgContainer">
              <img
                className="online-Img"
                src=""
                alt=""
              />
              <div className="online-Badge"></div>
            </div>
            <span className="online-Name">username</span>
          </div>
         {/* ))} */}

      </div>
    )
}

export default Online
