const minusBtns = [...document.querySelectorAll('.minus-btn')]
const plusBtns = [...document.querySelectorAll('.plus-btn')]
const quantityFields = [...document.querySelectorAll('.quantity')]

quantityFields.forEach((item, i) => {
    minusBtns[i].addEventListener('click', () => {
        const value = parseInt(item.value)
        item.value = value - 1 <= 0 ? 1 : value - 1
    })
    plusBtns[i].addEventListener('click', () => {
        const value = parseInt(item.value)
        item.value = value + 1 > 99 ? 99 : value + 1
    })
})