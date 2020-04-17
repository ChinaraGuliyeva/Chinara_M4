let buttons = document.querySelectorAll(".currency-button");
let buttons2 = document.querySelectorAll(".currency-button2");
let rateRurUsd = document.querySelector('.rateRurUsd');
let insideLoading = document.querySelector('.inside-loading');
let loading = document.querySelector('.loading');
let amountInput = document.querySelector('.amount');

const showLoading = () => {
    insideLoading.style.display='block';
    loading.style.display='block';
}

const hideLoading = () => {
    insideLoading.style.display='none';
    loading.style.display='none';
}

async function getCurrency(currency) {
    showLoading();
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${currency}`);
    let resultData = await result.json();
    hideLoading();
    return resultData;
}

const currensyHandler = (e) =>{
    toggle(e.target);
    console.log(e.target.value);
    getCurrency(e.target.value);
    console.log(getCurrency(e.target.value));
   //console.log(updateValue(e));

}

//asynch?
const currencyCalculator = (e) => {
    toggle(e.target);
    console.log(e.target.value);
}

const toggle = (el) => {
    el.style.backgroundColor = (el.style.backgroundColor == 'white') ? '#833AE0' : 'white'
  }

let updateValue =(e)=>{
    return e.target.value;
}

buttons.forEach(element => element.addEventListener('click', currensyHandler));
buttons2.forEach(element => element.addEventListener('click', currencyCalculator));
amountInput.addEventListener('change', updateValue);

