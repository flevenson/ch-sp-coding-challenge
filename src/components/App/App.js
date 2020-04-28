import React, { useEffect, useState } from 'react';
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

          <p>Hello</p>
        </header>
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
