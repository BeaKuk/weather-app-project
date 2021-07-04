//time (have to add dates):
import "./style.css";

let date = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let dayNumber = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//search engine:

function search(event) {
  event.preventDefault();
  let location = document.querySelector("#location");
  let query = document.querySelector("#query");
  location.innerHTML = query.value;
  searchCity(event);
}

let searchLocation = document.querySelector("#search-location");
searchLocation.addEventListener("submit", search);
date.innerHTML = `${days[dayNumber]} ${hours}:${minutes}`;

//temperature and C / F:
function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let currentTemperature = temp.innerHTML;
  let celcius = Math.round(((currentTemperature - 32) * 5) / 9);
  temp.innerHTML = celcius;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let currentTemperature = temp.innerHTML;
  console.log("currentTemperature", currentTemperature);
  temp.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
}

let fahrenheitUnits = document.querySelector("#fahrenheit-units");
fahrenheitUnits.addEventListener("click", convertToFahrenheit);

let celsiusUnits = document.querySelector("#celsius-units");
celsiusUnits.addEventListener("click", convertToCelsius);

//location:
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(location) {
  let urlBase = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `${urlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  //axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(getCurrentWeather);
  console.log(apiKey);
  console.log(apiUrl);
}

let currentLocation = document.querySelector("#button-current");
currentLocation.addEventListener("click", getCurrentLocation);

//typing city, show temperature:

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  console.log(temperature);
  let query = Math.round(response.data.main.temp);
  let queryElement = document.querySelector("#query");
  queryElement.innerHTML = `${query}`;
  console.log(query);

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let location = document.querySelector("#location");
  location.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let city = document.querySelector("#query").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentWeather(response) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let city = response.data.name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
