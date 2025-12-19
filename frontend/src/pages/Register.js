import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const styles = {
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
    submitBtn: {
      backgroundColor: "#4CAF50",
      color: "white"
    },
    loginBtn: {
      backgroundColor: "#2196F3",
      color: "white"
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !role.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const mainrole = role.trim().toLowerCase();

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, role: mainrole })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <center>
      <div style={styles.container}>
        <h2 style={styles.heading}>Create Account</h2>

        <form onSubmit={handleRegister}>
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
            Submit
          </button>

          <button
            type="button"
            style={styles.button}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </form>
      </div>
    </center>
  );
}

export default Register;
