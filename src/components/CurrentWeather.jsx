import React from "react";
import { weatherIcons } from "../utils";

const CurrentWeather = ({ data }) => {
  //   const ICON_LINK = `https://openweathermap.org/img/wn/${
  //     weatherIcons[data.weather.icon]
  //   }@2x.png`;
  console.log(data.icon);
  console.log(data);
  return (
    <div>
      {" "}
      <p className="bg-gray-100 p-4 rounded">
        Current weather:
        {JSON.stringify(data)}
      </p>
    </div>
  );
};

export default CurrentWeather;
