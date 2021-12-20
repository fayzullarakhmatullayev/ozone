import renderCart from "./renderCart";
import postData from './postData'

const cart = () => {
  const cartBtn = document.getElementById('cart');
  const cartModal = document.querySelector('.cart');
  const cartCloseBtn = cartModal.querySelector('.cart-close');
  const goodsWrapper = document.querySelector('.goods');
  const cartTotal = document.querySelector('.cart-total > span');
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartSendBtn = document.querySelector('.cart-confirm');
  const counter = document.querySelector('.counter');
  
  counter.textContent = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0

  const openCart = e => {
    e.preventDefault();
    const cart = localStorage.getItem('cart') ? 
          JSON.parse(localStorage.getItem('cart')) : []
    cartModal.style.display = 'flex';
    
    renderCart(cart)
    
    cartTotal.textContent = cart.reduce((sum, goodItem) => {
      return sum + goodItem.price
    }, 0)
    
  }
  const closeCart = () => {
    cartModal.style.display = 'none';
  }
  
  cartBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  
  goodsWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-primary')){
      const card = e.target.closest('.card')
      const key = card.dataset.key
      const goods = JSON.parse(localStorage.getItem('goods'))
      const cart = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []
      const goodItem = goods.find(item => item.id === +key)
      cart.push(goodItem)
      localStorage.setItem('cart', JSON.stringify(cart))
      counter.textContent = JSON.parse(localStorage.getItem('cart')).length
    }
  })
  
  cartWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-primary')){
      const card = e.target.closest('.card')
      const key = card.dataset.key
      const cart = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []
            
      const index = cart.findIndex(item => item.id === +key)
      cart.splice(index, 1)
            
      localStorage.setItem('cart', JSON.stringify(cart))
      renderCart(cart)
    
      cartTotal.textContent = cart.reduce((sum, goodItem) => {
        return sum + goodItem.price
      }, 0)
      counter.textContent = JSON.parse(localStorage.getItem('cart')).length
    }
  })
  cartSendBtn.addEventListener('click', () => {
    const cart = localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []
            
    postData(cart).then(() => {
      localStorage.removeItem('cart')
      renderCart([])
      cartTotal.textContent = 0
    })
  })
}

export default cart