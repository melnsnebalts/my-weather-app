function currentData(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let city = response.data.name;

  let location = document.querySelector(".currentLocation");
  location.innerHTML = city;

  let temperature = document.querySelector(".temperatureNow");
  temperature.innerHTML = currentTemp;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7217515dc130401eb9daec1124e1a28f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentData);

  console.log(lat);
  console.log(lon);
}
function locationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#currentButton");
locationButton.addEventListener("click", locationClick);

function currentClock(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${day[date.getDay()]} ${currentHour}:${currentMinutes}`;
}

let timeNow = new Date();
let currentTime = document.querySelector(".currentTime");
currentTime.innerHTML = currentClock(timeNow);

function inputSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchLocation").value;
  citySearch(city);
}
function currentRequestData(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);

  let location = document.querySelector(".currentLocation");
  location.innerHTML = response.data.name;

  let temperature = document.querySelector(".temperatureNow");
  temperature.innerHTML = currentTemp;
}

function citySearch(city) {
  let apiKey = "7217515dc130401eb9daec1124e1a28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentRequestData);

  console.log(city);
}

let locationSearch = document.querySelector(".header");
locationSearch.addEventListener("submit", inputSearch);
