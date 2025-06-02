import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import '/src/index.css';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {/* <h1>Hello World (Navigation Component)</h1> */}

      <nav className="navbar">

        <div className="nav-logo">
          <NavLink to="/">
            <img
              // src="/images/asa-logo.png"
              src='/images/asa-logo.png'
              className="logo nav-items"
              alt="ASA Retreat Logo"
            />
          </NavLink>
        </div>

        <div className="nav-buttons">
          {sessionUser && (
            <NavLink to="/spots/new">
              <button className="spot-button">Create a New Spot</button>
            </NavLink>
          )}
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </nav>

    </>
  );
}


export default Navigation;









/*
// info belong with nav section
  <div className='nav-buttons'>

      {sessionUser &&(

        <NavLink to="/spots/new"><button className='spot-button'>Create a New Spot</button></NavLink>

      )}

      {isLoaded && (
        <ProfileButton  user={sessionUser} />
      )}
  </div>


import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <ProfileButton />


      <nav className='navbar'>
        <ul>
          <li className="nav-items">
            <NavLink to="/" >
              Home
              <img src="images/asa-logo.png" className="logo nav-items" alt="ASA Retreat Logo" />

            </NavLink>
          </li>
          
          {isLoaded && (
            <li className="nav-items">
              <ProfileButton user={sessionUser} className="nav-profile-button" />
            </li>
          )}
        </ul>
      </nav>
    </>

  );
}

export default Navigation;
*/