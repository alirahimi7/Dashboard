const data = {
    products: [
    {
      id: 1,
      title: "کفش سالنی لونارگتو",
      price: 3000000,
      slug: "kafsh",
    },
    {
      id: 2,
      title: "کفش سالنی جوما",
      price: 4000000,
      slug: "kafsh",
    },
    {
      id: 3,
      title: "کفش سالنی ادیداس",
      price: 8000000,
      slug: "kafsh",
    },
    {
      id: 4,
      title: "کفش سالنی نایک",
      price: 6000000,
      slug: "kafsh",
    },
    {
      id: 5,
      title: "کفش ورزشی پیاده روی",
      price: 3500000,
      slug: "kafsh",
    },
    {
      id: 6,
      title: "کفش ورزشی پیاده روی",
      price: 3500000,
      slug: "kafsh",
    },
    {
      id: 7,
      title: "کفش ورزشی پیاده روی",
      price: 3500000,
      slug: "kafsh",
    },
    {
      id: 8,
      title: "کفش ورزشی پیاده روی",
      price: 3500000,
      slug: "kafsh",
    },
  ]
}



const toggleMenu = document.querySelector(".toggle-sidebar");
const modalScreenContainer = document.querySelector('.modal-screen')
const modalScreen = document.querySelector('.modal-screen .modal')
const createProductBtn = document.querySelector('#create-product')
const tableBody = document.querySelector('.table-body')
const paginationContainer = document.querySelector('.pagination')
const productCount = document.querySelector('.products-data')
const themeBtn = document.querySelector('.theme-button')
const HTMLContainer = document.querySelector('html')



let page = 1
let productParPage = 5
let theme = 'light'

function changeTheme(){
  if(theme === 'light'){
    theme = 'dark'
  }else{
    theme = 'light'
    
  }

  localStorage.setItem('theme' , theme)

  applyTheme()
}

function applyTheme(){
  const theme = localStorage.getItem('theme')

  if(theme === 'dark'){
    HTMLContainer.classList.add('dark')
  }else{
    HTMLContainer.classList.remove('dark')
  }
}


function showPageProduct(){
    const firstIndex = (page - 1) * productParPage
    const lastIndex = firstIndex + productParPage

    const productList = data.products.slice(firstIndex,lastIndex)

    tableBody.innerHTML = ''
    productList.forEach(function (product){
        tableBody.insertAdjacentHTML('beforeend' , 
            `
            <div class="tableRow">
              <p class="product-title">${product.title}</p>
              <p class="product-price">${product.price.toLocaleString()}</p>
              <p class="product-shortName">${product.slug}</p>
              <div class="product-manage">
                <button class="edit-btn" onclick="productEdit(${product.id})">
                  <!-- Edit icon -->
                  <i class="fas fa-edit"></i>
                </button>
                <button class="remove-btn" onclick="productRemove(${product.id})">
                  <!-- Delete fas icon -->
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            `
        )
    })
}

function showEditModal(){
  modalScreenContainer.classList.remove('hidden')
  modalScreen.innerHTML =  `
    <header class="modal-header">
            <h3>ویرایش محصول</h3>
            <button class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان محصول را وارد نمائید ..."
              id="product-title"
            />
            <input
              type="number"
              class="modal-input"
              placeholder="قیمت محصول را وارد نمائید ..."
              id="product-price"
            />
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان کوتاه محصول را وارد نمائید ..."
              id="product-shortName"
            />
          </main>
          <footer class="modal-footer">
            <button class="cancel">انصراف</button>
            <button class="submit">تائید</button>
          </footer>
  `
}


function productEdit(productId){
  showEditModal()

  const product = data.products.find(function (item){
    return item.id === productId
  })

    const title = document.querySelector('#product-title')
    const price = document.querySelector('#product-price')
    const slug = document.querySelector('#product-shortName')
    const submitBtn = document.querySelector('.submit')
    const cancelBtn = document.querySelector('.cancel')

    submitBtn.addEventListener('click' , function (){
      product.title = title.value
      product.price = +price.value
      product.slug = slug.value


      saveProductInLocalstoraged()
      showPageProduct()
      hideModal()
    })

    cancelBtn.addEventListener('click' , hideModal)
  
}

function productRemove(productId){
  const productIndex = data.products.findIndex(function (item){
    return item.id === productId
  })

  data.products.splice(productIndex,1)
  saveProductInLocalstoraged()
  showPageProduct()
  generatePagination()
}


function createProduct(){
    showCreateProductModal()

    const title = document.querySelector('#product-title')
    const price = document.querySelector('#product-price')
    const slug = document.querySelector('#product-shortName')
    const submitBtn = document.querySelector('.submit')
    const cancelBtn = document.querySelector('.cancel')

    paginationContainer.innerHTML = ''

    submitBtn.addEventListener('click' , function (){
      let newProduct = {
        id: data.products.length + 1,
        title: title.value,
        price: +price.value,
        slug : slug.value
      }

      data.products.push(newProduct)
      saveProductInLocalstoraged()
      generatePagination()
      showPageProduct()
      productCount.innerHTML = data.products.length
      hideModal()
      
    })



    cancelBtn.addEventListener('click' , hideModal)
}


function changePageHandler(userSelectPage){
  page = userSelectPage

  const pagesNumber = document.querySelectorAll('.page')

  pagesNumber.forEach(function (pageNumber){
    if(+pageNumber.innerHTML === page){
      pageNumber.classList.add('active')
    }else{
      pageNumber.classList.remove('active')
    }
  })

  showPageProduct()
  
}

function generatePagination(){
  const pagesCount = data.products.length / productParPage

  paginationContainer.innerHTML = ''
  for(let i = 0; i < pagesCount; i++){
    paginationContainer.insertAdjacentHTML('beforeend' , 
      `
         <span tabindex="1" class="page ${i + 1 === page ? 'active' : ''}" onclick="changePageHandler(${i + 1})">${i + 1}</span>
      `
    )
  }
}



function showCreateProductModal(){
    modalScreenContainer.classList.remove('hidden')
    modalScreen.innerHTML = 
    `   <header class="modal-header">
            <h3>ایجاد محصول</h3>
            <button class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان محصول را وارد نمائید ..."
              id="product-title"
            />
            <input
              type="number"
              class="modal-input"
              placeholder="قیمت محصول را وارد نمائید ..."
              id="product-price"
            />
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان کوتاه محصول را وارد نمائید ..."
              id="product-shortName"
            />
          </main>
          <footer class="modal-footer">
            <button class="cancel">انصراف</button>
            <button class="submit">تائید</button>
          </footer>
    `
    
}


function saveProductInLocalstoraged(){
    localStorage.setItem('products' , JSON.stringify(data.products))
}

function getProductFromLocalStoraged(){
    const localProduct = JSON.parse(localStorage.getItem('products'))

    if(localProduct){
        data.products = localProduct
    }

    showPageProduct()
    generatePagination()
    productCount.innerHTML = data.products.length
}

applyTheme()

function hideModal(){
  modalScreenContainer.classList.add('hidden')
}

toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});




createProductBtn.addEventListener('click' , createProduct)
themeBtn.addEventListener('click' , changeTheme)
