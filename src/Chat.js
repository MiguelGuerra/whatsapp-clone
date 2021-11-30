import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./Chat.css"
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()

    //to fetch data from firebase db
    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    //for the random avatar
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        //send the messages to the firebase db
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName, //from google api user object
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{ roomName }</h3>
                    <p>Last seen at {' '}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>

                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                        <p 
                        className={`chat__message 
                        ${user.displayName === message.name && 'chat__receiver'}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                        )
                    )
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticonOutlined />
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)}
                        type="text" 
                        placeholder="Type a message ..." />
                    <button 
                        onClick={sendMessage} 
                        type="submit">Send a message</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat
