import React, { useContext } from 'react';
import RestaurantContext from '../../context/restaurantContext';
import './tableRow.css'

function TableRow (props) {

    const { rowKeys } = useContext( RestaurantContext )

    const { restaurant } = props;

    const makeData = (dataKeys => {
        return dataKeys.map(dataKey => <td key={dataKey}>{ restaurant[dataKey] }</td>) 
    })

    return (
        <tr key={restaurant.id}>
            { makeData(rowKeys) }
        </tr>
    )
}

export default TableRow