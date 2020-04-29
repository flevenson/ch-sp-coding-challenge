import RestaurantContext from '../../context/restaurantContext';
import React, { useContext, useState, useEffect } from 'react';
import TableRow from '../TableRow'

function RestaurantsTable () {

    const { restaurants, tableHeadings, genreFilter, stateFilter, search, setRestaurants } = useContext( RestaurantContext )

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th key={heading} >{heading}</th>)
    }

    const makeRows = (dataArray) => {
        
    return dataArray.map(restaurant => {
        if (restaurant.display === true){
            return <TableRow key={restaurant.id} restaurant={restaurant}/>}
        })
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
    }, [genreFilter, stateFilter, search, restaurants])

    const checkForRestaurants = () => {
        const trueRestaurants = filteredRestaurants.filter(restaurant => restaurant.display)
        return trueRestaurants.length
    }

    return (
        <table>
            <thead>
                <tr>
                    { makeHeadings(tableHeadings) }
                </tr>
            </thead>
            <tbody>
                { 
                    checkForRestaurants() 
                    ? makeRows(filteredRestaurants) 
                    : <p>No Matching restaurants</p>
                }
            </tbody>
        </table>
    )
}

export default RestaurantsTable