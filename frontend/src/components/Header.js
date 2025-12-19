import { Link, useNavigate } from "react-router-dom";
function Header({ setIsLoggedIn, userRole, setUserRole }) {
  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "15px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
      textAlign: "center"
    },
    link: {
      margin: "0 15px",
      textDecoration: "none",
      color: "#333",
      fontWeight: "500",
      padding: "5px 0",
      position: "relative"
    },
    button: {
      marginLeft: "15px",
      padding: "5px 15px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {userRole === "admin" && (
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
      )}
      {userRole === "user" && (
        <Link to="/home" style={styles.link}>
          Home
        </Link>
      )}
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;