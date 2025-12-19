import { Link, useNavigate } from "react-router-dom";

function Header({ setIsLoggedIn, userRole, setUserRole }) {

  const styles = {
    container: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
      marginBottom: "15px"
    },
    link: {
      marginRight: "15px",
      textDecoration: "none",
      color: "#333",
      fontWeight: "bold"
    },
    button: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      backgroundColor: "#f2f2f2",
      cursor: "pointer"
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <center>
      <div style={styles.container}>
        {userRole === "admin" && (
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}
        {userRole === "user" && (
        <Link to = "/home" style={styles.link}>
          Home
        </Link>
        )}
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </center>
  );
}

export default Header;
