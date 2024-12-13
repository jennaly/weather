import React from "react";
import { getIconLink } from "../utils";

const Forecast = ({ data }) => {
  console.log("forecast data", data);

  return (
    <div>
      {data.map((day) => (
        <div className="grid grid-cols-4">
          <span className="my-auto uppercase">{day.date}</span>
          <div className="col-span-2 flex gap-2 justify-start items-center">
            <img
              src={getIconLink(day.icon)}
              alt="Illustration of weather"
              className="w-10"
            ></img>
            <span>{day.commonWeather}</span>
          </div>
          <span className="my-auto">{day.averageTemp}&#8457;</span>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
