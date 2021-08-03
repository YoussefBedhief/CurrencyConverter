import React, { useEffect, useState } from 'react';
import '../Styles/App.css';
import CurrencyElement from './CurrencyElement';
import currency from '../images/currency.png'

const API_Key = '9d503a451ad4fbc8bd46bda175f4a24b'
const URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_Key}`

function App() {
  const [fromCurrencyOption, setFromCurerncyOption] = useState([])
  const [currencyOption, setCurerncyOption] = useState([])
  const [exchangeRate, setExchangeRate] = useState()
  const [fromCurrency, setFromCurerncy] = useState()
  const [toCurrency, setToCurerncy] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount

  if (amountInFromCurrency) {

    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  // ERROR HANDLING FUNCTION FOR `fetch()` CALLS
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  useEffect(() => {
    fetch(URL)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        const base = data.base
        const firstCurrency = Object.keys(data.rates)[0]
        const result = [...Object.keys(data.rates)].filter(function (x) {
          return x !== base;
        });
        setFromCurerncyOption([data.base])
        setCurerncyOption([data.base, ...result])
        setFromCurerncy(data.base)
        setToCurerncy(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect((e) => {
    if (fromCurrency != null && toCurrency != null)
      fetch(`${URL}&base=${fromCurrency}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates[toCurrency]))
      .catch(function (error) {
        console.log(error);
      });
  
        }, [fromCurrency, toCurrency])

    function handleOnChangeFromCurerncy(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
    }
    function handleOnChangeToCurerncy(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
    }


    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();

    const date = today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();



    return (
      <div className="card">
        <div className="date">{date}
          <img src={currency} className="logo" alt="Logo" />
        </div>
        <h1>Currency</h1>
        <div className="highCurrency">
          <CurrencyElement classStyle="toCurrency" currencyOption={fromCurrencyOption} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurerncy(e.target.value)} amount={Math.round(fromAmount * 10000) / 10000} onChangeAmount={handleOnChangeFromCurerncy} />
        </div>
        <div className="equal"> <i class="fas fa-search-dollar"></i> </div>
        <div className="lowCurrency">
          <CurrencyElement classStyle="fromCurrency" currencyOption={currencyOption} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurerncy(e.target.value)} amount={Math.round(toAmount * 10000) / 10000} onChangeAmount={handleOnChangeToCurerncy} />
        </div>

      </div>



    );
  }

export default App;
