import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const CurrencyDropDown = ({
  title = "",
  currencies,
  handleFavourite,
  currency,
  setCurrency,
  favourites,
}) => {
  const isFavourite = (curr) => favourites.includes(curr);
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-gray-200 w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favourites &&
            favourites.map((fav) => {
              return (
                <option className="bg-gray-200" key={fav} value={fav}>
                  {fav}
                </option>
              );
            })}
          <hr />
          {currencies
            .filter((curr) => !favourites.includes(curr))
            .map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavourite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavourite(currency) ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropDown;
