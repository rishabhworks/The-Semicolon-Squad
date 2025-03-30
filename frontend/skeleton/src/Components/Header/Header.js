const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("userAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">🦴 Skeleton</Link>
      </div>
      <nav className="nav-links">
        {!isAuthenticated ? (
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              <i className="fas fa-user-circle"></i>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/signin" className="dropdown-item">Sign Up</Link>
              </div>
            )}
          </div>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </nav>
    </header>
  );
};
