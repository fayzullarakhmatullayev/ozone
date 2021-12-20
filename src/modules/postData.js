const postData = (cart) => {
  return fetch('https://ozone-a5f92-default-rtdb.firebaseio.com/cart.json', {
    method: 'POST',
    body: JSON.stringify(cart),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
  .then(res => {
    return res.json()
  })
}
export default postData