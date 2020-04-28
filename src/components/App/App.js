import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchRestaurants } from '../../utilities';
import RestaurantContext from '../../context/restaurantContext'

function App() {

  const [restaurants, setRestaurants] = useState([])

  const auth = "Api-Key " + process.env.REACT_APP_AUTH

  console.log(auth)

  useEffect(() => {
    fetchRestaurants(auth, setRestaurants)
  }, [auth])

  console.log(restaurants)

  return (
    <RestaurantContext.Provider value={
      restaurants
    }>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <p></p>
        </header>
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
