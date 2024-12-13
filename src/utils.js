export const getIconLink = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const processWeatherByDay = (array) => {
  const output = {};

  for (const entry of array) {
    // Get the entry date in UTC for comparison with current UTC date
    const entryDate = new Date(entry["dt_txt"] + " UTC");
    const currentDate = new Date();

    // Compare dates in UTC
    const entryDateString = entryDate.toISOString().slice(0, 10);
    const currentDateString = currentDate.toISOString().slice(0, 10);

    // Skip if it's today
    if (entryDateString === currentDateString) {
      continue;
    }

    const daysOfTheWeek = {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Wed",
      4: "Thurs",
      5: "Fri",
      6: "Sat",
    };

    // Convert UTC time to local time for display
    const localDate = new Date(entry["dt_txt"]);
    const day = daysOfTheWeek[localDate.getDay()];

    if (!output[day]) {
      output[day] = { temperature: [], weather: [] };
    }

    output[day]["temperature"].push(entry["main"]["temp"]);
    output[day]["weather"].push(entry["weather"][0]["description"]);
  }

  return output;
};

const getAvgTemp = (temperaturesArr) => {
  const sum = temperaturesArr.reduce((current, acc) => current + acc, 0);
  const avg = Math.round(sum / temperaturesArr.length);

  return avg;
};

const getCommonWeather = (weatherArr) => {
  const frequency = {};
  let mostCommonDesc = "";
  let maxCount = 0;

  for (const desc of weatherArr) {
    if (frequency[desc]) {
      frequency[desc]++;
    } else {
      frequency[desc] = 1;
    }

    if (frequency[desc] > maxCount) {
      mostCommonDesc = desc;
      maxCount = frequency[desc];
    }
  }

  return mostCommonDesc;
};

export const weatherIcons = {
  "clear sky": "01d",
  "few clouds": "02d",
  "overcast clouds": "04d",
  "scattered clouds": "03d",
  "broken clouds": "04d",
  "shower rain": "09d",
  "light rain": "10n",
  rain: "10d",
  thunderstorm: "11d",
  snow: "13d",
  mist: "50d",
  smoke: "50d",
  haze: "50d",
  sand: "50d",
  fog: "50d",
  dust: "50d",
  "volcanic ash": "50d",
  squalls: "50d",
  tornado: "50d",
};

export const processWeatherData = (data) => {
  const groupedData = processWeatherByDay(data);
  const processedData = [];

  for (const date in groupedData) {
    const day = {
      date: date,
      averageTemp: getAvgTemp(groupedData[date]["temperature"]),
      commonWeather: getCommonWeather(groupedData[date]["weather"]),
      icon: weatherIcons[getCommonWeather(groupedData[date]["weather"])],
    };
    processedData.push(day);
  }

  return processedData;
};
