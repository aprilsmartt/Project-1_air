import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getSpotDetailsThunk } from "../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots?.singleSpot);

  useEffect(() => {
    if (spotId) dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) return <div>No spots found.</div>;

  const {
    spotImages = [],
    owner,
    name,
    city,
    state,
    country,
    price,
    avgRating
  } = spot;

  const handleClick = () => {
    alert("Feature Coming Soon...");
  };

  const placeholder = "https://via.placeholder.com/300x200?text=Image+Coming+Soon";
  const fullImages = [...spotImages];

  while (fullImages.length < 5) {
    fullImages.push({
      id: `placeholder-${fullImages.length}`,
      url: placeholder,
      isPlaceholder: true
    });
  }

  return (
    <div className="details-page-wrapper">
      <div className="spot-details-container">
        <h1 className="detail-page-spot-title">{name}</h1>
        <h2 className="spot-card-location">
          {city}, {state}, {country}
        </h2>

        {/* IMAGES SECTION */}
        <div className="detail-page-images-container">
          <div className="left-large-image">
            <img
              src={fullImages[0].url}
              alt={fullImages[0].isPlaceholder ? "Placeholder" : "Main Spot"}
              className={fullImages[0].isPlaceholder ? "placeholder-img" : ""}
            />
          </div>

          <div className="right-small-images">
            {fullImages.slice(1, 5).map((image, index) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt={image.isPlaceholder ? `Placeholder ${index + 1}` : `Spot image ${index + 2}`}
                  className={image.isPlaceholder ? "placeholder-img" : ""}
                />
              </div>
            ))}
          </div>
        </div>

        {/* HOST INFO SECTION */}
        <div className="host-info-section">
          <h2>
            Hosted by {owner?.firstName} {owner?.lastName}
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        </div>
        <hr />

        {/* RESERVE INFO SECTION */}
        <div className="reserve-info-section">
          <h3 className="spot-card-price">
            ${price} <span className="price-unit">night</span>
          </h3>
          <span className="spot-card-star-rating">
            <FaStar /> {avgRating || "New"}
          </span>
          <button onClick={handleClick}>Reserve</button>
        </div>

        {/* REVIEWS SECTION (Placeholder) */}
        <h2>★ reviews</h2>
        <div className="review">
          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>

          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>

          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
