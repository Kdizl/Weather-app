//Time and Date
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
//Weather and Forecast
function getWeather(response) {
  console.log(response.data.main.temp);
  document.querySelector("h1").innerHTML = response.data.name;
  celsius = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  let feels = document.querySelector("#feels");


  celsius = response.data.main.temp;

  temperature.innerHTML = Math.round(celsius);
  humidity.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  feels.innerHTML = Math.round(response.data.main.feels_like);
}

function getForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
      }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
// City Buttons
function searchSeattle() {
  let apiKey = "cbc9d5dcf3f6291727d2c62223225326";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=5809844&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=5809844&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function searchDublin() {
  let apiKey = "cbc9d5dcf3f6291727d2c62223225326";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=2964574&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=2964574&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function searchPorto() {
  let apiKey = "cbc9d5dcf3f6291727d2c62223225326";
  let apiUrl = `https://​​api.openweathermap.org/data/2.5/weather?id=6458924&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);

  apiUrl = `https://​​api.openweathermap.org/data/2.5/forecast?id=6458924&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function showSeattle(event) {
  event.preventDefault();
  let seattle = document.querySelector("#seattle").value;
  searchSeattle(seattle);
}

let seattle = document.querySelector("#seattle");
seattle.addEventListener("click", showSeattle);

function showDublin(event) {
  event.preventDefault();
  let dublin = document.querySelector("#dublin").value;
  searchDublin(dublin);
}

let dublin = document.querySelector("#dublin");
dublin.addEventListener("click", showDublin);

function showPorto(event) {
  event.preventDefault();
  let porto = document.querySelector("#dublin").value;
  searchPorto(porto);
}
let porto = document.querySelector("#porto");
porto.addEventListener("click", showPorto);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getLocation);

function searchLocation(position) {
  let apiKey = "cbc9d5dcf3f6291727d2c62223225326";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// Search Form and Conversion
function search(city) {
  let apiKey = "cbc9d5dcf3f6291727d2c62223225326";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let fahrenheitConvert = document.querySelector("#convert-to-fahrenheit");
fahrenheitConvert.addEventListener("click", getFahrenheit);

let celsiusConvert = document.querySelector("#convert-to-celsius");
celsiusConvert.addEventListener("click", getCelsius);

function getFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusConvert.classList.remove("active");
  fahrenheitConvert.classList.add("active");
  let fahrenheit = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function getCelsius(event) {
  event.preventDefault();
  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
}

let celsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Helsinki");
