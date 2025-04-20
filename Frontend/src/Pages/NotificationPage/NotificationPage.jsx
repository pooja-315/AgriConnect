import React, { useState } from 'react'
import './NotificationPage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Notification from '../../Components/Notification/Notification'
import Sidebar from "../../Components/Sidebar/Sidebar"

const NotificationPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
        <div className="navbar">
            <Navbar toggleMenu={toggleMenu}/>
        </div>
        <div className="hero-section">
            {isOpen && (<Sidebar />)}
            <Notification />
        </div>
    </div>
  )
}

export default NotificationPage