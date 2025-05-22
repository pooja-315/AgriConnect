import React, { useState, useContext, useEffect } from 'react';
import './Fertilizers.css'; // Reuse same styling
import { CartContext } from "../../Context/CartContext"; 
import axios from 'axios';
import Loading from '../Loading/Loading';

const FertilizerRecommendations = () => {
  const { cart, handleToggleCart } = useContext(CartContext);
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fertilizers');

        setFertilizers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching fertilizers:', err);
        setLoading(false);
      }
    };

    fetchFertilizers();
  }, []);

  if (loading) {
    return <div className='buyseeds loading'>
      <Loading />
    </div>;
  }

  return (
    <div className='buyseeds'>
      {fertilizers.map((fertilizer) => (
        <div key={fertilizer._id.toString()} className="card">
          <img src={fertilizer.pic} alt={fertilizer.name} />
          <div className="seed-desc">
            <h3>{fertilizer.name}</h3>
            <p>Price: ₹{fertilizer.amt}</p>
            <button 
              onClick={() => handleToggleCart(fertilizer)}
              className={cart.some(item => item.id === fertilizer.id) ? 'remove-btn' : ''}
            >
              {cart.some(item => item.id === fertilizer.id) ? 'Remove' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FertilizerRecommendations;
