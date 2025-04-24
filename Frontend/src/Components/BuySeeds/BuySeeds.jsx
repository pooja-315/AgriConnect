import React, { useState, useContext, useEffect } from 'react';
import './BuySeeds.css';
import { CartContext } from "../../Context/CartContext"; 
import axios from 'axios';  // Import axios for API calls
import Loading from '../Loading/Loading';

const BuySeeds = () => {
  const { cart, handleToggleCart } = useContext(CartContext);
  const [seeds, setSeeds] = useState([]);  // State to store fetched seeds
  const [loading, setLoading] = useState(true);  // State for loading

  useEffect(() => {
    // Fetch seed data from the backend
    const fetchSeeds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/seeds');
        setSeeds(response.data);  // Set the fetched data to state
        setLoading(false);  // Set loading to false after fetching
      } catch (err) {
        console.error('Error fetching seeds:', err);
        setLoading(false);  // Set loading to false in case of error
      }
    };

    fetchSeeds();  // Fetch seed data when component mounts
  }, []);

  // If data is still loading, show a loading message
  if (loading) {
    return <div className='buyseeds loading'>
      <Loading />
    </div>;
  }

  return (
    <div className='buyseeds'>
      {seeds.map((seed) => (  // Use seeds instead of data
        <div key={seed._id.toString()} className="card">  {/* Use _id as the key */}
          <img src={seed.pic} alt={seed.name} />  {/* Display the image fetched from the backend */}
          <div className="seed-desc">
            <h3>{seed.name}</h3>
            <p>Price: ₹{seed.amt}</p>  {/* Display the price fetched from the backend */}
            <button 
              onClick={() => handleToggleCart(seed)}  // Pass full seed object to toggle cart
              className={cart.some(item => item.id === seed.id) ? 'remove-btn' : ''}
            >
              {cart.some(item => item.id === seed.id) ? 'Remove' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuySeeds;
