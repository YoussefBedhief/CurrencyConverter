import React from 'react'

function CurrencyElement(props) {
const {
    classStyle,
    currencyOption,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
} = props

return(
    <div className={classStyle}>
    <input className="inputCurrency" type="number" value={amount} onChange={onChangeAmount}/>
    <select value={selectedCurrency} onChange={onChangeCurrency}>
        { currencyOption.map( option =>(
            <option key={option} value={option}>{option}</option>
        )) }
    </select>
    </div>

)

}

export default CurrencyElement
