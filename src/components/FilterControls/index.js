import React, { useContext } from 'react';
import RestaurantContext from '../../context/restaurantContext';

function FilterControls () {

    const { genres, setGenreFilter, setStateFilter, setSearch } = useContext(RestaurantContext);

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
    }

    return (
        <form>
            <label htmlFor="State">Filter By State</label>
            <select className="state-select" name="State" onChange={e => setStateFilter(e.target.value)}>
                <option>All</option>
                {makeOptions(stateCodes)}
            </select>
            <label htmlFor="Genre">Filter By Type of Restaurant</label>
            <select className="genre-select" name="Genre" onChange={e => setGenreFilter(e.target.value)}>
                <option>All</option>
                {makeOptions(genres)}
            </select>
            <label htmlFor="Search">Search by Name, City, or Type</label>
            <input className='search' placeholder="Search" name="Search"/>
            <button className='search-button' onClick={searchSubmit}>Submit</button>
        </form>
    )
}

export default FilterControls