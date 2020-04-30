import React, { useContext } from 'react';
import RestaurantContext from '../../context/restaurantContext';
import './filterControls.css'

function FilterControls () {

    const { genres, setGenreFilter, setStateFilter, setSearch, filtersActive, setFiltersActive, setPage } = useContext(RestaurantContext);

    const makeOptions = (options) => {
        return options.map(option => <option key={ option } >{ option }</option>)
    }

    const stateCodes = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", 
                        "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT",
                        "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA",
                        "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

    const searchSubmit = (e) => {
        e.preventDefault()
        const searchTerm = document.querySelector('.search').value
        setSearch(searchTerm)
        setPage(1)
    }

    const handleChange = (e) => {
        const searchTerm = e.target.value
        if(searchTerm === ""){
            setSearch("")
            setPage(1)
        }
    }

    const toggleFiltersActive = (e) => {
        e.preventDefault()
        setFiltersActive(!filtersActive)
    }

    const chooseState = (e) => {
        setStateFilter(e.target.value)
        setPage(1)
    }

    const chooseGenre = (e) => {
        setGenreFilter(e.target.value)
        setPage(1)
    }

    return (
        <form>
            <div>
                <label htmlFor="State">Filter By State</label>
                <select className="state-select" name="State" onChange={chooseState} >
                    <option>All</option>
                    {makeOptions(stateCodes)}
                </select>
            </div>
            <div>
                <label htmlFor="Genre">Filter By Type of Restaurant</label>
                <select className="genre-select" name="Genre" onChange={chooseGenre} >
                    <option>All</option>
                    {makeOptions(genres)}
                </select>
            </div>
            <div>
                <label htmlFor="Search">Search by Name, City, or Type</label>
                <input className='search' placeholder="Search" name="Search" onChange={handleChange}/>
                <button className='search-button' onClick={searchSubmit} >Submit</button>
                <button onClick={toggleFiltersActive}>{
                    filtersActive
                    ? "Remove Filters"
                    : "Add Filters"
                }</button>
            </div>
        </form>
    )
}

export default FilterControls