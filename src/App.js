import Signup from "./components/Signup";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="App">
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
      {isLoggedIn && (
        <Dashboard setIsLoggedIn={setIsLoggedIn} user={user}></Dashboard>
      )}
    </div>
  );
}
