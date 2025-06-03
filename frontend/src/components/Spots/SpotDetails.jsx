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
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.spotReviews);

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

  const placeholder = "https://via.placeholder.com/300x200?text=Image+Coming+Soon";
  const fullImages = [...spotImages];

  while (fullImages.length < 5) {
    fullImages.push({
      id: `placeholder-${fullImages.length}`,
      url: placeholder,
      isPlaceholder: true
    });
  }

  // On-Click Handlers
  const handleReserveClick = () => {
    alert("Feature Coming Soon...");
  };

  const handleReviewClick = () => {
    alert("Ability to Post Coming Soon...");
  };

  const hasPostedReview = user && reviews && Object.values(reviews).some(
    review => review.userId === user.id
  );

  const isOwner = user && spot && user.id === spot.ownerId;

  const showPostReviewButton = user && !hasPostedReview && !isOwner;

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
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid totam dolorum vel porro perspiciatis. Nostrum, sint porro perspiciatis minus ad, veniam laborum, minima fugiat dolor ipsam asperiores autem nesciunt temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore corrupti eveniet eius quasi non voluptatibus ipsum dignissimos velit numquam dicta libero mollitia rerum vero, id labore? Vel vitae repellendus veniam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam ducimus iure amet laborum, labore quis deleniti at natus. Aliquam vel esse quos sequi quod voluptates recusandae dicta rem nostrum aliquid?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam et aut. Voluptate illo quidem quia error qui labore. Ut aperiam possimus, ab debitis cupiditate beatae blanditiis exercitationem sit consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quod dolorum facilis soluta, ipsam esse facere odio, accusantium harum totam similique. Possimus laudantium beatae dolorem sequi est necessitatibus quia quo.</p>
        </div>

        <hr className="hr-line-separator" />

        {/* RESERVE INFO SECTION */}
        <div className="reserve-info-section">
          <h3 className="spot-card-price">
            ${price} <span className="price-unit">night</span>
          </h3>
          <span className="spot-card-star-rating">
            <FaStar /> {avgRating || "New"}
          </span>
          <button onClick={handleReserveClick}>Reserve</button>
        </div>

        {/* REVIEWS SECTION */}
        <h2>★ reviews</h2>
        <div className="review">
          {showPostReviewButton && (
            <button onClick={handleReviewClick} className="post-review-button">
              Post Your Review
            </button>
          )}

          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam praesentium possimus pariatur minima consequuntur? Maiores, consectetur dolorem? Id eum hic repudiandae laudantium molestias beatae, cum quidem commodi dignissimos sapiente numquam.</p>

          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam praesentium possimus pariatur minima consequuntur? Maiores, consectetur dolorem? Id eum hic repudiandae laudantium molestias beatae, cum quidem commodi dignissimos sapiente numquam.</p>

          <h3>Firstname</h3>
          <p>Month 20##</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam praesentium possimus pariatur minima consequuntur? Maiores, consectetur dolorem? Id eum hic repudiandae laudantium molestias beatae, cum quidem commodi dignissimos sapiente numquam.</p>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
