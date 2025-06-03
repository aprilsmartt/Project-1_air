// SpotsList.jsx
import SpotCard from './SpotCard';
import './Spots.css';

const SpotsList = ({ spots }) => {
  if (!Array.isArray(spots)) return null;
  // console.log({avgRating})
  return (
    <div className="cards-container">
      {spots.map((spot) => (
        <SpotCard
          key={spot.id}
          id={spot.id}
          src={spot.previewImage}
          title={spot.name}
          city={spot.city}
          state={spot.state}
          description={spot.description}
          price={`$${spot.price}`}
          avgRating={spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}
        />
      ))}
    </div>
  );
};

export default SpotsList;
