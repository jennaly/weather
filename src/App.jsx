import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { processWeatherData } from "./utils";
import Welcome from "./components/Welcome";
import CurrentWeather from "./components/CurrentWeather";
import Favorite from "./components/Favorite";

function App() {
  const [response, setResponse] = useState({
    currentWeather: null,
    forecast: null,
  });
  const [favorite, setFavorite] = useState([]);
  const [showFavorite, setShowFavorite] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCityData = async (city) => {
    setIsLoading(true);
    setError(null);

    try {
      const geoInfoReq = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      if (geoInfoReq.data.length < 1) {
        setError("There's no city by that name");
        return;
      }

      const geoInfoData = geoInfoReq.data[0];

      const { lat, lon } = geoInfoData;

      const currentWeatherReq = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const forecastReq = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const currentWeatherData = {
        location: {
          city: geoInfoData.name,
          state: geoInfoData.state,
          country: geoInfoData.country,
        },
        temp: currentWeatherReq.data.main.temp,
        humidity: currentWeatherReq.data.main.humidity,
        wind: currentWeatherReq.data.wind.speed,
        icon: currentWeatherReq.data.weather[0].icon,
      };

      const searchResults = {
        currentWeather: currentWeatherData,
        forecast: processWeatherData(forecastReq.data.list),
      };

      setShowWelcome(false);
      setShowFavorite(false);
      setResponse(searchResults);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorite = () => {
    // handle duplicates
    if (!favorite.includes(response.city)) {
      let newFavoriteList = [...favorite, response.city];
      setFavorite(newFavoriteList);

      localStorage.setItem("favoriteCities", JSON.stringify(newFavoriteList));
    }
  };

  useEffect(() => {
    const localStorageFavorite = localStorage.getItem("favoriteCities");

    if (localStorageFavorite) {
      setFavorite(JSON.parse(localStorageFavorite));
    }
  }, []);

  return (
    <>
      <div className="container mx-auto w-full h-screen max-h-screen flex flex-col justify-between p-8">
        <SearchForm
          onFormSubmit={getCityData}
          isLoading={isLoading}
          error={error}
        />

        {showWelcome && <Welcome />}

        {showFavorite && <Favorite data={favorite} getCityData={getCityData} />}

        {response.currentWeather && (
          <CurrentWeather data={response.currentWeather} />
        )}
        {response.forecast && (
          <p className="bg-blue-100 p-4 rounded">
            Forecast:
            {JSON.stringify(response.forecast)}
          </p>
        )}
        {response.city && (
          <button onClick={addToFavorite}>Add this city</button>
        )}
      </div>
    </>
  );
}

export default App;
