let buttons = document.querySelectorAll(".currency-button");
let buttons2 = document.querySelectorAll(".currency-button2");
let rateRurUsd = document.querySelector('.rateRurUsd');
let insideLoading = document.querySelector('.inside-loading');
let loading = document.querySelector('.loading');
let amountInput = document.querySelector('.amount');

let currensyHandler = (e) =>{
    e.target.style.backgroundColor = '#833AE0';
    console.log(e.target.value);
    getCurrency(e.target.value);
    console.log(getCurrency(e.target.value));
}

async function getCurrency(currency) {
    showLoading();
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${currency}`);
    let resultData = await result.json();
    hideLoading();
    return resultData;
}

const showLoading = () => {
    insideLoading.style.display='block';
    loading.style.display='block';
}

const hideLoading = () => {
    insideLoading.style.display='none';
    loading.style.display='none';
}

getCurrency('USD');

buttons.forEach(element => element.addEventListener('click', currensyHandler));

