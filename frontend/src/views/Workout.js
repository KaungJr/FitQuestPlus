import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import workoutData from "../data/workout.json";
import "../styles/workouts.css";

const Workouts = () => {
  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    setMuscleGroups(workoutData.muscleGroups);
  }, []);

  const imagePaths = {
    Chest: "body_chest.jpg",
    Back: "body_back.jpg",
    Arms: "body_arms.jpg",
    Shoulders: "body_shoulder.jpg",
    Quadriceps: "body_quad.jpg",
    Hamstrings: "body_ham.jpg",
  };

  const renderMuscleCategory = () => {
    return muscleGroups.map((group) => (
      <div className="col-lg-4 col-md-6 mb-4 text-center" key={group.name}>
        <a
          href={`#${group.name.toLowerCase()}Sec`}
          className="text-decoration-none text-dark"
        >
          <img
            src={`${process.env.PUBLIC_URL}/myotherimages/${
              imagePaths[group.name]
            }`}
            alt={group.name}
            className="bd-placeholder-img rounded-circle mb-3"
            width="200"
            height="140"
          />
          <h2 className="fw-normal">{group.name}</h2>
          <p>{getGroupDescription(group.name)}</p>
          <p>
            <a
              className="btn btn-secondary"
              href={`#${group.name.toLowerCase()}Sec`}
            >
              View details &raquo;
            </a>
          </p>
        </a>
      </div>
    ));
  };

  const renderWorkouts = (groupName, workouts) => (
    <section id={`${groupName.toLowerCase()}Sec`} className="my-5">
      <h2 className="text-center mb-3">{groupName}</h2>
      <p className="text-center text-muted">{getGroupDescription(groupName)}</p>
      <div
        className="divider my-4"
        style={{ height: "2px", background: "#ddd" }}
      ></div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {workouts.map((workout, index) => (
          <div className="col text-center" key={index}>
            <h4>{workout.name}</h4>
            <img
              src={`${process.env.PUBLIC_URL}/images/${workout.image}`}
              alt={workout.name}
              className="hover-image rounded mb-3"
              style={{ width: "100%", maxWidth: "400px", height: "auto" }}
              onMouseOver={(e) =>
                (e.currentTarget.src = `${process.env.PUBLIC_URL}/images/${workout.hoverImage}`)
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = `${process.env.PUBLIC_URL}/images/${workout.image}`)
              }
            />
          </div>
        ))}
      </div>
    </section>
  );

  const getGroupDescription = (groupName) => {
    const descriptions = {
      Chest:
        "The chest muscles, primarily the pectoralis major, help move the arms across the body.",
      Back: "The back muscles, including the lats and traps, stabilize the spine and assist with arm movements.",
      Arms: "The arms consist of the biceps, triceps, and forearms, responsible for arm movements and stability.",
      Shoulders:
        "The shoulders are made up of three deltoid points responsible for arm stabilization and movement.",
      Quadriceps:
        "The quadriceps, located in the front of the thigh, are essential for knee extension.",
      Hamstrings:
        "The hamstrings, located at the back of the thigh, are key for hip extension and knee flexion.",
    };
    return descriptions[groupName];
  };

  return (
    <main>
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Workout Guides</h1>
          <p className="opacity-75">
            Explore our workout guides designed to improve your strength,
            endurance, and overall fitness. You can choose from the following
            categories below, and pressing "View details" will take you to that
            body part's workout.
          </p>
        </div>
      </header>

      {/* Categories Section */}
      <div className="container marketing my-5">
        <div className="row justify-content-center">
          {renderMuscleCategory()}
        </div>
      </div>

      {/* Welcome Section */}
      <section
        className="container text-center my-5 p-4 rounded shadow-sm"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <h2 className="fw-bold">Welcome to Your Workout Guide</h2>
        <p className="text-muted lead">
          Whether you're aiming to build strength or simply stay in shape, our
          workout guides provide clear and effective exercises for every muscle
          group. <strong>Hover</strong> over any workout image to see the next
          step of the exercise.
        </p>
      </section>

      {/* Workouts Section */}
      <div className="container">
        {muscleGroups.map((group) =>
          renderWorkouts(group.name, group.workouts)
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-light">
        <strong>&copy; 2024 FitQuest. All rights reserved.</strong>
      </footer>
    </main>
  );
};

export default Workouts;
