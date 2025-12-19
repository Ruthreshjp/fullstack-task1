import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setUserRole }) {

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f2f5"
    },
    container: {
      border: "1px solid #ddd",
      padding: "25px",
      width: "280px",
      borderRadius: "6px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9"
    },
    heading: {
      marginBottom: "15px"
    },
    input: {
      width: "95%",
      padding: "8px",
      marginTop: "6px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    },
    button: {
      marginTop: "12px",
      marginRight: "8px",
      padding: "8px 14px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    loginBtn: {
      backgroundColor: "#4CAF50",
      color: "white"
    },
    registerBtn: {
      backgroundColor: "#2196F3",
      color: "white"
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loweredRole = role.toLowerCase();

    if (!username || !password || !loweredRole) {
      alert("Please enter username, password, and role");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, role: loweredRole })
      });

      if (response.ok) {
        const data = await response.json();
        const serverRole = data.role || loweredRole;

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", serverRole);
        setIsLoggedIn(true);
        if (setUserRole) {
          setUserRole(serverRole);
        }

        if (serverRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert("Invalid login details");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <br />
            <input
              type="text"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>Password:</label>
            <br />
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>Select Role:</label>
            <br />
            <select
              style={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

          <button
            type="button"
            style={styles.button}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
