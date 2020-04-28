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
        .then(results => setRestaurants(results))
        .catch(err => console.log(err))
      } catch (error){
        throw new Error(error.message);
      }
}
