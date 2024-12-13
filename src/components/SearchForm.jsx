import React, { useState } from "react";

const SearchForm = ({ onFormSubmit, isLoading, error }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onFormSubmit(searchCity);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Los Angeles"
              className="w-full p-2 border rounded"
              disabled={isLoading}
              required
            ></input>

            <button type="submit">
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
