import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayResult.css';
import back from '../../../assets/arrow_left.svg';

const DisplayResult = ({ result, onBack }) => {

  const navigate = useNavigate();

  return (
    <div className="dr-container">
      <div className="dr-title">
        {/* Back Button */}
        <div className="dr-background"onClick={onBack} style={{ cursor: 'pointer' }}>
          <img src={back} width="40px" alt="Back" />
        </div>
        <h1>Plant Disease Detection</h1>
      </div>

      <div className="dr-body">
        {/* Display Uploaded Image */}
        {result.image && <img src={result.image} width="250px" height="200px" alt="Detected Plant" className="result-image" />}

        {/* Display Classification Details */}
        <div className="dr-details">
          <p><strong>Name &emsp;&emsp; : &nbsp;</strong> {result.plant_name || "Unknown"}</p>
          <p><strong>Status &emsp;&nbsp;&nbsp;&nbsp; : &nbsp;</strong> {result.status || "Unknown"}</p>
          <p><strong>Disease &emsp;&nbsp; : &nbsp;</strong> {result.disease || "Unknown"}</p>
        </div>

        <div className="progress-container">
          <svg viewBox="0 0 100 100" className="progress-svg">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="7"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="green"
              strokeWidth="7"
              fill="none"
              strokeDasharray="282"
              strokeDashoffset={282 - (282 * result.accuracy) / 100}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-text">
            {result.accuracy}%
          </div>

          <p className='accuracy'>Accuracy</p>
        </div>

      </div>

      <div className="dr-btn">
        <button onClick={() => navigate('/smart-farm-ai')}>Farm AI &nbsp; &#x2197;</button>
      </div>
    </div>
  );
};

export default DisplayResult;
