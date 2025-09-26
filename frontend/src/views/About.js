import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const About = () => {
  return (
    <main>
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">About Us</h1>
          <p className="lead">
            Learn more about the creators of <strong>FitQuest</strong> and our
            motivation for building this platform.
          </p>
        </div>
      </header>

      {/* Creators Section */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-4">Meet the Creators</h2>
        <p className="text-muted mb-5">
          We're passionate developers who believe in the power of fitness to
          transform lives. Here’s a little more about us.
        </p>
        <div className="row justify-content-center">
          {/* Creator 1 */}
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="card shadow-lg border-0 h-100">
              <img
                src="/myotherimages/muhammed1.jpg"
                alt="Muhammed Fadel"
                className="card-img-top rounded-top"
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h3 className="fw-bold mb-2">Muhammed Fadel</h3>
                <p className="text-muted mb-1">Role: Co-Developer</p>
                <p>Major: Software Engineering</p>
                <p>Expected Graduation: Spring 2026</p>
                <p>Hobbies: Playing soccer, traveling, weightlifting</p>
                <p>Course: ComS3190</p>
                <p>Date: October 18, 2024</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:muhammed@iastate.edu"
                    className="text-primary"
                  >
                    muhammed@iastate.edu
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Creator 2 */}
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="card shadow-lg border-0 h-100">
              <img
                src="/myotherimages/kaung.jpg"
                alt="Kaung Son"
                className="card-img-top rounded-top"
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h3 className="fw-bold mb-2">Kaung Son</h3>
                <p className="text-muted mb-1">Role: Co-Developer</p>
                <p>Major: Software Engineering</p>
                <p>Expected Graduation: Spring 2026</p>
                <p>Hobbies: Weightlifting, coding, video games, running</p>
                <p>Course: ComS3190</p>
                <p>Date: October 18, 2024</p>
                <p>
                  Email:{" "}
                  <a href="mailto:kpson@iastate.edu" className="text-primary">
                    kpson@iastate.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="container my-5 p-4 bg-light rounded shadow-sm">
        <h2 className="fw-bold text-center mb-3">Our Motivation</h2>
        <p className="lead text-center text-muted">
          At <strong>FitQuest</strong>, we believe in the transformative power
          of fitness. Our motivation stems from a shared passion for health,
          wellness, and helping others achieve their fitness goals. We wanted to
          create a platform that offers workout resources, personalized
          programs, and a supportive community to guide every fitness journey.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
};

export default About;
