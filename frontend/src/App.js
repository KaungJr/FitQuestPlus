import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BrowseView from "./views/BrowseView";
import CartView from "./views/CartView";
import ConfirmationView from "./views/ConfirmationView";
import Home from "./views/Home";
import WorkoutsView from "./views/Workout";
import WorkoutProgramsView from "./views/WorkoutPrograms";
import AboutView from "./views/About";
import LoginAndSignup from "./views/LoginandSignup";
import Authentication from "./views/LoginandSignup";
import ProfileView from "./views/ProfileView"; // Import ProfileView

function App() {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserData(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setCart([]);
    setUserData({});
  };

  const handleUpdateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserData(updatedUser);
  };

  const handleDeleteAccount = (username) => {
    if (window.confirm(`Are you sure you want to delete the account for ${username}?`)) {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUserData({});
      setCart([]);
      alert("Account deleted successfully.");
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        const updatedCart = prevCart
          .map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0);

        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const setCartQuantity = (name, quantity) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((cartItem) =>
            cartItem.name === name ? { ...cartItem, quantity } : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const resetCart = () => {
    setCart([]);
    setUserData({});
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                FitQuest
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/workouts">Workouts</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/workout-programs">Workout Programs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/browse">Browse</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Account</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<WorkoutsView />} />
            <Route path="/workout-programs" element={<WorkoutProgramsView />} />
            <Route path="/about" element={<AboutView />} />
            <Route
              path="/browse"
              element={<BrowseView addToCart={addToCart} cart={cart} />}
            />
            <Route
              path="/cart"
              element={<CartView cart={cart} setCartQuantity={setCartQuantity} setUserData={setUserData} />}
            />
            <Route
              path="/confirmation"
              element={<ConfirmationView cart={cart} dataF={userData} resetCart={resetCart} />}
            />
            <Route
              path="/profile"
              element={
                <ProfileView
                  userData={userData}
                  handleUpdateUser={handleUpdateUser}
                  handleDeleteAccount={handleDeleteAccount}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Authentication handleLogin={handleLogin} isSignup={false} />} />
          <Route path="/signup" element={<Authentication handleLogin={handleLogin} isSignup={true} />} />
          <Route path="*" element={<LoginAndSignup handleLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
