
const data = {
  users: [],
  products: []
}


const sidebarBtn = document.querySelector('.toggle-sidebar')
const sidebarContainer = document.querySelector('.sidebar')
const userNewContainer = document.querySelector('.user-new')
const tableProductBody = document.querySelector('.table-body')
const modalScreenContainer = document.querySelector('.modal-screen')
const modalScreen = document.querySelector('.modal-screen .modal')
const productsCount = document.querySelector('.products-data')
const usersCount = document.querySelector('.users-data')
const toastBox = document.querySelector('.toast')
const toastContent = document.querySelector('.toast-content')
const process = document.querySelector('.process')
const themeBtn = document.querySelector('.theme-button')
const HTMLContainer = document.querySelector('html')


let theme = 'light'
let progressStep = 0


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



function showNewUsers(){
    const newUser = data.users.slice(-5)

    userNewContainer.innerHTML = ''

    newUser.forEach(function (user){
        userNewContainer.insertAdjacentHTML('beforeend' , 
            `
                <article>
              <!-- user icon -->
              <span class="icon-card">
                <i class="fa-solid fa-user"></i>
              </span>
              <!-- user data -->
              <div>
                <p class="user-name">${user.name}</p>
                <p class="user-email">${user.email}</p>
              </div>
            </article>
            `
        )
    })
    
}

function showNewProducts(){
    const newProduct = data.products.slice(-5)

    tableProductBody.innerHTML = ''
    newProduct.forEach(function (product){
        tableProductBody.insertAdjacentHTML('beforeend' , 
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

function showDeleteConfirmationModal(){
    modalScreenContainer.classList.remove('hidden')
    modalScreen.innerHTML = `
        <i class="ui-border top red"></i>
          <i class="ui-border bottom red"></i>
          <header class="modal-header">
            <h3>حذف محصول</h3>
            <button class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <p class="remove-text">آیا از حذف این محصول اطمینان دارید؟</p>
          </main>
          <footer class="modal-footer">
            <button class="cancel">انصراف</button>
            <button class="submit">تائید</button>
          </footer>
    `
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

function showToast(){
    toastBox.classList.remove('hidden' , 'failed')
    toastBox.classList.add('success')
    toastContent.innerHTML = ' محصول با موفقیت ویرایش شد '

    const progressInterval = setInterval(() => {
        progressStep++

        if(progressStep > 120){
            toastBox.classList.add('hidden')
            process.style.width = `0%`
            progressStep = 0
            clearInterval(progressInterval)
        }else{
            process.style.width = `${progressStep}%`
        }
    }, 40);
}

function productRemove(productId){
    showDeleteConfirmationModal()

    const submitBtn = document.querySelector('.submit')
    const cancelBtn = document.querySelector('.cancel')

    submitBtn.addEventListener('click' , function (){
        const productIndex = data.products.findIndex(function (product){
            return product.id === productId
        })

        data.products.splice(productIndex,1)
        saveProductInlocalStorage()
        showNewProducts()
        hideModal()
    })
    
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


      saveProductInlocalStorage()
      showNewProducts()
      showToast()
      hideModal()
    })

    cancelBtn.addEventListener('click' , hideModal)
}

function saveProductInlocalStorage(){
    localStorage.setItem('products' , JSON.stringify(data.products))
}


function getDataFromLocalStoraged(){
    const localUsers = JSON.parse(localStorage.getItem('users'))
    const localProducts = JSON.parse(localStorage.getItem('products'))


    if(localUsers){
        data.users = localUsers
        usersCount.innerHTML = data.users.length
        showNewUsers()
    }

    if(localProducts){
        data.products = localProducts
        productsCount.innerHTML = data.products.length
        showNewProducts()
    }

  
    
}

applyTheme()

function hideModal(){
    modalScreenContainer.classList.add('hidden')
}

sidebarBtn.addEventListener('click' , function (){
  sidebarContainer.classList.toggle('open')
})

themeBtn.addEventListener('click' , changeTheme)

