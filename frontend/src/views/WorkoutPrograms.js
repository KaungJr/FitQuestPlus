import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import workoutProgramsData from "../data/workout_programs.json";

const WorkoutPrograms = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDetails, setVisibleDetails] = useState(null); // To track which card's details are visible

  useEffect(() => {
    setWorkouts(workoutProgramsData.workouts);
    setFilteredWorkouts(workoutProgramsData.workouts);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = workouts.filter((workout) =>
      workout.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredWorkouts(filtered);
  };

  const toggleDetails = (index) => {
    // Toggle visibility of details: if already visible, hide; otherwise, show
    setVisibleDetails(visibleDetails === index ? null : index);
  };

  const renderWorkouts = () => {
    return filteredWorkouts.map((workout, index) => (
      <div className="col-lg-4 col-md-6 mb-4" key={index}>
        <div className="card workout-card shadow-sm h-100">
          <img
            src={workout.image}
            alt={workout.title}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">{workout.title}</h5>
            <p className="text-muted mb-2">
              <strong>Duration:</strong> {workout.duration}
            </p>
            <p className="text-muted mb-2">
              <strong>Intensity:</strong> {workout.intensity}
            </p>
            <p className="small text-muted">{workout.description}</p>

            <button
              className="btn btn-primary mt-3"
              onClick={() => toggleDetails(index)} // Toggle details on button click
            >
              {visibleDetails === index ? "Hide Details" : "View Details"}
            </button>

            {visibleDetails === index && ( // Conditionally render details if visible
              <div className="mt-3">
                <h6 className="fw-bold">Workout Details</h6>
                <ul className="list-unstyled small">
                  <li>
                    <strong>Warm-up:</strong> {workout.details.warmup}
                  </li>
                  <li>
                    <strong>Exercises:</strong> {workout.details.exercises}
                  </li>
                  {workout.details.cardio && (
                    <li>
                      <strong>Cardio:</strong> {workout.details.cardio}
                    </li>
                  )}
                  {workout.details.finisher && (
                    <li>
                      <strong>Finisher:</strong> {workout.details.finisher}
                    </li>
                  )}
                  <li>
                    <strong>Cool Down:</strong> {workout.details.cooldown}
                  </li>
                </ul>

                <h6 className="fw-bold">Benefits</h6>
                <p className="small">{workout.benefits}</p>

                <h6 className="fw-bold">Recommended For</h6>
                <p className="small">{workout.recommendedFor}</p>

                <h6 className="fw-bold">Weekly Schedule</h6>
                <ul className="list-unstyled small">
                  {workout.schedule.map((day, idx) => (
                    <li key={idx}>{day}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <main>
      {/* Header */}
      <header
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage: "url('/images/workout-programs-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="fw-bold">Workout Programs</h1>
          <p className="lead">
            Explore customized workout programs tailored to your goals. Search
            or browse to find the perfect plan for you.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control search-bar shadow-sm"
              placeholder="Search for workout programs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Workout Cards */}
        <div className="row mt-4">{renderWorkouts()}</div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
};

export default WorkoutPrograms;
