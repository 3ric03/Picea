import React from 'react';
import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/meeting/:id");
  }

  return (
    <button type="button" onClick={handleClick}>
      Meet With Counseller
    </button>
  );
}

const HomePage = () => (
  <div>
    <h1>Hello, welcome to the homepage!</h1>
    <HomeButton />
  </div>
);

export default HomePage;
