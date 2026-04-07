import { useState } from "react";
import axios from "axios";

function App() {

  const [currentPage, setCurrentPage] = useState("signup");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAge, setUpdateAge] = useState("");

  // ---------------- SIGNUP ----------------

  const signup = async () => {
    try {

      const res = await axios.post(
        "http://localhost:3000/signup",
        { name, email, password }
      );

      alert(res.data.message);

      setCurrentPage("login");

    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  // ---------------- LOGIN ----------------

  const login = async () => {
    try {

      const res = await axios.post(
        "http://localhost:3000/login",
        { email: loginEmail, password: loginPassword },
        { withCredentials: true }
      );

      alert(res.data.message);

      setCurrentPage("dashboard");

      getUsers();

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  // ---------------- GET USERS ----------------

  const getUsers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/users",
        { withCredentials: true }
      );

      setUsers(res.data);

    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  // ---------------- DELETE USER ----------------

  const deleteUser = async (id) => {
    try {

      await axios.delete(
        `http://localhost:3000/users/${id}`,
        { withCredentials: true }
      );

      alert(`User ${id} deleted`);

      getUsers();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ---------------- UPDATE SELECT ----------------

  const selectUserToUpdate = (user) => {
    setSelectedUser(user);

    setUpdateName(user.name || "");
    setUpdateEmail(user.email || "");
    setUpdateAge(user.age || "");
  };

  // ---------------- UPDATE USER ----------------

  const updateUser = async () => {

    if (!selectedUser) return;

    try {

      await axios.put(
        `http://localhost:3000/users/${selectedUser.id}`,
        {
          name: updateName,
          email: updateEmail,
          age: updateAge,
        },
        { withCredentials: true }
      );

      alert(`User ${selectedUser.id} updated`);

      setSelectedUser(null);

      getUsers();

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ---------------- LOGOUT ----------------

  const logout = async () => {

    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );

    setUsers([]);

    setCurrentPage("login");
  };

  // ---------------- SIGNUP PAGE ----------------

  if (currentPage === "signup") {
    return (

      <div style={styles.container}>

        <h1>Signup</h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={signup} style={styles.button}>
          Signup
        </button>

        <p>
          Already have account?{" "}
          <span
            style={styles.link}
            onClick={() => setCurrentPage("login")}
          >
            Login
          </span>
        </p>

      </div>
    );
  }

  // ---------------- LOGIN PAGE ----------------

  if (currentPage === "login") {
    return (

      <div style={styles.container}>

        <h1>Login</h1>

        <input
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={login} style={styles.button}>
          Login
        </button>

        <p>
          No account?{" "}
          <span
            style={styles.link}
            onClick={() => setCurrentPage("signup")}
          >
            Signup
          </span>
        </p>

      </div>
    );
  }

  // ---------------- DASHBOARD ----------------

  if (currentPage === "dashboard") {

    return (

      <div style={styles.container}>

        {selectedUser ? (

          <div style={styles.updateBox}>

            <h3>Update User</h3>

            <input
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              style={styles.input}
            />

            <input
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              style={styles.input}
            />

            <input
              value={updateAge}
              onChange={(e) => setUpdateAge(e.target.value)}
              style={styles.input}
            />

            <button onClick={updateUser} style={styles.button}>
              Update
            </button>

            <button
              onClick={() => setSelectedUser(null)}
              style={{ ...styles.button, backgroundColor: "#777" }}
            >
              Cancel
            </button>

          </div>

        ) : (

          <>

            <h1>User Dashboard</h1>

            <button
              onClick={logout}
              style={{ ...styles.button, backgroundColor: "#f44336" }}
            >
              Logout
            </button>

            <h2>Users</h2>

            {users.length === 0 ? (
              <p>No users found</p>
            ) : (

              <ul style={styles.userList}>

                {users.map((user) => (

                  <li key={user.id} style={styles.userItem}>

                    <span>
                      {user.name} ({user.email}) Age: {user.age || "-"}
                    </span>

                    <div>

                      <button
                        style={styles.smallButton}
                        onClick={() => selectUserToUpdate(user)}
                      >
                        Update
                      </button>

                      <button
                        style={{ ...styles.smallButton, backgroundColor: "#f44336" }}
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </li>

                ))}

              </ul>

            )}

          </>

        )}

      </div>

    );
  }

}

const styles = {

  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },

  input: {
    display: "block",
    width: "90%",
    margin: "10px auto",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },

  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },

  userList: {
    listStyle: "none",
    padding: 0,
  },

  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },

  smallButton: {
    padding: "5px 10px",
    marginLeft: "5px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2196f3",
    color: "#fff",
    cursor: "pointer",
  },

  updateBox: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  }

};

export default App;














//old basic jsx
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   // --- SIGNUP STATES ---
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // --- LOGIN STATES ---
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // --- USERS LIST ---
//   const [users, setUsers] = useState([]);

//   // --- UPDATE STATES ---
//   const [updateId, setUpdateId] = useState("");
//   const [updateName, setUpdateName] = useState("");
//   const [updateEmail, setUpdateEmail] = useState("");
//   const [updateAge, setUpdateAge] = useState("");

//   // --- SIGNUP FUNCTION ---
//   const signup = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/signup", {
//         name,
//         email,
//         password,
//       });
//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed");
//     }
//   };

//   // --- LOGIN FUNCTION ---
//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/login", {
//         email: loginEmail,
//         password: loginPassword,
//       });
//       localStorage.setItem("token", res.data.token);
//       alert("Login successful");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   // --- LOGOUT FUNCTION ---
//   // const logout = () => {
//   //   localStorage.removeItem("token");
//   //   window.location.reload(); // refresh page on logout
//   // };
// const logout = async () => {
//   try {
//     await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
//     window.location.reload(); // refresh page after logout
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // --- GET USERS FUNCTION ---
//   const getUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:3000/users", {
//         headers: { Authorization: token },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     }
//   };

//   // --- DELETE USER FUNCTION ---
//   const deleteUser = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/users/${id}`, {
//         headers: { Authorization: token },
//       });
//       alert(`User ${id} deleted`);
//       getUsers(); // refresh list
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   // --- UPDATE USER FUNCTION ---
//   const updateUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:3000/users/${updateId}`,
//         {
//           name: updateName,
//           email: updateEmail,
//           age: updateAge,
//         },
//         {
//           headers: { Authorization: token },
//         }
//       );
//       alert(`User ${updateId} updated`);
//       getUsers(); // refresh list
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Auth & Users System</h1>

//       {/* SIGNUP */}
//       <h2>Signup</h2>
//       <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
//       <br /><br />
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <br /><br />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br /><br />
//       <button onClick={signup}>Signup</button>

//       <hr />

//       {/* LOGIN */}
//       <h2>Login</h2>
//       <input
//         placeholder="Email"
//         onChange={(e) => setLoginEmail(e.target.value)}
//       />
//       <br /><br />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setLoginPassword(e.target.value)}
//       />
//       <br /><br />
//       <button onClick={login}>Login</button>
//       <button onClick={logout} style={{ marginLeft: "10px" }}>
//         Logout
//       </button>

//       <hr />

//       {/* GET USERS */}
//       <h2>Users List</h2>
//       <button onClick={getUsers}>Get Users (Protected)</button>
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <li key={user.id}>
//               {user.name} | {user.email} | {user.age || "N/A"}{" "}
//               <button
//                 onClick={() => deleteUser(user.id)}
//                 style={{ marginLeft: "10px" }}
//               >
//                 Delete
//               </button>
//             </li>
//           ))
//         ) : (
//           <li>No users found</li>
//         )}
//       </ul>

//       <hr />

//       {/* UPDATE USER */}
//       <h2>Update User</h2>
//       <input
//         placeholder="User ID"
//         value={updateId}
//         onChange={(e) => setUpdateId(e.target.value)}
//       />
//       <br /><br />
//       <input
//         placeholder="New Name"
//         value={updateName}
//         onChange={(e) => setUpdateName(e.target.value)}
//       />
//       <br /><br />
//       <input
//         placeholder="New Email"
//         value={updateEmail}
//         onChange={(e) => setUpdateEmail(e.target.value)}
//       />
//       <br /><br />
//       <input
//         placeholder="New Age"
//         value={updateAge}
//         onChange={(e) => setUpdateAge(e.target.value)}
//       />
//       <br /><br />
//       <button onClick={updateUser}>Update User</button>
//     </div>
//   );
// }

// export default App;