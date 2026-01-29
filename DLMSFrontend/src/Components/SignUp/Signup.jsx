import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"
// You would likely have a CSS file for styling
// import './Signup.css'; 

function Signup() {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for feedback and loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic client-side validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    const signupData = {
      userName: name,
      password: password,
      email: email
    };

    // --- Backend API Call ---
    try {
      const response = await fetch("http://localhost:8080/api/auth/newUser", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (!response.ok) {
        // This handles 4xx or 5xx responses from the server
        throw new Error(data.message || 'Signup failed.');
      }

      // Success!
      console.log("Signup successful!", data);

      // Optional: Store token or user data here
      // localStorage.setItem('token', data.token); 

      // Navigate to the dashboard or login page
      navigate('/login');

    } catch (err) {
      console.error(err);
      setError(err.message || 'An unknown error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-wrapper" style={{ position: 'relative' }}>
      <div className="signup-container">
        <h2>Create Account</h2>

        <form onSubmit={handleSignupSubmit} autoComplete="off">

          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required placeholder='Your Name..'
              autoComplete="off"
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required placeholder='abc@gmail.com'
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required placeholder='Password..'
              autoComplete="new-password"
            />
          </div>

          {/* Error Feedback */}
          {error && <p className="error-message">{error}</p>}

          {/* Submission Button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;