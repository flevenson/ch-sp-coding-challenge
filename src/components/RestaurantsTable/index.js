import RestaurantContext from '../../context/restaurantContext';
import React, { useContext } from 'react';
import TableRow from '../TableRow'

function RestaurantsTable () {

    const { displayedRestaurants, tableHeadings } = useContext( RestaurantContext )

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th key={heading} >{heading}</th>)
    }

    const makeRows = (dataArray) => {
        return dataArray.map(restaurant => <TableRow key={restaurant.id} restaurant={restaurant}/>)
    }

    const sortedRestaurants = displayedRestaurants.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return (
        <table>
            <thead>
                <tr>
                    { makeHeadings(tableHeadings) }
                </tr>
            </thead>
            <tbody>
                { makeRows(sortedRestaurants) }
            </tbody>
        </table>
    )
}

export default RestaurantsTable