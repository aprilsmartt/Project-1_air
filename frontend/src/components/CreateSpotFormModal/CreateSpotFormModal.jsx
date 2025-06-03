import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { createSpotThunk } from '../../store/spots';

function CreateSpotFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const lat = 0;
  const lng = 0;

  useEffect(() => {
    const errors = {};
    if (hasSubmitted) {
      if (!country) errors.country = 'Country is required';
      if (!address) errors.address = 'Address is required';
      if (!city) errors.city = 'City is required';
      if (!state) errors.state = 'State is required';
      if (!description || description.length < 30)
        errors.description = 'Description needs a minimum of 30 characters';
      if (!name) errors.name = 'Name is required';
      if (!price) errors.price = 'Price is required';
      if (!previewImage) errors.previewImage = 'Preview image is required';
      if (!imageUrl1 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl1))
        errors.imageUrl1 = 'Image URL must end in .png, .jpg, or .jpeg';
      if (!imageUrl2 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl2))
        errors.imageUrl2 = 'Image URL must end in .png, .jpg, or .jpeg';
      if (!imageUrl3 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl3))
        errors.imageUrl3 = 'Image URL must end in .png, .jpg, or .jpeg';
      if (!imageUrl4 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl4))
        errors.imageUrl4 = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    setFormErrors(errors);
  }, [hasSubmitted, country, address, city, state, description, name, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(formErrors).length) return;

    const newSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      lat,
      lng
    };

    try {
      const spot = await dispatch(createSpotThunk(newSpot));
      navigate(`/spots/${spot.id}`);
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setFormErrors(data.errors);
    }
  };


  return (
    <>
      <h1>Create a new Spot</h1>
      <h3>Where&#39;s your place located?</h3>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder='Country'
          />
        </label>
        {formErrors.country && <p>{formErrors.country}</p>}

        <label>
          Street Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder='Address'
          />
        </label>
        {formErrors.address && <p>{formErrors.address}</p>}

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder='City'
          />
        </label>
        {formErrors.city && <p>{formErrors.city}</p>}

        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder='STATE'
          />
        </label>
        {formErrors.state && <p>{formErrors.state}</p>}

        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
        </p>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder='Description'
          />
        </label>
        {formErrors.description && <p>{formErrors.description}</p>}

        <h3>Create a title for your spot</h3>
        <p>Catch guests&#39; attention with a spot title that highlights what makes your place special.</p>
        <label>
          Title
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Name of your spot'
          />
        </label>
        {formErrors.name && <p>{formErrors.name}</p>}
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <label>
          Price per night (USD)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder='Price per night (USD)'
          />
        </label>
        {formErrors.price && <p>{formErrors.price}</p>}

        <label>
          Preview Image URL
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
            placeholder='Image URL'
          />
        </label>
        {formErrors.previewImage && <p>{formErrors.previewImage}</p>}

        <label>
          Image URL #1
          <input
            type="text"
            value={imageUrl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            required
            placeholder='Image URL'

          />
        </label>
        {formErrors.imageUrl1 && <p>{formErrors.imageUrl1}</p>}

        <label>
          Image URL #2
          <input
            type="text"
            value={imageUrl2}
            onChange={(e) => setImageUrl2(e.target.value)}
            required
            placeholder='Image URL'

          />
        </label>
        {formErrors.imageUrl2 && <p>{formErrors.imageUrl2}</p>}

        <label>
          Image URL #3
          <input
            type="text"
            value={imageUrl3}
            onChange={(e) => setImageUrl3(e.target.value)}
            required
            placeholder='Image URL'

          />
        </label>
        {formErrors.imageUrl3 && <p>{formErrors.imageUrl3}</p>}

        <label>
          Image URL #4
          <input
            type="text"
            value={imageUrl4}
            onChange={(e) => setImageUrl4(e.target.value)}
            required
            placeholder='Image URL'

          />
        </label>
        {formErrors.imageUrl4 && <p>{formErrors.imageUrl4}</p>}

        <button type="submit">Create Spot</button>
      </form>
    </>
  );
}

export default CreateSpotFormModal;
