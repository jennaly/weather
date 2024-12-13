import React from "react";

const Favorite = ({ data, getCityData }) => {
  return (
    <div className="h-1/4 flex flex-col gap-2 overflow-scroll border rounded-lg p-4">
      <h2 className="border-b pb-2 mb-2 text-left">Favorite Cities 🏙️</h2>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((city) => (
            <button
              className="uppercase"
              onClick={() => getCityData(city)}
              key={city}
            >
              {city}
            </button>
          ))}
        </div>
      ) : (
        <p>{"you don' have any :("}</p>
      )}
    </div>
  );
};

export default Favorite;
