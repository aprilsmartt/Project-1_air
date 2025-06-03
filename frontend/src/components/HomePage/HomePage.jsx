import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spots'; 
import Banner from '../Banner/Banner';
import SpotsList from '../Spots/SpotsList';

import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) return <p>Loading...</p>;
  
  const spotsArr = Object.values(spots);
  if (!spotsArr.length) return <p>No spots available.</p>;

  return (
    <>
    <Banner/>
    <div className="home-section">
      <SpotsList spots={spotsArr} />
    </div>
    </>
  );
}

export default HomePage;
