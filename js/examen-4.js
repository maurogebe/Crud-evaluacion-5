import cars from './cars.js'

const cardsCars = document.getElementById('card-cars')
const formSearch = document.getElementById('form-search')
const formCar = document.getElementById('form-car')
const esCurrencyFormat = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'COP'})
let cardsAllCars = false
let cardsCarsBrand = false
let cardsCarsModel = false
let cardsCarsColour = false
let cardsCarsAge = false
let cardsCarsPrice = false
let editingCar = ''

// Agregar y quitar clases de CSS
function changeListGroup(id) {
    let optionsEditRemove = ''
    const closedMenus = document.getElementsByClassName('visible')
    if(closedMenus.length) {
        closedMenus[0].classList.remove('visible')
    }
    optionsEditRemove = document.getElementById(`options-edit-remove${id}`)
    optionsEditRemove.classList.toggle('visible')
}

// 



// Add Car
function formAddCar() {
    formSearch.innerHTML = ''
    cardsCars.innerHTML = ''
    formCar.innerHTML = `<form onsubmit="event.preventDefault(), addCar()" action="/cars">
                            <div class="form-group">
                            <label for="brand">Brand</label>
                            <input type="text" class="form-control mb-2" id="brand" placeholder="Brand">
                            <label for="model">Model</label>
                            <input type="text" class="form-control mb-2" id="model" placeholder="Model">
                            <label for="colour">Colour</label>
                            <input type="text" class="form-control mb-2" id="colour" placeholder="Colour">
                            <label for="age">Age</label>
                            <input type="text" class="form-control mb-2" id="age" placeholder="Age">
                            <label for="price">Price</label>
                            <input type="text" class="form-control mb-2" id="price" placeholder="Price">
                            <button type="submit" class="btn btn-primary mt-4">Add</button>
                        </form>`
}

