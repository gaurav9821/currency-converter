import React, { useEffect, useState } from "react";
import CurrencyDropDown from "./CurrencyDropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedCurrency, setConvertedCurrency] = useState(null);
  const [convertingIndicator, setconvertingIndicator] = useState(false);

  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourite")) || ["INR", "GBP"]
  );

  //Currencies : https://api.frankfurter.app/currencies
  async function fetchCurrencies() {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();

      setCurrencies(Object.keys(data));
    } catch (err) {
      console.error("Error: " + err);
    }
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleFavourite = (currency) => {
    let updatedFavourites = [...favourites];

    if (favourites.includes(currency)) {
      updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
    } else {
      updatedFavourites.push(currency);
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favourite", JSON.stringify(updatedFavourites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  async function convertCurrency() {
    //Conversion : https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
    try {
      if (!amount) return;
      setconvertingIndicator(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();

      setConvertedCurrency(`${data.rates[toCurrency]}  ${toCurrency}`);
    } catch (err) {
      console.error("Error: " + err);
    } finally {
      setconvertingIndicator(false);
    }
  }

  console.log(currencies);
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div>
        <CurrencyDropDown
          currencies={currencies}
          title="From"
          handleFavourite={handleFavourite}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          favourites={favourites}
        />
        <br />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropDown
          currencies={currencies}
          title="To"
          handleFavourite={handleFavourite}
          currency={toCurrency}
          setCurrency={setToCurrency}
          favourites={favourites}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            convertingIndicator ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>

      {convertedCurrency && (
        <div className="mt-4 text-lg text-right font-medium text-green-600">
          Converted Amount: {convertedCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
