export const dateFormatter = (date) => {
  const dateFormatOptions = { dateStyle: "medium" };

  const formattedDate = new Intl.DateTimeFormat(
    "en-US",
    dateFormatOptions
  ).format(date);

  return formattedDate;
};

const groupDataByDate = (array) => {
  const output = {};

  // need to convert date from api (UTC) to local time
  // format local time to MM-DD-YY
  for (const entry of array) {
    const dateText = `${entry["dt_txt"]} UTC`;

    const localDate = dateFormatter(new Date(Date.parse(dateText)));

    if (!output[localDate]) {
      output[localDate] = { temperature: [], weather: [] };
    }

    output[localDate]["temperature"].push(entry["main"]["temp"]);
    output[localDate]["weather"].push(entry["weather"][0]["description"]);
  }

  return output;
};

const getAvgTemp = (temperaturesArr) => {
  const sum = temperaturesArr.reduce((current, acc) => current + acc, 0);
  const avg = Number((sum / temperaturesArr.length).toFixed(2));

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
  "scattered clouds": "03d",
  "broken clouds": "04d",
  "shower rain": "09d",
  rain: "10d",
  thunderstorm: "11d",
  snow: "13d",
  mist: "50d",
};

export const processWeatherData = (data) => {
  const groupedData = groupDataByDate(data);
  const processedData = {};

  for (const date in groupedData) {
    processedData[date] = {
      averageTemp: getAvgTemp(groupedData[date]["temperature"]),
      commonWeather: getCommonWeather(groupedData[date]["weather"]),
    };
  }

  return processedData;
};
