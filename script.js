'use strict'

const form = document.getElementById('form1')
const radios = form.querySelectorAll('input[type="radio"]')
const inputs = form.querySelectorAll('input[type="text"]')
const labelInputs = form.querySelectorAll('.label-inputs')
const changeBtn = form.querySelector('.change-direction')
const inputBoxes = form.querySelectorAll('.input-box')

const getData = async (from, to, amount) => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "1RLtjd9b9mwo7XH9kYH630LFaHByCNUW");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    try {
        const targetUrl = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`
        const response = await fetch(targetUrl, requestOptions)

        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}

// const clearInputs = () => {
//     inputs.forEach(input => {
//         input.value = ''
//     })
// }

radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
        labelInputs.forEach((label) => {
            if (label.closest('.money')) {
                if (e.target.value === 'eur') {
                    label.textContent = 'Евро, EUR'
                } else if (e.target.value === 'usd') {
                    label.textContent = 'Доллар, USD'
                }
            }
        })

    })
})

changeBtn.addEventListener('click', (e) => {
    e.preventDefault()

    inputBoxes.forEach((item) => {
        item.classList.toggle('money')
    })
    const textLabel = labelInputs[0].textContent
    labelInputs[0].textContent = labelInputs[1].textContent
    labelInputs[1].textContent = textLabel
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const amount = form.querySelector('input[name="first"]').value
    let from, to
    if (!inputBoxes[0].classList.contains('money')) {
        from = 'rub'
        if (radios[0].checked === true) {
            to = 'usd'
        } else {
            to = 'eur'
        }
    } else {
        to = 'rub'
        if (radios[0].checked === true) {
            from = 'usd'
        } else {
            from = 'eur'
        }
    }

    getData(from, to, amount)
    .then(data => {
        inputs[1].value = data.result.toFixed(2)
    })
    .catch(error => console.log(error.message))
})


