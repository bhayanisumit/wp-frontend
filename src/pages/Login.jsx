import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../middleware/authService';
const apiUrl = process.env.REACT_APP_API_URL;

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <section className="admin-login-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4 col-12">
              <form className="p-4 login-form">
                <h3 className="text-center mb-4 fw-bold">Admin Login</h3>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="fw-semibold pb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter email"
                  />

                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="fw-semibold pb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="d-block mx-auto login-btn" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



    </>
  );
}
