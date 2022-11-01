import React from 'react'
import Slidebar from "../components/Slidebar"
import Chat from "../components/Chat"

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Slidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home