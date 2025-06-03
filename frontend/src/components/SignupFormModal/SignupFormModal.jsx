import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isDisabled =
    firstName.length === 0 ||
    lastName.length === 0
  email.length < 4 ||
    username.length < 4 ||
    password.length < 6 ||
    confirmPassword.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "The provided email is invalid.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password field must match the Password field";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    return dispatch(
      sessionActions.signup({
        firstName,
        lastName,
        email,
        username,
        password
      })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="login-header-container">
        <h1>Sign Up</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        {errors.firstName && <p className="login-error">{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p className="login-error">{errors.lastName}</p>}

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        {errors.email === "The provided email is invalid." && (
          <p className="login-error">{errors.email}</p>
        )}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        {errors.username === "User with that username already exists" && (
          <p className="login-error">Username must be unique.</p>
        )}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {errors.password && <p className="login-error">{errors.password}</p>}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && (
          <p className="login-error">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className={`login-button ${isDisabled ? 'disabled' : ''}`}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
