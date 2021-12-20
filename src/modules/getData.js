const getData = (str) => {
  return fetch(`https://ozone-a5f92-default-rtdb.firebaseio.com/goods.json`)
  .then((response) => {
    return response.json()
  })
}

export default getData