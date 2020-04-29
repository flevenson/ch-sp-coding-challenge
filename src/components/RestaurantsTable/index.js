import RestaurantContext from '../../context/restaurantContext';
import React, { useContext, useState, useEffect } from 'react';
import TableRow from '../TableRow'

function RestaurantsTable () {

    const { restaurants, tableHeadings, genreFilter, stateFilter, search, setRestaurants, filtersActive } = useContext( RestaurantContext )

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
    const [page, setPage] = useState(1)

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th key={heading} >{heading}</th>)
    }

    const makeRows = () => {

    let pageStart = page * 10 - 10
    let pageEnd = page * 10 - 1

    let rowsOnPage = filteredRestaurants.filter(restaurant => {
        const restaurantIndex = filteredRestaurants.indexOf(restaurant)
      if(restaurantIndex <= pageEnd && restaurantIndex >= pageStart) {
          return restaurant
      }
    })
        
    return rowsOnPage.map(restaurant => {
        if (restaurant.display === true){
            return <TableRow key={restaurant.id} restaurant={restaurant}/>}
        })
    }

    const makePageButtons = () => {
        const displayedRestaurants = filteredRestaurants.filter(restaurant => restaurant.display === true) 
        const numPages = displayedRestaurants.length / 10
        let pageButtons = []
        for(let i = 0; i < numPages; i++) {
            pageButtons.push(<button onClick={(e) => setPage(e.target.innerText)}>{i + 1}</button>)
        }
        return pageButtons
    }

    useEffect(() => {
        setFilteredRestaurants(restaurants.map((restaurant) => {
            restaurant.display = true
            if(restaurant.display === true && restaurant.state !== stateFilter && stateFilter !== "All") {
                restaurant.display = false
            }
            if(restaurant.display === true && !restaurant.genre.includes(genreFilter) && genreFilter !== "All") {
                restaurant.display = false
            }
            if(restaurant.display === true && search.length && (restaurant.city === search || restaurant.name.includes(search) || restaurant.genre.includes(search))) {
                restaurant.display = true
            } else if (restaurant.display === true && search.length) {
                restaurant.display = false
            }
            return restaurant
        }))
    }, [genreFilter, stateFilter, search, restaurants, filtersActive])

    const checkForRestaurants = () => {
        const trueRestaurants = filteredRestaurants.filter(restaurant => restaurant.display)
        return trueRestaurants.length
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        { makeHeadings(tableHeadings) }
                    </tr>
                </thead>
                <tbody>
                    { 
                        checkForRestaurants() 
                        ? makeRows() 
                        : <p>No Matching restaurants</p>
                    }
                </tbody>
            </table>
            {makePageButtons()}
        </div>
    )
}

export default RestaurantsTable