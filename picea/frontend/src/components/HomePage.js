import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import JsonDataDisplay from "./Table"

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

function getCounsellors() {
  axios(
    "https://bkd4zey0l4.execute-api.us-east-1.amazonaws.com/dev/counsellers"
  )
    .then(response => {
        console.log(response);
        return response.data.counsellors;
    })
    .catch(function (error) {
        console.error(error);
    });
}

const HomePage = () => (
  <div>
    <h1>Welcome to Picea</h1>
    <HomeButton />
    <JsonDataDisplay JsonData={getCounsellors()} />
  </div>
);

export default HomePage;
