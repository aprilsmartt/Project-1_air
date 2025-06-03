import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotsList from './SpotsList';  // Your list component
import { getAllSpotsThunk } from '../../store/spots';

const SpotsListPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots?.allSpots);
  const isLoading = useSelector((state) => state.spots?.isLoading);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (!spots || Object.keys(spots).length === 0) return <div>No spots found.</div>;

  return <SpotsList spots={spots} />;
};

export default SpotsListPage;
