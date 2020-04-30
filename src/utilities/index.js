export const fetchRestaurants = (apiKey, setRestaurants) => {
    try {
        fetch(
          "https://code-challenge.spectrumtoolbox.com/api/restaurants", {
            headers: {
              Authorization: apiKey
            }
          }
        )
        .then(response => response.json())
        .then(results => {
          const cleanedRestaurants = cleanRestaurants(results)
          setRestaurants(cleanedRestaurants)})
        .catch(err => console.log(err))
      } catch (error){
        throw new Error(error.message);
      }
}

export const cleanRestaurants = (restaurants) => {
  
  const displayRestaurants = restaurants.map(restaurant => {
    return {...restaurant, display: true}
  })
  const sortedRestaurants = displayRestaurants.sort((a, b) => (a.name > b.name) ? 1 : -1)

  return sortedRestaurants
}