import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Spots.css';

const SpotCard = ({ id, src, title, city, state, description, price, avgRating }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    navigate(`/spots/${id}`);
  };

  return (
    // <div className='cards-container'>
    <div
      className='spot-card'
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ cursor: 'pointer', position: 'relative' }} // for tooltip positioning
    >
      <div className="image-wrapper">
        <img src={src} alt={title} className="spot-card-image" />
        {showTooltip && (
          <div className="tooltip">
            {title}
            {/* Click to view spot details */}
          </div>
        )}
      </div>

      <div className='spot-card-info-box'>
        <div className='spot-card-city-state-rating'>
          {/* <h2 className='spot-card-title'>{title}</h2> */}
          <h2 className='spot-card-location'>{city}, {state}</h2>
          <span className='spot-card-star-rating'>
            <i className="fa-solid fa-star" /> {avgRating}
          </span>
        </div>
        {/* <h3 className='spot-card-location'>{city}, {state}</h3> */}
        <h4 className='spot-card-description'>{description}</h4>
        {/* <h3 className='spot-card-price'>{price}</h3> */}
        <h3 className='spot-card-price'>
          {price} <span className="price-unit">night</span>
        </h3>

      </div>
    </div>
    // </div>
  );
};

export default SpotCard;

