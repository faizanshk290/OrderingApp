import { menuArray } from '/data.js'

let sumPrice = 0
let itemListLength = 0

const formEl = document.getElementById('card-details-form')
const orderContainerEl = document.getElementById('order-container')
const modalContainerEl = document.getElementById("modal")
const thanksContainerEl = document.getElementById('thanks-container')

document.addEventListener("click", (e) => {
    if (e.target.dataset.item) {
        handleAddClick(e.target.dataset.item)
    }
    else if (e.target.id === 'order-btn') {
        handleOrderClick()
    }
    else if (e.target.id === 'remove-btn') {
        handleRemoveClick(document.getElementById(e.target.id).parentElement)
    }
})

function handleRemoveClick(targetElement) {
    let numberString = targetElement.children[2].innerText
    targetElement.remove()
    itemListLength -= 1
    sumPrice -= Number(numberString.substring(1))
    if (itemListLength == 0) {
        orderContainerEl.classList.toggle('hidden')
    }
    document.getElementById('total-price').innerText = `$${sumPrice}`
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(formEl)

    modalContainerEl.style.display = 'none'

    orderContainerEl.classList.toggle('hidden')

    thanksContainerEl.style.display = 'block'

    thanksContainerEl.innerText = `Thanks, ${formData.get('fullname')}! Your order is on its way!
    `
    formEl.reset();

    document.getElementById('order-inner').innerHTML = ''

    sumPrice = 0
})

function handleOrderClick() {
    const modalContainerEl = document.getElementById("modal")
    modalContainerEl.style.display = "flex"
}

function handleAddClick(itemId) {
    const itemObject = menuArray.filter(function (item) {
        return item.id == itemId
    })[0]

    sumPrice += itemObject.price

    orderContainerEl.classList.remove('hidden')

    thanksContainerEl.style.display = 'none'

    itemListLength += 1

    document.getElementById('order-inner').innerHTML += getOrderHtmlString(itemObject)

    document.getElementById('total-price').innerText = `$${sumPrice}`
}

function getOrderHtmlString(itemObject) {
    let orderHtmlString = ''
    orderHtmlString +=
        `
        <div class="order">
            <p class="item-name">${itemObject.name}</p>
            <button id="remove-btn" class="remove-btn">remove</button>
            <p class="item-price move-right">$${itemObject.price}</p>
        </div>
    `
    return orderHtmlString
}


function render() {
    const menuContainerEl = document.getElementById("menu-container")
    menuContainerEl.innerHTML = getMenuHtmlString()
}

render()

function getMenuHtmlString() {
    let menuHtmlString = ''
    menuArray.forEach((item) => {
        menuHtmlString +=
            `
            <div class="menu-inner">
                <img src="${item.emoji}">
                <div>
                    <p class="item-name menu-para">${item.name}</p>
                    <p class="item-ingredients menu-para">${item.ingredients}</p>
                    <p class="item-price menu-para">$${item.price}</p>
                </div>
                <button id="add-btn" class="add-btn" data-item="${item.id}">+</button>
            </div>
        `
    })
    return menuHtmlString
}