import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json"; // JSON data with featurettes
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
  const [featurettes, setFeaturettes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturettes(data.featurettes);
  }, []);

  return (
    <main>
      {/* Carousel */}
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "500px", backgroundColor: "#252B42" }}
            >
              <div className="container text-start text-white">
                <h1>Welcome to FitQuest</h1>
                <p>
                  Your go-to guide for mastering fitness exercises safely and
                  effectively.
                </p>
                <button
                  className="btn btn-lg btn-primary"
                  onClick={() => navigate("/workouts")}
                >
                  Explore Workouts
                </button>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "500px", backgroundColor: "#252B42" }}
            >
              <div className="container text-center text-white">
                <h1>Explore Workout Programs</h1>
                <p>
                  Choose from a variety of structured workout programs to help
                  you stay on track.
                </p>
                <button
                  className="btn btn-lg btn-primary"
                  onClick={() => navigate("/workout-programs")}
                >
                  Programs
                </button>
              </div>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="carousel-item">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "500px", backgroundColor: "#252B42" }}
            >
              <div className="container text-end text-white">
                <h1>Learn About FitQuest</h1>
                <p>
                  Discover the story behind FitQuest and how we aim to help you
                  achieve your fitness goals.
                </p>
                <button
                  className="btn btn-lg btn-primary"
                  onClick={() => navigate("/about")}
                >
                  About
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container marketing mt-5">
        {featurettes.map((featurette, index) => (
          <div
            className={`row featurette my-5 ${
              index % 2 === 0 ? "bg-light" : ""
            }`}
            style={{ borderRadius: "10px", padding: "20px 0" }}
            key={index}
          >
            <div className={`col-md-7 ${index % 2 !== 0 ? "order-md-2" : ""}`}>
              <div className="p-4">
                <h2
                  className="featurette-heading fw-bold"
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    color: "#252B42",
                  }}
                >
                  {featurette.heading}
                </h2>
                <p
                  className="lead"
                  style={{
                    fontSize: "1.2rem",
                    color: "#666",
                    lineHeight: "1.8",
                  }}
                >
                  {featurette.text}
                </p>
              </div>
            </div>
            <div className={`col-md-5 ${index % 2 !== 0 ? "order-md-1" : ""}`}>
              <img
                src={featurette.image}
                alt="Featurette"
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                style={{
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 10px 20px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 15px rgba(0, 0, 0, 0.2)";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer text-center py-3 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
};

export default Home;
