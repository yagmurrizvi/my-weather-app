let now = new Date();
//get the current time
let currentTime = document.querySelector("i strong");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentTime.innerHTML = `  ${hour}:${minute}`;

let date = now.getDate();
//get the current date
let currentDay = document.querySelector("h5 strong");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDay.innerHTML = `${day} | ${month} ${date}`;

//Search city and view the current temperature
let apiKey = "525c9c9ac5b08ed476653a02fbaab704";

function showTemperature(response) {
  //max temp
  let temperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector("#temperature");
  maxTemperature.innerHTML = temperature;
  //min temp
  let tempMin = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector("#min-temperature");
  minTemperature.innerHTML = tempMin;
  //Description
  let description = response.data.weather[0].main;
  let mainDesc = document.querySelector("#first-day");
  mainDesc.innerHTML = description;
}

function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city").value;
  let h1 = document.querySelector("#name");
  h1.innerHTML = `${searchInput} <i class="fas fa-umbrella"></i>`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchCity = document.querySelector("button");
searchCity.addEventListener("click", city);

//Bonus feature

function getTemperature(response) {
  //max temp
  let temperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector("#temperature");
  maxTemperature.innerHTML = temperature;
  //min temp
  let tempMin = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector("#min-temperature");
  minTemperature.innerHTML = tempMin;
  //Description
  let description = response.data.weather[0].main;
  let mainDesc = document.querySelector("#first-day");
  mainDesc.innerHTML = description;
  //city name
  let currentLocation = response.data.name;
  let cityName = document.querySelector("#name");
  cityName.innerHTML = currentLocation;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function location(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector("#current-button");
current.addEventListener("click", location);
