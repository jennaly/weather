import React from "react";

const Favorite = ({ data, getCityData }) => {
  return (
    <div className=" mt-4 flex flex-col gap-2">
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((city) => (
            <button
              className="uppercase text-sm"
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
