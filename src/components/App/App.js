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
  const [filtersActive, setFiltersActive] = useState(true)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const auth = "Api-Key " + process.env.REACT_APP_AUTH
  const tableHeadings = ["Name", "City", "State", "Phone Number", "Restaurant Type"]
  const rowKeys = ["name", "city", "state", "telephone", "genre"]

  const makeGenresList = (restaurants) => {
    let genresNoDupes = []
    restaurants.forEach(restaurant => {
      for(let i = 0; i < restaurant.genre.length; i++) {
        if(!genresNoDupes.includes(restaurant.genre[i])){
          genresNoDupes.push(restaurant.genre[i])
        }
      }
    })
    const sortedGenres = genresNoDupes.sort((a, b) => (a > b) ? 1 : -1)

    setGenres(sortedGenres)
  }

  useEffect( () => {
    fetchRestaurants(auth, setRestaurants, setIsLoading)
    makeGenresList(restaurants)
  }, [restaurants])


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
        filtersActive,
        setFiltersActive,
        page,
        setPage
      }
    }>
      <div className="App">
        <header className="App-header">
          <h1>Restaurant Table App</h1>
        </header>
        <main>
          <section>
            <FilterControls />
          </section>
          <section>
            { isLoading
              ? <h1>Loading Restaurants Table</h1>
              : <RestaurantsTable />
            }
          </section>
        </main>
      </div>
    </RestaurantContext.Provider>
  );
}

export default App;
