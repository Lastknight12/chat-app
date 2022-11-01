import React from 'react'
import adduser from "../img/add-user.png"
import call from "../img/free-icon-video-call-3747177.png"
import threedots from "../img/more.png"
import Messeges from './Messeges'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'

const Chat = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className='chat'>
        <div className="chatInfo">
          <span>{data.user.displayName}</span>
          <div className="chatIcons">
            <img src={call} alt="" />
            <img src={adduser} alt="" />
            <img src={threedots} alt="" />
          </div>
        </div>
      <Messeges />
      <Input />
    </div>
  )
}

export default Chat