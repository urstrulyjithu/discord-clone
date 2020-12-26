import React , {useState , useEffect} from "react"
import "./Chat.css"
import ChatHeader from "./ChatHeader"
import Message from "./Message"
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcons from "@material-ui/icons/EmojiEmotions";
import {useSelector} from "react-redux"
import {selectChannelId , selectChannelName} from "./features/counter/appSlice"
import {selectUser} from "./features/counter/userSlice"
import db from "./firebase";
import firebase from "./firebase"
import { useFirestore } from 'react-redux-firebase'


function Chat()  {


  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName)

  const [input , setInput] = useState("")
  const [messages , setMessages] = useState([]);
  const firestore = useFirestore()
  const fieldValue = useFirestore.FieldValue;
  var time = new Date().getTime();
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  var a = new Date(time).toLocaleDateString("en-US");
  var b = new Date(time).toLocaleTimeString("en-US");
  console.log(time);
  console.log(a , b);
  useEffect(()=>{
    if(channelId) {
      db.collection("channels").
      doc(channelId).
      collection("messages").
      orderBy("timestamp" , "desc").
      onSnapshot((snapshot)=> setMessages(snapshot.docs.map((doc)=> doc.data())));
    }
},[channelId]);

const sendMessage = (e) => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp :new Date().getTime()
        })

        setInput('')
    }
  return(
    <div className="chat">
      <ChatHeader channelName={channelName}/>
      <div className="chat__messages">
        {messages.map((message)=>(
         <Message message={message.message} timestamp={message.timestamp} user={message.user} />
        ))}


      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
        <input value={input} disabled={!channelId} onChange={(e)=> setInput(e.target.value)} placeholder={`Message #${channelName}`} />
        <button onClick={sendMessage} disabled={!channelId} className="chat__inputButton"type="submiit">Send Message</button>
        </form>
        <div className="chat__inputIcons">
        <CardGiftcardIcon />
        <GifIcon fontSize="large" />
        <EmojiEmotionsIcons fontSize="large" />
        </div>
      </div>
    </div>

  )
}
export default Chat
