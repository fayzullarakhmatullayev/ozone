import getData from "./getData";
import renderGoods from "./renderGoods";
import { categoryFilter } from './filters'

const catalog = () => {
  const btnCatalog = document.querySelector('.catalog-button > button');
  const catalogModal = document.querySelector('.catalog');
  const catalofModalItems = catalogModal.querySelectorAll('li');
  let isOpen = false
  
  catalofModalItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent
      getData().then(data => renderGoods(categoryFilter(data, text)))
      catalogModal.style.display = 'none'
      isOpen = false
    })
  })
  
  btnCatalog.addEventListener('click', () => {
    isOpen = !isOpen;
    if(isOpen){
      catalogModal.style.display = 'block'
    } else {
      catalogModal.style.display = 'none'
    }
  })
}


export default catalog