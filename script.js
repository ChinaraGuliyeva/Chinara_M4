let buttons = document.querySelectorAll(".currency-button");
let buttons2 = document.querySelectorAll(".currency-button2");
let rateRurUsd = document.querySelector('.rateRurUsd');
let insideLoading = document.querySelector('.inside-loading');
let loading = document.querySelector('.loading');
let amountInput = document.querySelector('.amount');
let rurToUsd=document.querySelector('.rateRurUsd');
let rateUsdRur = document.querySelector('.rateUsdRur');
let firstSelect = document.querySelector('.first-select');

const showLoading = () => {
    insideLoading.style.display='block';
    loading.style.display='block';
}

const hideLoading = () => {
    insideLoading.style.display='none';
    loading.style.display='none';
}

const changeColor =(e)=> {
    toggle(e.target);
}

const changeColor1 =(e)=> {
    toggle(e.target);
    getCurrency();
}

async function getRateForInput(){
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=RUB&symbols=USD`);
    let resultData = await result.json();
    rurToUsd.innerText = `1 RUB = ${resultData.rates.USD.toFixed(4)} USD`
}

async function getRateForInput2(){
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=USD&symbols=RUB`);
    let resultData = await result.json();
    rateUsdRur.innerText = `1 USD = ${resultData.rates.RUB.toFixed(4)} RUB`
}

async function getCurrency() {
    let currencies = document.querySelectorAll(".selected");
    currenciesArray = Array.from(currencies);
    let base=currenciesArray[0].value;
    let rate=currenciesArray[1].value;
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${base}&symbols=${rate}`);
    let resultData = await result.json();
    let resultWindow=document.querySelector('.result-amount');
    console.log(resultWindow.value);
    if (rate=="RUB"){
        resultWindow.value=resultData.rates.RUB*amountInput.value;
    }
    if (rate=="USD"){
        resultWindow.value=resultData.rates.USD*amountInput.value;
    }
    if (rate=="EUR"){
        resultWindow.value=resultData.rates.EUR*amountInput.value;
    }
    if (rate=="GBP"){
        resultWindow.value=resultData.rates.GBP*amountInput.value;
    }
    console.log(resultData.rates);
}

const toggle = (el) => {
    el.classList.toggle("selected");
}

let updateValue =()=>{
    console.log(amountInput.value);
}

getRateForInput();
getRateForInput2();

buttons.forEach(element => element.addEventListener('click', changeColor));
buttons2.forEach(element => element.addEventListener('click', changeColor1));
amountInput.addEventListener('change', updateValue);
firstSelect.addEventListener('change', changeColor);
