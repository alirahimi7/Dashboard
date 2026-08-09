//* Cms -> Content Management System

const data = {
  users: [
    {
      id: 1,
      name: "پیمان احمدی",
      username: "peyman",
      email: "peyman@gmail.com",
      password: "peyman1212",
    },
    {
      id: 2,
      name: "ارش سعیدی",
      username: "arash",
      email: "arash@gmail.com",
      password: "arash1289",
    },
    {
      id: 3,
      name: "ارمان سلحشور",
      username: "arman",
      email: "arman@gmail.com",
      password: "arman33489",
    },
    {
      id: 4,
      name: "حسینعلی بختیاری",
      username: "hosein",
      email: "hosein@gmail.com",
      password: "hosein6148",
    },
    {
      id: 5,
      name: "مهدی محمدی",
      username: "mehdi",
      email: "mehdi@gmail.com",
      password: "mehdi6948",
    },
    
    

  ],

};

const toggleMenu = document.querySelector(".toggle-sidebar");
const tableBody = document.querySelector('.table-body')
const createUserBtn = document.querySelector('#create-user')
const modalScreenContainer = document.querySelector('.modal-screen')
const modalScreen = document.querySelector('.modal-screen .modal')
const paginationContainer = document.querySelector('.pagination')
const paginatin = document.querySelectorAll('.page')
const userCount = document.querySelector('.users-data')
const themeBtn = document.querySelector('.theme-button')
const HTMLContainer = document.querySelector('html')


let page = 1
let userParPage = 5
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


function showPageUsers(){

  tableBody.innerHTML = ''
  
  const firstIndex = (page - 1) * userParPage
  const lastIndex = firstIndex + userParPage

  const userList = data.users.slice(firstIndex,lastIndex)

  userList.forEach(function (user){
    tableBody.insertAdjacentHTML('beforeend' , 
      `
        <div class="tableRow">
          <p class="user-fullName">${user.name}</p>
          <p class="user-username">${user.username}</p>
          <p class="user-email">${user.email}</p>
          <p class="user-password">${user.password}</p>
          <div class="product-manage">
            <button class="edit-btn" onclick="editUser(${user.id})">
              <!-- Edit icon -->
              <i class="fas fa-edit"></i>
            </button>
            <button class="remove-btn" onclick="removeUser(${user.id})">
              <!-- Ban icon -->
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `
    )

  })
  
  

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
  
  showPageUsers()
}


function generatePageination(){
  paginationContainer.innerHTML = ''
  const pagesCount = data.users.length / userParPage

  for(let i = 0; i < pagesCount; i++){
    paginationContainer.insertAdjacentHTML('beforeend' , 
      `
        <span tabindex="1" class="page ${i + 1 === page ? 'active' : ''}" onclick="changePageHandler(${i + 1})" >${i + 1}</span>
      `
    )
  }
  
}


function showCreateUserModal(){
  modalScreenContainer.classList.remove('hidden')
  modalScreen.innerHTML = `
    <header class="modal-header">
          <h3>ایجاد کاربر جدید</h3>
          <button class="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            placeholder="نام و نام خانوادگی را وارد نمائید ..."
            id="user-fullName"
          />
          <input
            type="text"
            class="modal-input"
            id="user-username"
            placeholder="نام کاربری را وارد نمائید ..."
          />
          <input
            type="email"
            class="modal-input"
            id="user-email"
            placeholder="ایمیل را وارد نمائید ..."
          />
          <input
          type="email"
          class="modal-input"
          id="user-password"
          placeholder="رمز عبور را وارد نمائید ..."
        />
        </main>
        <footer class="modal-footer">
          <button class="cancel">انصراف</button>
          <button class="submit">تائید</button>
        </footer>
  `
}

function showEditUserModal(){
  modalScreenContainer.classList.remove('hidden')
  modalScreen.innerHTML = `
    <header class="modal-header">
          <h3>ویرایش اطلاعات کاربر</h3>
          <button class="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            placeholder="نام و نام خانوادگی را وارد نمائید ..."
            id="user-fullName"
          />
          <input
            type="text"
            class="modal-input"
            id="user-username"
            placeholder="نام کاربری را وارد نمائید ..."
          />
          <input
            type="email"
            class="modal-input"
            id="user-email"
            placeholder="ایمیل را وارد نمائید ..."
          />
          <input
            type="email"
            class="modal-input"
            id="user-password"
            placeholder="رمز عبور را وارد نمائید ..."
          />
        </main>
        <footer class="modal-footer">
          <button class="cancel">انصراف</button>
          <button class="submit">تائید</button>
        </footer>
  `

  
}

function createUser(){
  
    showCreateUserModal()

    const submitBtn = document.querySelector('.submit')
    const userFullName = document.querySelector('#user-fullName')  
    const userUsername = document.querySelector('#user-username')
    const userEmail = document.querySelector('#user-email')
    const userPassword = document.querySelector('#user-password')
    const cancelBtn = document.querySelector('.cancel')


    
    submitBtn.addEventListener('click' , function (){
      
      let newUser = {
        id: data.users.length + 1,
        name: userFullName.value,
        username: userUsername.value,
        email: userEmail.value,
        password: userPassword.value,
      }

      data.users.push(newUser)
      saveDataInLocalStoraged()
      showPageUsers()
      generatePageination()
      userCount.innerHTML = data.users.length
      hideModal()
    })

    cancelBtn.addEventListener('click' , hideModal)

}

function removeUser(userId){
  const userIndex = data.users.findIndex(function (user){
    return user.id === userId
  })

  data.users.splice(userIndex , 1)
  saveDataInLocalStoraged()
  showPageUsers()
  generatePageination()


}


function editUser(userId){
  showEditUserModal()
  
  const user = data.users.find((item) => {
    return item.id === userId
  })

    const userFullName = document.querySelector('#user-fullName')  
    const userUsername = document.querySelector('#user-username')
    const userEmail = document.querySelector('#user-email')
    const userPassword = document.querySelector('#user-password')
    const submitBtn = document.querySelector('.submit')

    submitBtn.addEventListener('click' , function (){

    user.name = userFullName.value
    user.username = userUsername.value
    user.email = userEmail.value
    user.password = userPassword.value

    saveDataInLocalStoraged()
    showPageUsers()
    hideModal()

    })

  const cancelBtn = document.querySelector('.cancel')
  cancelBtn.addEventListener('click' , hideModal)
}


function saveDataInLocalStoraged(){
  localStorage.setItem('users' , JSON.stringify(data.users))
}

function getDataFromLocalStoraged(){
  const localUser = JSON.parse(localStorage.getItem('users'))

  if(localUser){
    data.users = localUser
    
  }

  showPageUsers()
  generatePageination()
  userCount.innerHTML = data.users.length
}

applyTheme()

function hideModal(){
  modalScreenContainer.classList.add('hidden')
}





toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

createUserBtn.addEventListener('click' , createUser)
themeBtn.addEventListener('click' , changeTheme)
