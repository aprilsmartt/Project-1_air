import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotDetails from "../components/Spots/SpotDetails";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const [spotDetails, setSpotDetails] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const res = await fetch(`/api/spots/${spotId}`);
        if (!res.ok) throw new Error("Spot not found");
        const data = await res.json();
        setSpotDetails(data);
      } catch (error) {
        console.error(error);
        setSpotDetails(null);
      }
    };

    fetchSpot();
  }, [spotId]);

  if (!spotDetails) return <div>Loading...</div>;

  return <SpotDetails spotDetails={spotDetails} />;
};

export default SpotDetailsPage;
