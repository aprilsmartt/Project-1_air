import './Banner.css';

const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner-intro-box'>
        <h1>Best Home Away From Home</h1>
        <h4>The vacation you never knew you needed...</h4>
        <button className='intro-box-button'>Explore Spots</button>
      </div>

      <div className='banner-image'>
        <img
          src='https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg'
          alt='Cozy bedroom interior'
        />
      </div>
    </div>
  );
};

export default Banner;
