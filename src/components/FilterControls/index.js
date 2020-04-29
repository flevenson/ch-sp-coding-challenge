import React, { useContext } from 'react';
import RestaurantContext from '../../context/restaurantContext';

function FilterControls () {

    const { addStateFilter,
        removeStateFilter,
        addGenreFilter,
        removeGenreFilter,
        addSearch,
        removeSearch,
        stateFilter,
        genreFilter,
        search,
        setDisplayedRestaurants,
        genres } = useContext(RestaurantContext);

    const makeGenresOptions = (genres) => {
        return genres.map(genre => <option key={ genre } >{ genre }</option>)
    }

    return (
        <form>
            <label htmlFor="State">Filter By State (2 letter Code)</label>
            <input className="state-search" name="State" />
            <label htmlFor="Genre">Filter By Type of Restaurant</label>
            <select className="genre-select" name="Genre" onChange={() => addGenreFilter(document.querySelector(".genre-select").value)}>
                <option onClick={ removeGenreFilter }></option>
                {makeGenresOptions(genres)}
            </select>
            <label htmlFor="Search">Search by Name, City, or Type</label>
            <input className='search' placeholder="Search" name="Search"/>

        </form>
    )
}

export default FilterControls