import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchRestaurants } from '../../utilities';
import RestaurantContext from '../../context/restaurantContext';
import RestaurantsTable from '../RestaurantsTable';
import FilterControls from '../FilterControls';

function App() {

  const [restaurants, setRestaurants] = useState([])
  const [genres, setGenres] = useState([])
  const [genreFilter, setGenreFilter] = useState("All")
  const [stateFilter, setStateFilter] = useState("All")
  const [search, setSearch] = useState("")


  const auth = "Api-Key " + process.env.REACT_APP_AUTH

  const makeGenresList = (restaurants) => {
    let genresNoDupes = []
    let genresArray = restaurants.map(restaurant => restaurant.genre)
    let genresAsArray = genresArray.map(genreString => genreString.split(","))
    genresAsArray.forEach(genresList => {
      for(let i = 0; i < genresList.length; i++) {
        if(!genresNoDupes.includes(genresList[i])){
          genresNoDupes.push(genresList[i])
        }
      }
    })

    setGenres(genresNoDupes)
  }

  useEffect( () => {
    fetchRestaurants(auth, setRestaurants)
    makeGenresList(restaurants)
  }, [restaurants])

  const tableHeadings = ["Name", "City", "State", "Phone Number", "Genres"]

  const rowKeys = ["name", "city", "state", "telephone", "genre"]

  return (
    <RestaurantContext.Provider value={{
        tableHeadings,
        rowKeys,
        restaurants,
        genres,
        genreFilter,
        setGenreFilter,
        stateFilter,
        setStateFilter,
        search,
        setSearch,
        setRestaurants,
      }
    }>
      <div className="App">
        <header className="App-header">
          <p>Hello</p>
        </header>
        <main>
          <section>
            <FilterControls />
          </section>
          <section>
            <RestaurantsTable />
          </section>
        </main>
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
