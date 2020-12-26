import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'

const Message = ({ timestamp, user, message }) => {
// const Message = ({ message }) => {

    // console.log(message)
    var timenow = new Date(timestamp).toLocaleTimeString("en-US")
    var datenow = new Date(timestamp).toLocaleDateString("en-US")
    return (
        <div className='message' >
            <Avatar src={user.photo} />
            <div className="message__info">
                <h4>{user.displayName}
                  <span className="message_timestamp">{timenow},{datenow}</span>
                </h4>

                <p>{message}</p>
        </div>
        </div >
    )
}

export default Message
