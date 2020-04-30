import RestaurantContext from '../../context/restaurantContext';
import React, { useContext, useState, useEffect } from 'react';
import TableRow from '../TableRow';
import './restaurantsTable.css';

function RestaurantsTable () {

    const { restaurants, tableHeadings, genreFilter, stateFilter, search, filtersActive, page, setPage } = useContext( RestaurantContext )

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th key={heading} >{heading}</th>)
    }

    const handlePageChange = (e) => {
        setPage(e.target.innerText)
    }

    const makeRows = () => {
        let pageStart = page * 10 - 10
        let pageEnd = page * 10 - 1

        let displayRestaurants = filteredRestaurants.filter(restaurant => restaurant.display === true)

        let restaurantsOnPage = displayRestaurants.filter(restaurant => {
            const restaurantIndex = displayRestaurants.indexOf(restaurant)
            if(restaurantIndex <= pageEnd && restaurantIndex >= pageStart) {
                return restaurant
            } 
        })
        
        return restaurantsOnPage.map(restaurant => <TableRow key={restaurant.id} restaurant={restaurant}/> )
    }

    const makePageButtons = () => {
        const totalRestaurants = filteredRestaurants.filter(restaurant => restaurant.display === true) 
        const numPages = totalRestaurants.length / 10
        let pageButtons = []
        for(let i = 0; i < numPages; i++) {
            pageButtons.push(<button key={i + 1} className={`page-button`} onClick={(e) => handlePageChange(e)}>{i + 1}</button>)
        }

        return pageButtons
    }

    useEffect(() => {
        setFilteredRestaurants(restaurants.map((restaurant) => {
            restaurant.display = true
            if(filtersActive) {
                if(restaurant.display === true && restaurant.state !== stateFilter && stateFilter !== "All" ) {
                    restaurant.display = false
                }
                if(restaurant.display === true && !restaurant.genre.includes(genreFilter) && genreFilter !== "All") {
                    restaurant.display = false
                }
            }
            if(restaurant.display === true && search.length && (restaurant.city.includes(search) || restaurant.name.includes(search) || restaurant.genre.includes(search))) {
                restaurant.display = true
            } else if (restaurant.display === true && search.length) {
                restaurant.display = false
            }
            return restaurant
        }))


    }, [genreFilter, stateFilter, search, restaurants, filtersActive, page])

    const checkForRestaurants = () => {
        const trueRestaurants = filteredRestaurants.filter(restaurant => restaurant.display)
        return trueRestaurants.length
    }

    return (
        <div>
            {
                checkForRestaurants() 
                ?
                <table>
                    <thead>
                        <tr>
                            { makeHeadings(tableHeadings) }
                        </tr>
                    </thead>
                    <tbody>
                       { makeRows() }
                    </tbody>
                </table>
                : <h1>No Restaurants Matching Filters</h1>
            }
            {makePageButtons()}
        </div>
    )
}

export default RestaurantsTable