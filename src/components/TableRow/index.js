import React, { useContext } from 'react';
import RestaurantContext from '../../context/restaurantContext';
import './tableRow.css'

function TableRow (props) {

    const { rowKeys } = useContext( RestaurantContext )

    const { restaurant } = props;

    const makeData = (dataKeys => {
        return dataKeys.map(dataKey => {
            if(typeof(restaurant[dataKey]) === "string"){
                return <td key={dataKey}>{ restaurant[dataKey]}</td>
            } else if(typeof(restaurant[dataKey] === "object")) {
                
                return <td key={dataKey}>{ restaurant[dataKey].join(", ")}</td>
            } 
        })
    })

    return (
        <tr key={restaurant.id}>
            { makeData(rowKeys) }
        </tr>
    )
}

export default TableRow