function displayTemperature(response) {
  let temperatureElement=document.querySelector(".temperatureNow");
  let cityElement = document.querySelector(".currentLocation");
  let dateElement=document.querySelector(".currentTime");
  let iconElement=document.querySelector(".currentWeatherIcon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature=response.data.main.temp;

  dateElement.innerHTML= `Last updated ` + formatDate(response.data.dt*1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );

  getForecast(response.data.coord);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7217515dc130401eb9daec1124e1a28f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  
}

function locationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#currentButton");
locationButton.addEventListener("click", locationClick);

function openIG () {
  window.open(`https://www.instagram.com/melnsnebalts/`)
}

let linkIG = document.querySelector(".instagram-link")
linkIG.addEventListener("click", openIG)

function openGitHub () {
window.open(`https://github.com/melnsnebalts/my-weather-app`)
}

let linkGit = document.querySelector(".github-link")
linkGit.addEventListener("click", openGitHub)


function formatDate(timestamp){
  let date = new Date (timestamp);
  let hours = date.getHours();
  if (hours<10) {
    hours=`0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes<10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");


  let forecastHTML = `<div class="row">`;
  
forecast.forEach(function (forecastDay, index) {
 if (index < 5) {
  forecastHTML = forecastHTML + 
  `
  <div class="col" id="nextOne">
    <div class="nextOneDay">${formatDay(forecastDay.dt)}</div>
      <br />
      <div>
      <span class="nextOneTemperatureMax">${Math.round(forecastDay.temp.max)}</span>
      <br />
      <span class="nextOneTemperatureMin">${Math.round(forecastDay.temp.min)}</span>
      </div>
      <br />
      <img
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="64"
      />    
    </div>
  `
 }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }
  
function getForecast(coordinates) {
  let apiKey = "7217515dc130401eb9daec1124e1a28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// function displayTemperature(response) {
  // let temperatureElement=document.querySelector(".temperatureNow");
  // let cityElement=document.querySelector(".currentLocation");
  // let dateElement=document.querySelector(".currentTime");
  // let iconElement=document.querySelector(".currentWeatherIcon");
  

  // celsiusTemperature=response.data.main.temp;

  // temperatureElement.innerHTML=Math.round(response.data.main.temp);
  // cityElement.innerHTML=response.data.name; 
  // dateElement.innerHTML= `Last updated ` + formatDate(response.data.dt*1000);
  // iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );

  // getForecast(response.data.coord);

// }
function citySearch(city) {
  let apiKey = "7217515dc130401eb9daec1124e1a28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function inputSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchLocation").value;
  citySearch(city);
}

let form=document.querySelector(".header");
form.addEventListener("submit", inputSearch);

citySearch("Riga");
