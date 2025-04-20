import React, { useState } from 'react'
import './CartPage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Cart from '../../Components/Cart/Cart'
import Sidebar from "../../Components/Sidebar/Sidebar"

const CartPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
        <div className="navbar">
            <Navbar toggleMenu={toggleMenu}/>
        </div>
        <div className="cart-sidebar">
            {isOpen && (<Sidebar />)}
        </div>
        <div className={`Cart-section ${isOpen ? 'with-sidebar' : ''}`}>  
            <Cart />
        </div>
    </div>
  )
}

export default CartPage