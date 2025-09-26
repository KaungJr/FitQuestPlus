import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CartView({ cart, setCartQuantity, setUserData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);

  // Calculate total price
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  const onSubmit = (data) => {
    setUserData(data);
    navigate("/confirmation");
  };

  return (
    <main>
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Your Shopping Cart</h1>
          <p className="lead opacity-75">
            Review your cart, update quantities, and complete your purchase with
            secure checkout.
          </p>
        </div>
      </header>

      {/* Cart Content */}
      <div className="container my-5">
        <button
          onClick={() => navigate("/browse")}
          className="btn btn-outline-secondary mb-4"
        >
          &laquo; Return to Shop
        </button>

        {/* Cart Summary Table */}
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th className="text-center">Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.name}>
                  <td className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="me-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    {item.name}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-secondary me-1"
                      onClick={() =>
                        setCartQuantity(item.name, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-1"
                      onClick={() =>
                        setCartQuantity(item.name, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total and Tax */}
        <div className="text-end mt-4">
          <h5 className="fw-bold">
            Subtotal: ${cartTotal.toFixed(2)} <br />
            Tax (7.5%): ${(cartTotal * 0.075).toFixed(2)} <br />
            <span className="fs-4">
              Total: ${(cartTotal * 1.075).toFixed(2)}
            </span>
          </h5>
        </div>

        {/* Payment Form */}
        <section
          className="mt-5 p-4 rounded shadow-sm"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <h3 className="text-center mb-4 fw-bold">Payment Information</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  {...register("fullName", { required: true })}
                  placeholder="Full Name"
                  className="form-control"
                />
                {errors.fullName && (
                  <p className="text-danger small">Full Name is required.</p>
                )}
              </div>

              <div className="col-md-6">
                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="form-control"
                />
                {errors.email && (
                  <p className="text-danger small">Email is required.</p>
                )}
              </div>

              <div className="col-md-6">
                <input
                  {...register("creditCard", { required: true })}
                  placeholder="Credit Card"
                  className="form-control"
                />
                {errors.creditCard && (
                  <p className="text-danger small">Credit Card is required.</p>
                )}
              </div>

              <div className="col-md-6">
                <input
                  {...register("address", { required: true })}
                  placeholder="Address"
                  className="form-control"
                />
                {errors.address && (
                  <p className="text-danger small">Address is required.</p>
                )}
              </div>

              <div className="col-md-6">
                <input
                  {...register("city", { required: true })}
                  placeholder="City"
                  className="form-control"
                />
                {errors.city && (
                  <p className="text-danger small">City is required.</p>
                )}
              </div>

              <div className="col-md-3">
                <input
                  {...register("state", { required: true })}
                  placeholder="State"
                  className="form-control"
                />
                {errors.state && (
                  <p className="text-danger small">State is required.</p>
                )}
              </div>

              <div className="col-md-3">
                <input
                  {...register("zip", { required: true })}
                  placeholder="Zip"
                  className="form-control"
                />
                {errors.zip && (
                  <p className="text-danger small">Zip is required.</p>
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-5">
                Complete Order &raquo;
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-light mt-5">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
}

export default CartView;
