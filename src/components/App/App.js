import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchRestaurants } from '../../utilities';
import RestaurantContext from '../../context/restaurantContext';
import RestaurantsTable from '../RestaurantsTable';
import FilterControls from '../FilterControls';

function App() {

  const [restaurants, setRestaurants] = useState([])
  const [stateFilter, setStateFilter] = useState("")
  const [genreFilter, setGenreFilter] = useState("")
  const [search, setSearch] = useState("")
  const [genres, setGenres] = useState([])
  const [displayedRestaurants, setDisplayedRestaurants] = useState([restaurants])

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

  useEffect(() => {
    fetchRestaurants(auth, setRestaurants)
    makeGenresList(restaurants)
  }, [auth, restaurants])

  const tableHeadings = ["Name", "City", "State", "Phone Number", "Genres"]

  const rowKeys = ["name", "city", "state", "telephone", "genre"]

  const addStateFilter = (stateName) => {
    setStateFilter(stateName)
  }

  const removeStateFilter = () => {
    setStateFilter("")
  }

  const addGenreFilter = (genreName) => {
    setGenreFilter(genreName)
    console.log(genreFilter)
  }

  const removeGenreFilter = () => {
    setGenreFilter("")
  }

  const addSearch = (searchTerm) => {
    setSearch(searchTerm)
  }

  const removeSearch = () => {
    setSearch("")
  }

  const filterRestaurants = () => {

  }

  return (
    <RestaurantContext.Provider value={{
        displayedRestaurants,
        setDisplayedRestaurants,
        tableHeadings,
        rowKeys,
        addStateFilter,
        removeStateFilter,
        addGenreFilter,
        removeGenreFilter,
        addSearch,
        removeSearch,
        stateFilter,
        genreFilter,
        search,
        genres
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
