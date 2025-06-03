import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isDisabled = credential.length < 4 || password.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors?.message === "Invalid credentials") {
          setErrors({ credential: "The provided credentials were invalid" });
        } else {
          setErrors({ credential: "An error occurred. Please try again." });
        }
      });
  };

  const handleDemoLogin = async () => {
    const res = await dispatch(
      sessionActions.login({
        credential: "Demo-lition",
        password: "password",
      })
    );
    if (!res?.errors) closeModal();
  };

  return (
    <>
  <div className="login-header-container">
    <h1>Log In</h1>
    {errors.credential && (
      <p className="login-error">{errors.credential}</p>
    )}
  </div>

      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />

        </label>
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

        <button
          type="submit"
          disabled={isDisabled}
          className={`login-button ${isDisabled ? 'disabled' : ''}`}
        >
          Log In
        </button>
      </form>

      <p className="demo-link" onClick={handleDemoLogin}>
        Demo User
      </p>
    </>
  );
}

export default LoginFormModal;