function addCar() {
    const brand = document.getElementById('brand').value
    const model = document.getElementById('model').value
    const colour = document.getElementById('colour').value
    const age = document.getElementById('age').value
    const price = document.getElementById('price').value
    const newCar = {
        id: cars.length,
        Marca: brand,
        Modelo: model,
        Color: colour,
        Age: age,
        Precio: price
    }
    cars.push(newCar)
    cardsCars.innerHTML =  `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${newCar.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${newCar.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${newCar.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${newCar.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(newCar.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${newCar.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${newCar.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${newCar.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
}

// Editando cars
function formEditCar(id) {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    const carsEdit = cars.find((car) => car.id === id)
    formCar.innerHTML = `<form onsubmit="event.preventDefault(), editCar(${carsEdit.id})" action="/cars">
                            <div class="form-group">
                            <label for="brand">Brand</label>
                            <input type="text" class="form-control mb-2" id="brand" placeholder="Brand" value="${carsEdit.Marca}">
                            <label for="model">Model</label>
                            <input type="text" class="form-control mb-2" id="model" placeholder="Model" value="${carsEdit.Modelo}">
                            <label for="colour">Colour</label>
                            <input type="text" class="form-control mb-2" id="colour" placeholder="Colour" value="${carsEdit.Color}">
                            <label for="age">Age</label>
                            <input type="text" class="form-control mb-2" id="age" placeholder="Age" value="${carsEdit.Age}">
                            <label for="price">Price</label>
                            <input type="text" class="form-control mb-2" id="price" placeholder="Price" value="${carsEdit.Precio}">
                            <button type="submit" class="btn btn-primary mt-4">Edit</button>
                        </form>`  
    editingCar = carsEdit 
}

function editCar(id) {
    editingCar.Marca = document.getElementById('brand').value
    editingCar.Modelo = document.getElementById('model').value
    editingCar.Color = document.getElementById('colour').value
    editingCar.Age = document.getElementById('age').value
    editingCar.Precio = document.getElementById('price').value
    if(cardsAllCars) {
        allCars()
    } else if(cardsCarsBrand) {
        carsBrand()
    } else if(cardsCarsModel) {
        carsModel()
    } else if(cardsCarsColour) {
        carsColour()
    } else if(cardsCarsAge) {
        carsAge()
    } else if(cardsCarsPrice) {
        carsPrice()
    }
}

// Remover Carro
function removeCar(id) {
    const position = cars.findIndex((car) => car.id === id)
    cars.splice(position, 1)
    if(cardsAllCars) {
        allCars()
    } else if(cardsCarsBrand) {
        carsBrand()
    } else if(cardsCarsModel) {
        carsModel()
    } else if(cardsCarsColour) {
        carsColour()
    } else if(cardsCarsAge) {
        carsAge()
    } else if(cardsCarsPrice) {
        carsPrice()
    }
}

// mandando llamar los forms desde los checkbox
function formSearchBrand() {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    let form = `<form onsubmit="event.preventDefault(), carsBrand()" action="/cars">
                    <div class="form-group">
                    <label for="brand">Search</label>
                    <input type="text" class="form-control" id="brand" placeholder="Brand">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`
    formSearch.innerHTML = form
}


function formSearchModel() {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    let form = `<form onsubmit="event.preventDefault(), carsModel()" action="/cars">
                    <div class="form-group">
                    <label for="model">Search</label>
                    <input type="text" class="form-control" id="model" placeholder="Model">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`
    formSearch.innerHTML = form
}


function formSearchColour() {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    let form = `<form onsubmit="event.preventDefault(), carsColour()" action="/cars">
                    <div class="form-group">
                    <label for="colour">Search</label>
                    <input type="text" class="form-control" id="colour" placeholder="Colour">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`
    formSearch.innerHTML = form
}


function formSearchAge() {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    let form = `<form onsubmit="event.preventDefault(), carsAge()" action="/cars">
                    <div class="form-group">
                    <label for="minimum-age">Desde</label>
                    <input type="number" class="form-control" id="minimum-age" placeholder="Minimal Age">
                    <label for="maximum-age">Hasta</label>
                    <input type="number" class="form-control" id="maximum-age" placeholder="Maximum Age">
                    </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`
    formSearch.innerHTML = form
}


function formSearchPrice() {
    formSearch.innerHTML = ''
    formCar.innerHTML = ''
    let form = `<form onsubmit="event.preventDefault(), carsPrice()" action="/cars">
                    <div class="form-group">
                    <label for="minimum-price">Desde</label>
                    <input type="number" class="form-control" id="minimum-price" placeholder="Minimal Price">
                    <label for="maximum-price">Hasta</label>
                    <input type="number" class="form-control" id="maximum-price" placeholder="Maximum Price">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`
    formSearch.innerHTML = form
}


// Condicional de busqueda
// function searchConditional() {
//     cars.find((car) => {
//         if(car.Marca === ) {

//         }
//     })
// }


//   Mostrar todos
function allCars() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = true
    cardsCarsBrand = false
    cardsCarsModel = false
    cardsCarsColour = false
    cardsCarsAge = false
    cardsCarsPrice = false
    cars.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
    
}

// Mostrar filtrando Marcas
function carsBrand() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = false
    cardsCarsBrand = true
    cardsCarsModel = false
    cardsCarsColour = false
    cardsCarsAge = false
    cardsCarsPrice = false
    const filterCarMarca = cars.filter((car) => car.Marca.toUpperCase() === document.getElementById('brand').value.toUpperCase())
    filterCarMarca.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
}

// Mostrar filtrando Modelo
function carsModel() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = false
    cardsCarsBrand = false
    cardsCarsModel = true
    cardsCarsColour = false
    cardsCarsAge = false
    cardsCarsPrice = false
    const filterCarModelo = cars.filter((car) => car.Modelo.toUpperCase() === document.getElementById('model').value.toUpperCase())
    filterCarModelo.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
}

// Mostrar filtrando Color
function carsColour() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = false
    cardsCarsBrand = false
    cardsCarsModel = false
    cardsCarsColour = true
    cardsCarsAge = false
    cardsCarsPrice = false
    const filterCarAge = cars.filter((car) => car.Color.toUpperCase() === document.getElementById('colour').value.toUpperCase())
    filterCarAge.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
}


// Mostrar filtrando Age
function carsAge() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = false
    cardsCarsBrand = false
    cardsCarsModel = false
    cardsCarsColour = false
    cardsCarsAge = true
    cardsCarsPrice = false
    const filterCarAge = cars.filter((car) => car.Age >= document.getElementById('minimum-age').value && car.Age <= document.getElementById('maximum-age').value)
    filterCarAge.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
}


// Mostrar filtrando Age
function carsPrice() {
    cardsCars.innerHTML = ''
    let carsDescription = ''
    cardsAllCars = false
    cardsCarsBrand = false
    cardsCarsModel = false
    cardsCarsColour = false
    cardsCarsAge = false
    cardsCarsPrice = true
    const filterCarPrice = cars.filter((car) => car.Precio >= document.getElementById('minimum-price').value && car.Precio <= document.getElementById('maximum-price').value)
    filterCarPrice.forEach((car) => {
        carsDescription += `<div class="card mb-5" style="width: 18rem;">
                                <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                <div class="card-body position-relative">
                                    <h5 class="card-title d-flex">Brand: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Marca}">
                                    </h5>
                                    <h5 class="card-title d-flex">Model: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Modelo}">
                                    </h5>
                                    <h5 class="card-title d-flex">Colour: 
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="${car.Color}">
                                    </h5>
                                    <h5 class="card-title d-flex">Age: 
                                        <input type="number" class="bg-transparent border-0 pl-2" disabled="disabled" value=${car.Age}>
                                    </h5>
                                    <h5 class="card-title d-flex">Price:
                                        <input type="text" class="bg-transparent border-0 pl-2" disabled="disabled" value="$${esCurrencyFormat.format(car.Precio)}">
                                    </h5>
                                    <a href="#" class="btn position-absolute absolute-top absolute-right">
                                        <span onclick="changeListGroup(${car.id})">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="formEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top pointer-event">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom pointer-event">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>`
    })
    cardsCars.innerHTML = carsDescription
}




window.formAddCar = formAddCar
window.addCar = addCar
window.formEditCar = formEditCar
window.editCar = editCar
window.removeCar = removeCar
window.formSearchBrand = formSearchBrand
window.formSearchModel = formSearchModel
window.formSearchColour = formSearchColour
window.formSearchAge = formSearchAge
window.formSearchPrice = formSearchPrice
window.changeListGroup = changeListGroup
window.allCars = allCars
window.carsBrand = carsBrand
window.carsModel = carsModel
window.carsColour = carsColour
window.carsAge = carsAge
window.carsPrice = carsPrice