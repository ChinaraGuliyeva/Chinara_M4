/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let buttons = document.querySelectorAll(\".currency-button\");\r\nlet buttons2 = document.querySelectorAll(\".currency-button2\");\r\nlet rateRurUsd = document.querySelector('.rateRurUsd');\r\nlet insideLoading = document.querySelector('.inside-loading');\r\nlet loading = document.querySelector('.loading');\r\nlet amountInput = document.querySelector('.amount');\r\nlet rurToUsd=document.querySelector('.rateRurUsd');\r\nlet rateUsdRur = document.querySelector('.rateUsdRur');\r\nlet firstSelect = document.querySelector('.first-select');\r\n\r\nconst showLoading = () => {\r\n    insideLoading.style.display='block';\r\n    loading.style.display='block';\r\n}\r\n\r\nconst hideLoading = () => {\r\n    insideLoading.style.display='none';\r\n    loading.style.display='none';\r\n}\r\n\r\nconst changeColor =(e)=> {\r\n    toggle(e.target);\r\n}\r\n\r\nconst changeColor1 =(e)=> {\r\n    toggle(e.target);\r\n    getCurrency();\r\n}\r\n\r\nasync function getRateForInput(){\r\n    let result = await fetch(`https://api.ratesapi.io/api/latest?base=RUB&symbols=USD`);\r\n    let resultData = await result.json();\r\n    rurToUsd.innerText = `1 RUB = ${resultData.rates.USD.toFixed(4)} USD`\r\n}\r\n\r\nasync function getRateForInput2(){\r\n    let result = await fetch(`https://api.ratesapi.io/api/latest?base=USD&symbols=RUB`);\r\n    let resultData = await result.json();\r\n    rateUsdRur.innerText = `1 USD = ${resultData.rates.RUB.toFixed(4)} RUB`\r\n}\r\n\r\nasync function getCurrency() {\r\n    let currencies = document.querySelectorAll(\".selected\");\r\n    currenciesArray = Array.from(currencies);\r\n    let base=currenciesArray[0].value;\r\n    let rate=currenciesArray[1].value;\r\n    let result = await fetch(`https://api.ratesapi.io/api/latest?base=${base}&symbols=${rate}`);\r\n    let resultData = await result.json();\r\n    let resultWindow=document.querySelector('.result-amount');\r\n    console.log(resultWindow.value);\r\n    if (rate==\"RUB\"){\r\n        resultWindow.value=resultData.rates.RUB*amountInput.value;\r\n    }\r\n    if (rate==\"USD\"){\r\n        resultWindow.value=resultData.rates.USD*amountInput.value;\r\n    }\r\n    if (rate==\"EUR\"){\r\n        resultWindow.value=resultData.rates.EUR*amountInput.value;\r\n    }\r\n    if (rate==\"GBP\"){\r\n        resultWindow.value=resultData.rates.GBP*amountInput.value;\r\n    }\r\n    console.log(resultData.rates);\r\n}\r\n\r\nconst toggle = (el) => {\r\n    el.classList.toggle(\"selected\");\r\n}\r\n\r\nlet updateValue =()=>{\r\n    console.log(amountInput.value);\r\n}\r\n\r\ngetRateForInput();\r\ngetRateForInput2();\r\n\r\nbuttons.forEach(element => element.addEventListener('click', changeColor));\r\nbuttons2.forEach(element => element.addEventListener('click', changeColor1));\r\namountInput.addEventListener('change', updateValue);\r\nfirstSelect.addEventListener('change', changeColor);\r\n\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });