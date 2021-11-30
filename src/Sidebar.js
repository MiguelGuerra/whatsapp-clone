import React from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import { ChatOutlined, DonutLargeRounded, MoreVertOutlined, SearchOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {

        db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        });

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeRounded />
                    </IconButton>
                    <IconButton>
                        <ChatOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => {
                    return(
                        <SidebarChat key={room.id} id={room.id} roomName={room.data.name} />
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar
