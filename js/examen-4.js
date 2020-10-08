import cars from './cars.js'

const cardsCars = document.getElementById('card-cars')
const formSearch = document.getElementById('form-search')
const formCar = document.getElementById('form-car')
const esCurrencyFormat = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'COP'})
let editingCar = ''
let idOld
let idEdit = false
let booleanoCard
let disabledFalse
let disabledTrue


// Creando una funcion con la card universal
function returnCard(car) {
    let cardCarsDescription = `<div class="card mb-5" style="width: 18rem;">
                                    <img src="https://i.imgur.com/mAnQEPU.jpg" class="card-img-top" alt="...">
                                    <div class="card-body position-relative">
                                        <h5 class="card-title d-flex">Brand: 
                                            <input type="text" class="bg-transparent border-0 outline-input ml-2 height-width-input" id="brand${car.id}" value="${car.Marca}" disabled>
                                        </h5>
                                        <h5 class="card-title d-flex">Model: 
                                            <input type="text" class="bg-transparent border-0 outline-input ml-2 height-width-input" id="model${car.id}" value="${car.Modelo}" disabled>
                                        </h5>
                                        <h5 class="card-title d-flex">Colour: 
                                            <input type="text" class="bg-transparent border-0 outline-input ml-2 height-width-input" id="colour${car.id}" value="${car.Color}" disabled>
                                        </h5>
                                        <h5 class="card-title d-flex">Age: 
                                            <input type="number" class="bg-transparent border-0 outline-input ml-2 height-width-input" id="age${car.id}" value=${car.Age} disabled>
                                        </h5>
                                        <h5 class="card-title d-flex">Price:
                                            <input type="text" class="bg-transparent border-0 outline-input ml-2 height-width-input" id="price${car.id}" value="$${esCurrencyFormat.format(car.Precio)}" disabled>
                                        </h5>
                                        <div id="buttonsOptionEdit${car.id}" class="d-none">
                                            <button onclick="editCar(${car.id})" id="buttonConfirmEdit${car.id}" type="button" class="btn btn-primary">Edit</button>
                                            <button onclick="cancelEditCar(${car.id})" id="buttonCancelEdit${car.id}" type="button" class="btn btn-primary">Cancel</button>
                                        </div>
                                        <a href="#" class="btn position-absolute absolute-top absolute-right">
                                            <span onclick="changeListGroup(${car.id})">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>
                                            </span>
                                            <div id="options-edit-remove${car.id}" class="list-group position-absolute invisible">
                                                <button onclick="buttonEditCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-top cursor-pointer">
                                                    Editar
                                                </button>
                                                <button onclick="removeCar(${car.id})" type="button" onclick="" class="list-group-item btn-outline-primary list-group-item-action active rounded-bottom cursor-pointer">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>`

    return cardCarsDescription;
}

// Creando una funcion con los false y true de los resultados de los buscadores
function booleanoPrintCard() {
    booleanoCard = [
        {AllCars: false},
        {CarsBrand: false},
        {CarsModel: false},
        {CarsColour: false},
        {CarsAge: false},
        {CarsPrice: false}
    ]
    return booleanoCard
}

function conditionalPrintCars() {
    let returnConditionalPrintCars
    switch(true) {
        case booleanoCard.AllCars:
            returnConditionalPrintCars = allCars()
            break
        case booleanoCard.CarsBrand:
            returnConditionalPrintCars = carsBrand()
            break
        case booleanoCard.CarsModel:
            returnConditionalPrintCars = carsModel()
            break
        case booleanoCard.CarsColour:
            returnConditionalPrintCars = carsColour()
            break
        case booleanoCard.CarsAge:
            returnConditionalPrintCars = carsAge()
            break
        case booleanoCard.CarsPrice:
            returnConditionalPrintCars = carsPrice()
            break
    }
    // 
    // if(booleanoCard.AllCars) {
    //     returnConditionalPrintCars = allCars()
    // } else if(booleanoCard.CarsBrand) {
    //     returnConditionalPrintCars = carsBrand()
    // } else if(booleanoCard.CarsModel) {
    //     returnConditionalPrintCars = carsModel()
    // } else if(booleanoCard.CarsColour) {
    //     returnConditionalPrintCars = carsColour()
    // } else if(booleanoCard.CarsAge) {
    //     returnConditionalPrintCars = carsAge()
    // } else if(booleanoCard.CarsPrice) {
    //     returnConditionalPrintCars = carsPrice()
    // }
    return returnConditionalPrintCars
}


// Agregando los disabled en dos funciones una de false y otra de true
function inputDisabledFalse(id) {
    disabledFalse = [
        {Brand: document.getElementById(`brand${id}`).disabled = false},
        {Model: document.getElementById(`model${id}`).disabled = false},
        {Colour: document.getElementById(`colour${id}`).disabled = false},
        {Age: document.getElementById(`age${id}`).disabled = false},
        {Price: document.getElementById(`price${id}`).disabled = false},
    ]
    return disabledFalse
}

function inputDisabledTrue(id) {
    disabledTrue = [
    {Brand: document.getElementById(`brand${id}`).disabled = true},
    {Model: document.getElementById(`model${id}`).disabled = true},
    {Colour: document.getElementById(`colour${id}`).disabled = true},
    {Age: document.getElementById(`age${id}`).disabled = true},
    {Price: document.getElementById(`price${id}`).disabled = true},
    ]
    return disabledTrue
}


// Agregar y quitar clases de CSS
function changeListGroup(id) {
    let optionsEditRemove = ''
    const closedMenus = document.getElementsByClassName('visible')
    if(closedMenus.length) {
        closedMenus[0].classList.remove('visible')
    }
    optionsEditRemove = document.getElementById(`options-edit-remove${id}`)
    optionsEditRemove.classList.toggle('visible')
    if(idOld === id) {
        closedMenus[0].classList.remove('visible')
        idOld = id - 1
    } else { 
        idOld = id
    }
}

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
    cars.forEach((car) =>{
        if(car.id === newCar.id) {
            cardsCars.innerHTML =  returnCard(car)
        }
    })
    formCar.innerHTML = ''
}

// Editando cars
function buttonEditCar(id) {
    formCar.innerHTML = ''
    if(idEdit && (idEdit != id)) {
        const idOldEdit = idEdit
        if(idOldEdit === id) {
            inputDisabledTrue(idOldEdit)
        }
    }
    conditionalPrintCars()
    const closedButtonConfirmEdit = document.getElementsByClassName('d-inline-block')
    if(closedButtonConfirmEdit.length) {
        closedButtonConfirmEdit[0].classList.remove('d-inline-block')
    }
    inputDisabledFalse(id)

    let buttonsOptionEdit = document.getElementById(`buttonsOptionEdit${id}`)
    buttonsOptionEdit.classList.toggle('d-inline-block')
    idEdit = id
    const closedMenus = document.getElementsByClassName('visible')
    if(closedMenus.length) {
        closedMenus[0].classList.remove('visible')
    }
    const carsEdit = cars.find((car) => car.id === id) 
    editingCar = carsEdit 
}

function editCar(id) {
    const number = 1000000
    const PriceCurrency = document.getElementById(`price${id}`).value
    const convertPriceCurrency = PriceCurrency.replace('$', '0').replace('.000.000,00', '000000').replace('COP', '')
    editingCar.Marca = document.getElementById(`brand${id}`).value
    editingCar.Modelo = document.getElementById(`model${id}`).value
    editingCar.Color = document.getElementById(`colour${id}`).value
    editingCar.Age = document.getElementById(`age${id}`).value
    editingCar.Precio = parseInt(esCurrencyFormat.format(convertPriceCurrency)) * number
    conditionalPrintCars()
    inputDisabledTrue(id)

    const closedButtonConfirmEdit = document.getElementsByClassName('d-inline-block')
    if(closedButtonConfirmEdit.length) {
        closedButtonConfirmEdit[0].classList.remove('d-inline-block')
    }
}

function cancelEditCar(id) {
    inputDisabledTrue(id)
    const closedButtonCancelEdit = document.getElementsByClassName('d-inline-block')
    if(closedButtonCancelEdit.length) {
        closedButtonCancelEdit[0].classList.remove('d-inline-block')
    }
    conditionalPrintCars()
}

// Remover Carro
function removeCar(id) {
    const position = cars.findIndex((car) => car.id === id)
    cars.splice(position, 1)
    conditionalPrintCars()
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


//   Mostrar todos
function allCars() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.AllCars = true
    let cardCarsFinal = ''
    cars.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}

// Mostrar filtrando Marcas
function carsBrand() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.CarsBrand = true
    let cardCarsFinal = ''
    const filterCarMarca = cars.filter((car) => car.Marca.toUpperCase() === document.getElementById('brand').value.toUpperCase())
    filterCarMarca.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}

// Mostrar filtrando Modelo
function carsModel() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.CarsModel = true
    let cardCarsFinal = ''
    const filterCarModelo = cars.filter((car) => car.Modelo.toUpperCase() === document.getElementById('model').value.toUpperCase())
    filterCarModelo.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}

// Mostrar filtrando Color
function carsColour() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.CarsColour = true
    let cardCarsFinal = ''
    const filterCarAge = cars.filter((car) => car.Color.toUpperCase() === document.getElementById('colour').value.toUpperCase())
    filterCarAge.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}


// Mostrar filtrando Age
function carsAge() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.CarsAge = true
    let cardCarsFinal = ''
    const filterCarAge = cars.filter((car) => car.Age >= document.getElementById('minimum-age').value && car.Age <= document.getElementById('maximum-age').value)
    filterCarAge.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}


// Mostrar filtrando Age
function carsPrice() {
    cardsCars.innerHTML = ''
    booleanoPrintCard()
    booleanoCard.CarsPrice = true
    let cardCarsFinal = ''
    const filterCarPrice = cars.filter((car) => car.Precio >= document.getElementById('minimum-price').value && car.Precio <= document.getElementById('maximum-price').value)
    filterCarPrice.forEach((car) => {
        cardCarsFinal += returnCard(car)
    })
    cardsCars.innerHTML = cardCarsFinal
}




window.booleanoPrintCard = booleanoPrintCard
window.inputDisabledTrue = inputDisabledTrue
window. inputDisabledFalse = inputDisabledFalse
window.formAddCar = formAddCar
window.addCar = addCar
window.buttonEditCar = buttonEditCar
window.editCar = editCar
window.cancelEditCar = cancelEditCar
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
window.conditionalPrintCars = conditionalPrintCars