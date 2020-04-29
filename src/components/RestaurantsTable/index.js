import RestaurantContext from '../../context/restaurantContext';
import React, { useContext, useState } from 'react';
import TableRow from '../TableRow'

function RestaurantsTable () {

    const { restaurants, tableHeadings, genreFilter, stateFilter, search } = useContext( RestaurantContext )

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th key={heading} >{heading}</th>)
    }

    const makeRows = (dataArray) => {
        return dataArray.map(restaurant => <TableRow key={restaurant.id} restaurant={restaurant}/>)
    }

    return (
        <table>
            <thead>
                <tr>
                    { makeHeadings(tableHeadings) }
                </tr>
            </thead>
            <tbody>
                { makeRows(restaurants) }
            </tbody>
        </table>
    )
}

export default RestaurantsTable