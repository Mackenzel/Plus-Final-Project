let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;
let hour = now.getHours();
function findMidday() {
  let now = new Date();
  let hour = now.getHours();
  if (hour > 11) {
    midday = "PM";
  } else {
    midday = "AM";
  }
}
findMidday();
if (hour > 12) hour = hour - 12;
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let displayMidday = document.querySelector("#midday-mark");
displayMidday.innerHTML = midday;

let displayTime = document.querySelector("#hour-minute");
displayTime.innerHTML = `${hour}:${minutes}`;

let displayDay = document.querySelector("#day");
displayDay.innerHTML = `${day}`;

function findTime(timestamp) {
  let time = new Date(timestamp);

  let hour = time.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

function displayWeather(response) {
  let foundTemp = document.querySelector("#found-temp");
  let foundDescription = document.querySelector("#weather-descrip");
  let foundCity = document.querySelector("#found-city");
  let foundHumidity = document.querySelector("#humidity");
  let foundWind = document.querySelector("#windspeed");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let currentIcon = document.querySelector("#current-icon");

  fahrenheitTemperature = response.data.main.temp;

  foundTemp.innerHTML = Math.round(fahrenheitTemperature);
  foundDescription.innerHTML = response.data.weather[0].description;
  foundCity.innerHTML = response.data.name;
  foundHumidity.innerHTML = response.data.main.humidity;
  foundWind.innerHTML = Math.round(response.data.wind.speed);
  sunrise.innerHTML = findTime(response.data.sys.sunrise * 1000);
  sunset.innerHTML = findTime(response.data.sys.sunset * 1000);
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let form = document.querySelector("#search-form");

function citySearch(city) {
  let units = "imperial";
  let apiKey = "274afd25137632e37b720563347c5cdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function formSubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  citySearch(city);
}
form.addEventListener("submit", formSubmission);

function locateUser(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "274afd25137632e37b720563347c5cdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function findMyCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateUser);
}

let locateButton = document.querySelector("#my-city");
locateButton.addEventListener("click", findMyCity);

let fahrenheitTemperature = null;

function displayCelTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celcuisLink.classList.add("active");

  let foundTemp = document.querySelector("#found-temp");
  let celTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  foundTemp.innerHTML = Math.round(celTemp);
}
function displayFahrTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celcuisLink.classList.remove("active");

  let foundTemp = document.querySelector("#found-temp");
  foundTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayFahrTemp);

let celcuisLink = document.querySelector("#cel-link");
celcuisLink.addEventListener("click", displayCelTemp);

citySearch("New York");
