let buttons = document.querySelectorAll(".currency-button");
let buttons2 = document.querySelectorAll(".currency-button2");
let rateRurUsd = document.querySelector('.rateRurUsd');
let insideLoading = document.querySelector('.inside-loading');
let loading = document.querySelector('.loading');
let amountInput = document.querySelector('.amount');
let rurToUsd=document.querySelector('.rateRurUsd');
let rateUsdRur = document.querySelector('.rateUsdRur');
let firstSelect = document.querySelector('.first-select');
let secondSelect = document.querySelector('.second-select');

const showLoading = () => {
    insideLoading.style.display='block';
    loading.style.display='block';
}

const hideLoading = () => {
    insideLoading.style.display='none';
    loading.style.display='none';
}

const toggle = (el) => {
    el.classList.toggle("selected");
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
    //showLoading();
    let currencies = document.querySelectorAll(".selected");
    currenciesArray = Array.from(currencies);
    let base=currenciesArray[0].value;
    let rate=currenciesArray[1].value;
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${base}&symbols=${rate}`);
    let resultData = await result.json();
    console.log(resultData);
    let resultWindow=document.querySelector('.result-amount');
    resultWindow.value=resultData.rates[rate]*amountInput.value;
    rurToUsd.innerText = `1 ${base} = ${resultData.rates[rate].toFixed(4)} ${rate}`;
    let reverseResult = await fetch(`https://api.ratesapi.io/api/latest?base=${rate}&symbols=${base}`);
    let reverseResultData = await reverseResult.json();
    rateUsdRur.innerText = `1  ${rate} = ${reverseResultData.rates[base].toFixed(4)} ${base}`
    //hideLoading();
}

getRateForInput();
getRateForInput2();

buttons.forEach(element => element.addEventListener('click', changeColor));
buttons2.forEach(element => element.addEventListener('click', changeColor1));
firstSelect.addEventListener('change', changeColor);
secondSelect.addEventListener('change', changeColor1);
amountInput.addEventListener('change', getRateForInput);