import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ConfirmationView({ cart, dataF, resetCart }) {
  const navigate = useNavigate();

  const handleBackToStore = () => {
    resetCart();
    navigate("/browse");
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    return (calculateTotal() * 0.075).toFixed(2);
  };

  const calculateFinalTotal = () => {
    return (parseFloat(calculateTotal()) * 1.075).toFixed(2);
  };

  return (
    <main>
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Order Confirmation</h1>
          <p className="lead opacity-75">
            Thank you for your order! Here are the details of your purchase.
          </p>
        </div>
      </header>

      {/* Order Summary */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 mb-4">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">Your Order Summary</h3>
              </div>
              <div className="card-body">
                {/* Purchased Items */}
                <h4 className="mb-3 fw-bold">Purchased Items</h4>
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.name}>
                          <td className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                              className="me-2"
                            />
                            {item.name}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="text-end">
                  <h5>Subtotal: ${calculateTotal()}</h5>
                  <h5>Tax (7.5%): ${calculateTax()}</h5>
                  <h4 className="fw-bold">
                    Total:{" "}
                    <span className="text-success">
                      ${calculateFinalTotal()}
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="card shadow-lg border-0">
              <div className="card-header bg-secondary text-white text-center">
                <h3 className="mb-0">Your Information</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Name:</strong> {dataF.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {dataF.email}
                </p>
                <p>
                  <strong>Address:</strong> {dataF.address}, {dataF.city},{" "}
                  {dataF.state}, {dataF.zip}
                </p>
                <p>
                  <strong>Credit Card:</strong> **** **** ****{" "}
                  {dataF.creditCard.slice(-4)}
                </p>
              </div>
            </div>

            {/* Back to Store Button */}
            <div className="text-center mt-4">
              <button
                onClick={handleBackToStore}
                className="btn btn-success px-5"
              >
                Back to Store &raquo;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
}

export default ConfirmationView;
