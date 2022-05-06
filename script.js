'use strict'

const form = document.getElementById('form1')
const radios = form.querySelectorAll('input[type="radio"]')

fetch('https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB&key=ec09480703fac753d097bf2c1335bf33')
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
