const sortDropdown = document.getElementById("sortDropdown")
const selectedSort = document.getElementById("selectedSort")
const filterForm = document.getElementById("filterForm")
const filterFormSmall = document.getElementById("filterFormSmall")
const productList = document.getElementById("productList")
const prevPageBtn = document.getElementById("prevPageBtn")
const nextPageBtn = document.getElementById("nextPageBtn")
const currentPageText = document.getElementById("currentPageText")

function toggleSortBtn(element){
    if (element.getAttribute('aria-expanded') === "false") {
        element.setAttribute('aria-expanded', 'true')
        sortDropdown.classList.add("on-display")
    }
    else {
        element.setAttribute('aria-expanded', 'false')
        sortDropdown.classList.remove("on-display")
    }
}

function handleOptionClick(element, canFetch=false){
    const parentListBox = element.parentElement
    const prevSelectedOption = parentListBox.querySelector('[aria-selected="true"]')

    const dropdownMenu = parentListBox.parentElement
    const sortBtn = document.querySelector(dropdownMenu.getAttribute('aria-describedby'))
    sortBtn.setAttribute('aria-expanded', 'false')
    sortDropdown.classList.remove("on-display")

    if (prevSelectedOption != element){
        prevSelectedOption.setAttribute('aria-selected', 'false')
        element.setAttribute('aria-selected', 'true')
    
        selectedSort.innerHTML = element.innerHTML

        if(canFetch){
            filterFormSmall.querySelector(`input[name="sort-by"][value="${element.value}"]`).checked = true
            // FETCHING AFTER CHOOSING OPTION
            fetchProducts(filterForm)
        }
    }
}

const inStockFilter = document.getElementById("inStockFilter")

filterForm.addEventListener("change", (e) => {
    syncForms(e)
    fetchProducts(filterForm)
})

filterFormSmall.addEventListener("change", (e) => {
    syncForms(e)
})

filterFormSmall.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchProducts(filterFormSmall, false)
})

function syncForms(e){
    const currentForm = e.target.form
    const otherForm = (e.target.form === filterForm) ? filterFormSmall : filterForm

    if(currentForm === filterFormSmall && e.target.name === "sort-by"){
        const dropdownOptionToChange = sortDropdown.firstElementChild.querySelector(`[value="${e.target.value}"]`)
        handleOptionClick(dropdownOptionToChange)
    }
    else{
        otherForm.querySelector(`input[name="${e.target.name}"][value="${e.target.value}"]`).checked = currentForm.querySelector(`input[name="${e.target.name}"][value="${e.target.value}"]`).checked
    }
}

function fetchProducts(formToGet, fromSideBar=true, toPage=null){
    // To change form action, find id="filterForm" in product.ejs
    const formAction = formToGet.getAttribute("action")
    const formData = new FormData(formToGet)
    // console.log(formAction)
    // console.log(selectedSortOption)
    // console.log(new URLSearchParams(formData).toString())

    const filterFormQuery = new URLSearchParams(formData).toString()
    var completeQuery = null
    if(fromSideBar){
        const selectedSortOption = sortDropdown.firstElementChild.querySelector('[aria-selected="true"]').value
        completeQuery =  filterFormQuery + (filterFormQuery === "" ? 'sort-by=' : '&sort-by=') + selectedSortOption
    }
    else{
        completeQuery = filterFormQuery
    }
    if(toPage !== null){
        completeQuery += `&page=${toPage}`
    }

    const fetchURL = formAction + '?' + completeQuery
    // window.history.replaceState({path: fetchURL}, '', fetchURL)
    // console.log(fetchURL) 
    // history.pushState({}, '', fetchURL); 

    // FETCHING DATA
    fetch(fetchURL)
    .then(response => {
        // return response.json()
        return {
            "data": [
                {
                    "id": "1",
                    "name": "Pokémon Card Game Bulbasaur - Vending series 1",
                    "supertype": "Pokémon",
                    "img": "https://images.pokemontcg.io/xy1/1_hires.png",
                    "price": "211.990₫"
                },
                {
                    "id": "2",
                    "name": "Pokémon Card Game Bulbasaur - Vending series 2",
                    "supertype": "Trainer",
                    "img": "https://images.pokemontcg.io/g1/1_hires.png",
                    "price": "221.990₫"
                },
                {
                    "id": "3",
                    "name": "Pokémon Card Game Bulbasaur - Vending series 3",
                    "supertype": "Energy",
                    "img": "https://images.pokemontcg.io/xy1/1_hires.png",
                    "price": "212.990₫"
                },
                {
                    "id": "4",
                    "name": "Pokémon Card Game Bulbasaur - Vending series 4",
                    "supertype": "Pokémon",
                    "img": "https://images.pokemontcg.io/g1/1_hires.png",
                    "price": "233.990₫"
                }
            ],
            "pages": "4"
        } 
    })
    .then(data => {
        showProducts(data.data)
        if(toPage === null){
            resetPagination(data.pages)
        }
    })
}

function showProducts(data){
    productList.innerHTML = data.map((item) => {
        return `
        <div class="d-flex flex-column card-float-in">
            <div class="card-image">
                <img src="${item.img}" alt="Image">
                <a href="/products/detail/${item.id}" class="overlay"></a>
                <a href="#">
                    <button type="button" class="add-btn">+ Quick add</button>
                </a>
            </div>
            <div class="card-info">
                <div class="d-flex flex-column">
                    <a href="/products?supertype=${item.supertype}&sort_by=created-descending" class="card-category">Pokémon</a>
                    <a href="/products/detail/${item.id}">
                        <div class="card-name">${item.name}</div>
                    </a>
                    <div class="card-price">${item.price}</div>
                </div>
            </div>
        </div>`
    }).join('')
    itemsToFloatIn = document.querySelectorAll('.card-float-in')
}

var currentPage = 1
var maxPage = null

function resetPagination(pages){
    prevPageBtn.classList.add("disabled")
    currentPageText.innerHTML = `1&nbsp;&nbsp;/&nbsp;&nbsp;${pages}`
    
    currentPage = 1
    maxPage = parseInt(pages)
    if(currentPage === maxPage){
        nextPageBtn.classList.add("disabled")
    }
    else{
        nextPageBtn.classList.remove("disabled")
    }
}

nextPageBtn.addEventListener("click", (e) => {
    currentPage++
    if(currentPage === maxPage){
        nextPageBtn.classList.add("disabled")
    }
    if(prevPageBtn.classList.contains("disabled")){
        prevPageBtn.classList.remove("disabled")
    }
    currentPageText.innerHTML = `${currentPage}&nbsp;&nbsp;/&nbsp;&nbsp;${maxPage}`
    fetchProducts(filterForm, true, currentPage)
})

prevPageBtn.addEventListener("click", (e) => {
    currentPage--
    if(currentPage === 1){
        prevPageBtn.classList.add("disabled")
    }
    if(nextPageBtn.classList.contains("disabled")){
        nextPageBtn.classList.remove("disabled")
    }
    currentPageText.innerHTML = `${currentPage}&nbsp;&nbsp;/&nbsp;&nbsp;${maxPage}`
    fetchProducts(filterForm, true, currentPage)
})

// FETCH WHEN ENTER PAGE
window.addEventListener("load", (e) => {
    fetchProducts(filterForm)
})