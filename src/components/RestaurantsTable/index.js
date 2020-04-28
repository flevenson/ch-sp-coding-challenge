import RestaurantContext from '../../context/restaurantContext';
import React, { useContext } from 'react';
import TableRow from '../TableRow'

function RestaurantsTable () {

    const { restaurants, tableHeadings } = useContext( RestaurantContext )

    console.log(restaurants)

    const makeHeadings = (headingsArray) => {
        return headingsArray.map(heading => <th>{heading}</th>)
    }

    const makeRows = (dataArray) => {
            return dataArray.map(object => <TableRow object />)
    }

    

    return (
        <table>
            <thead>
                { makeHeadings(tableHeadings) }
            </thead>
            <tbody>
                { makeRows(restaurants) }
            </tbody>
        </table>
    )
}

export default RestaurantsTable