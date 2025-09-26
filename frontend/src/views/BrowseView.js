import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BrowseView = ({ addToCart, cart }) => {
  const [catalog, setCatalog] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const someResponse = await fetch("/products.json");
      const data = await someResponse.json();
      setCatalog(data);
    };
    fetchData();
  }, []);

  // Calculate cart total
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  // Filter catalog
  const filteredCatalog = catalog.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Header */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Browse Products</h1>
          <p className="opacity-75 lead">
            Discover a range of fitness products and add them to your cart for a
            better workout experience.
          </p>
        </div>
      </header>

      {/* Search and Cart */}
      <div className="container my-4">
        <div className="row justify-content-between align-items-center mb-4">
          {/* Search Bar */}
          <div className="col-md-6">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Checkout Button */}
          <div className="col-md-3 text-end">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/cart")}
              disabled={cart.length === 0} // Disable if cart is empty
            >
              Checkout &raquo;
            </button>
          </div>
        </div>

        {/* Product Catalog */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredCatalog.map((item) => (
            <div className="col" key={item.name}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ transition: "transform 0.3s ease" }}
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="text-muted small">{item.description}</p>
                  <h6 className="fw-bold mb-3">${item.price}</h6>
                  {/* Quantity Controls */}
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => addToCart({ ...item, quantity: -1 })}
                      disabled={!cart.find((i) => i.name === item.name)}
                    >
                      -
                    </button>
                    <span className="fw-bold">
                      {cart.find((i) => i.name === item.name)?.quantity || 0}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total */}
        <div className="text-center mt-5">
          <h4 className="fw-bold">Order Total: ${cartTotal.toFixed(2)}</h4>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
};

export default BrowseView;
