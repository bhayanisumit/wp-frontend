import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { isAdmin, logout } from '../middleware/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
    navigate('/');
  };
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 custom-navbar">
        <div className="container-fluid ">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/articles"
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Articles
                </NavLink>
              </li>
              {isAdmin() ? (
                <>
                  <li className="nav-item admin-login">
                    <NavLink
                      to="/admin"
                      className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >
                      Admin
                    </NavLink>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  >
                    Admin Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
