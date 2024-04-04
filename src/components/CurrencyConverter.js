import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
  //Conversion : https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const [currencies, setCurrencies] = useState(null);
  const [amount, setAmount] = useState(1);

  //Currencies : https://api.frankfurter.app/currencies
  async function fetchCurrencies() {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const data = await response.json();

    setCurrencies(data);
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);
  f;
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div>Dropdowns</div>

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
        <button className="px-5 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Convert
        </button>
      </div>

      <div className="mt-4 text-lg text-right font-medium text-green-600">
        Converted Amount: 69 USD
      </div>
    </div>
  );
};

export default CurrencyConverter;
