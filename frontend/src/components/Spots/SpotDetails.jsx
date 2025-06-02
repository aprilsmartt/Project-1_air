import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotDetailsThunk } from "../../store/spots";
import './SpotDetails.css'; // optional, if you have CSS for this

const SpotDetails = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots?.allSpots);

  useEffect(() => {
    dispatch(getSpotDetailsThunk());
  }, [dispatch]);

  if (!spots || Object.keys(spots).length === 0) return <div>No spots found.</div>;

  const spot = Object.values(spots)[0]; // TEMP: Use first spot (replace with ID later)

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

  // Fill up to 5 total images with placeholders
  while (fullImages.length < 5) {
    fullImages.push({
      id: `placeholder-${fullImages.length}`,
      url: placeholder,
      isPlaceholder: true
    });
  }

    return (
    <>
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
              />
            </div>

            <div className="right-small-images">
              {fullImages.slice(1, 5).map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.isPlaceholder ? `Placeholder ${index + 1}` : `Spot image ${index + 2}`}
                />
              ))}
            </div>
          </div>

          {/* HOST INFO SECTION */}
          <div className="host-info-section">
            <h2>
              Hosted by {owner?.firstName} {owner?.lastName}
            </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem repellat saepe quas, quae eaque non nostrum consequatur iure quisquam fugiat nisi a optio maxime vitae hic neque doloribus? Aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem repellat saepe quas, quae eaque non nostrum consequatur iure quisquam fugiat nisi a optio maxime vitae hic neque doloribus? Aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores possimus aspernatur odio fuga, quibusdam sapiente veniam voluptas consequuntur deleniti excepturi ut, aut ab molestias exercitationem sequi provident atque nulla iure.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non aliquam accusantium odio quisquam veniam, beatae voluptate, aut libero modi dignissimos sapiente magni amet nemo quod, dolores voluptatibus illum vero unde? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor id ab, natus obcaecati at ex veniam nemo repellat dolorem rerum asperiores expedita illo delectus alias, quisquam sapiente magni quibusdam laborum.</p>
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat numquam molestias.</p>

                        <h3>Firstname</h3>
            <p>Month 20##</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat numquam molestias.</p>

            <h3>Firstname</h3>
            <p>Month 20##</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat numquam molestias.</p>
          </div>            
        </div>
      </div>
    </>
  );
};

export default SpotDetails;