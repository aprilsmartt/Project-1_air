import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Navigation from '../src/components/Navigation/Navigation';
// import Banner from '../src/components/Banner/Banner';
import HomePage from '../src/components/HomePage/HomePage';
import Footer from '../src/components/Footer/Footer';
import SpotsListPage from './components/Spots/SpotsListPage';
// import SpotsList from './components/Spots/SpotsList';
// import SpotCard from '../src/components/Spots/SpotCard'
import SpotDetails from './components/Spots/SpotDetails';
import CreateSpotFormModal from './components/CreateSpotFormModal/CreateSpotFormModal';
// import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import * as sessionActions from '../src/store/session';

// Layout controls the page frame: header, footer, and routed content via <Outlet />
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Restore user session and preload spot data
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);


  if (!isLoaded) return null;

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <HomePage /> */}
      {/* <Banner /> */}
      {/* <SpotsList /> */}
      {isLoaded && <Outlet />}

      <Footer />

    </>
  );
}

// Router setup with layout and child routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      // {
      //   path: '/spots',
      //   element: <SpotCard />
      // },
      {
        path: '/spots',
        element: <SpotsListPage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },

      {
        path: '/spots/new',
        element: <CreateSpotFormModal />
      },


    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App; 