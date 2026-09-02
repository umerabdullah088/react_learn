
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [converted, setConverted] = useState("");
  const [currencey, setCurrency] = useState({})
  useEffect(() => {
    const getCurrencies = () => {

      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json?utm_source=chatgpt.com`).then((response) => response.json()).then((data) => {
        setCurrency(data);
      })
    }

    getCurrencies();
  }, [])

  const currenceyConverter = () => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`).then((promise) => promise.json()).then((data) => {
      setConverted(amount * data[from][to]);
    })
  }

  const swapThings = () => {
    setAmount(converted);
    setConverted(amount);
  }
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-2xl bg-blue-950/60 backdrop-blur-md border border-blue-800/40 shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Currency Converter
        </h1>

        {/* From */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder='Enter amount eg 10 '
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-2/5 rounded-lg bg-slate-900/70 border border-blue-800
               px-4 py-3 text-white outline-none
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />

          <select
            onChange={(e) => setFrom(e.target.value)}
            value={from}
            className="w-3/5 rounded-lg bg-slate-900/70 border border-blue-800
               px-4 py-3 text-white outline-none
               focus:border-blue-500"
          >
            {Object.entries(currencey).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <div className="flex justify-center my-5">
          <button
            onClick={swapThings}
            className="rounded-full bg-blue-600 hover:bg-blue-500
                   text-white px-5 py-2
                   transition duration-200
                   shadow-lg shadow-blue-900/40"
          >
            ⇅ Swap
          </button>
        </div>


        {/* To */}
        <div className="flex gap-3">
          <input
            type="text"
            disabled
            value={converted}
            className="w-2/5 rounded-lg bg-slate-900/50
               border border-blue-900
               px-4 py-3 text-white outline-none"
          />

          <select
            onChange={(e) => setTo(e.target.value)}
            value={to}
            className="w-3/5 rounded-lg bg-slate-900/70 border border-blue-800
               px-4 py-3 text-white outline-none
               focus:border-blue-500"
          >
            {Object.entries(currencey).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        {/* Convert */}
        <button
          onClick={currenceyConverter}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500
                 text-white font-semibold py-3
                 my-5
                 transition duration-200
                 shadow-lg shadow-blue-900/40"
        >
          Convert
        </button>

      </div>

    </div>
  )
}

export default App
