import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Fertilizers from '../../Components/Fertilizers/Fertilizers'

const FertilizersPage = () => {
  return (
    <div>
        <div className="navbar">
            <Navbar />
        </div>
        <div className="hero-section">
            <Sidebar />
            <Fertilizers />
        </div>
    </div>
  )
}

export default FertilizersPage