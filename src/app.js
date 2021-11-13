let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;
let hour = now.getHours();
function findMidday(hour) {
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

let displayTime = document.querySelector("#hour-minute");
displayTime.innerHTML = `${hour}:${minutes}`;

let displayMidday = document.querySelector("#midday-mark");
displayMidday.innerHTML = midday;

let displayDay = document.querySelector("#day");
displayDay.innerHTML = `${day}`;

///////////////////////
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
  console.log(response.data);
  let foundTemp = document.querySelector("#found-temp");
  let foundDescription = document.querySelector("#weather-descrip");
  let foundCity = document.querySelector("#found-city");
  let foundHumidity = document.querySelector("#humidity");
  let foundWind = document.querySelector("#windspeed");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  foundTemp.innerHTML = Math.round(response.data.main.temp);
  foundDescription.innerHTML = response.data.weather[0].description;
  foundCity.innerHTML = response.data.name;
  foundHumidity.innerHTML = response.data.main.humidity;
  foundWind.innerHTML = Math.round(response.data.wind.speed);
  sunrise.innerHTML = findTime(response.data.sys.sunrise * 1000);
  sunset.innerHTML = findTime(response.data.sys.sunset * 1000);
}
let city = "Austell";
let units = "imperial";
let apiKey = "274afd25137632e37b720563347c5cdb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
