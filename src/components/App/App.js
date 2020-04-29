import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchRestaurants } from '../../utilities';
import RestaurantContext from '../../context/restaurantContext';
import RestaurantsTable from '../RestaurantsTable'

function App() {

  const [restaurants, setRestaurants] = useState([])

  const auth = "Api-Key " + process.env.REACT_APP_AUTH

  useEffect(() => {
    fetchRestaurants(auth, setRestaurants)
  }, [auth])

  const tableHeadings = ["Name", "City", "State", "Phone Number", "Genres"]

  const rowKeys = ["name", "city", "state", "telephone", "genre"]

  return (
    <RestaurantContext.Provider value={{
        restaurants,
        tableHeadings,
        rowKeys
      }
    }>
      <div className="App">
        <header className="App-header">
          <p>Hello</p>
          <RestaurantsTable />
        </header>
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
