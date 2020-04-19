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
let resultWindow=document.querySelector('.result-amount');
let arrows = document.querySelector('.arrows');
console.log(arrows);


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
    let currencies1 = document.querySelectorAll(".selected");
    if (currencies1.length==2){
    getCurrency()}
}

const changeColor1 =(e)=> {
    toggle(e.target);
    let currencies1 = document.querySelectorAll(".selected");
    if (currencies1.length==2){
        getCurrency()}
}

async function getRateForInput(){
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=RUB&symbols=USD`);
    let resultData = await result.json();
    rurToUsd.innerText = `1 RUB = ${resultData.rates.USD.toFixed(4)} USD`;
    resultWindow.value=resultData.rates.USD*amountInput.value;
}

async function getRateForInput2(){
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=USD&symbols=RUB`);
    let resultData = await result.json();
    rateUsdRur.innerText = `1 USD = ${resultData.rates.RUB.toFixed(4)} RUB`
}

async function getCurrency() {
    showLoading();
    try {
    let currencies = document.querySelectorAll(".selected");
    currenciesArray = Array.from(currencies);
    let base=currenciesArray[0].value;
    let rate=currenciesArray[1].value;
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${base}&symbols=${rate}`);
    let resultData = await result.json();
    resultWindow.value=resultData.rates[rate]*amountInput.value;
    rateUsdRur.innerText = `1 ${base} = ${resultData.rates[rate].toFixed(4)} ${rate}`;
    let reverseResult = await fetch(`https://api.ratesapi.io/api/latest?base=${rate}&symbols=${base}`);
    let reverseResultData = await reverseResult.json();
    rurToUsd.innerText = `1  ${rate} = ${reverseResultData.rates[base].toFixed(4)} ${base}`;}
    catch(error){
        alert('Что-то пошло не так');
    }
    hideLoading();
}

async function getCurrencyRight() {
    showLoading();
    try {
    let currencies = document.querySelectorAll(".selected");
    currenciesArray = Array.from(currencies);
    let base=currenciesArray[1].value;
    let rate=currenciesArray[0].value;
    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${base}&symbols=${rate}`);
    let resultData = await result.json();
    amountInput.value=resultData.rates[rate]*resultWindow.value;
    rurToUsd.innerText = `1 ${base} = ${resultData.rates[rate].toFixed(4)} ${rate}`;
    let reverseResult = await fetch(`https://api.ratesapi.io/api/latest?base=${rate}&symbols=${base}`);
    let reverseResultData = await reverseResult.json();
    rateUsdRur.innerText = `1  ${rate} = ${reverseResultData.rates[base].toFixed(4)} ${base}`}
    catch(error){
        alert('Что-то пошло не так');
    }
    hideLoading();
}

async function changeInputs(){
    amountInput.value=resultWindow.value;
    resultWindow.value='';
    let currencies1 = document.querySelectorAll(".selected");
    let result1 = currencies1[0].value;
    let result2 = currencies1[1].value
    currencies1[0].classList.remove('selected');
    currencies1[1].classList.remove('selected');
    console.log(result1);
    console.log(result2);
    buttons.forEach(element => {if(element.value==result2) {
        element.classList.add('selected');
    }});
    buttons2.forEach(element => {if(element.value==result1) {
        element.classList.add('selected');
    }});
    let temporaruText=rurToUsd.innerText;
    rurToUsd.innerText=rateUsdRur.innerText;
    rateUsdRur.innerText=temporaruText;
    getCurrency();
}

getRateForInput();
getRateForInput2();

buttons.forEach(element => element.addEventListener('click', changeColor));
buttons2.forEach(element => element.addEventListener('click', changeColor1));
firstSelect.addEventListener('change', changeColor);
secondSelect.addEventListener('change', changeColor1);
amountInput.addEventListener('change', getRateForInput);
resultWindow.addEventListener('change', getCurrencyRight);
arrows.addEventListener('click', changeInputs)