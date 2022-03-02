function currentData(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let city = response.data.name;

  let location = document.querySelector(".currentLocation");
  location.innerHTML = city;

  let temperature = document.querySelector(".temperatureNow");
  temperature.innerHTML = currentTemp;

  let iconElement=document.querySelector(".currentWeatherIcon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );

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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector(".forecast");

  let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

let forecastHTML = `<div class="row">`;
  
days.forEach(function (day) {

  forecastHTML = forecastHTML + 
  `
  <div class="col" id="nextOne">
    <div class="nextOneDay">${day}</div>
      <br />
      <div>
      <span class="nextOneTemperatureMax">13°C</span>
      <br />
      <span class="nextOneTemperatureMin">2°C</span>
      </div>
      <br />
      <img
      src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="64"
      />    
    </div>
  `
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }
  
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7217515dc130401eb9daec1124e1a28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement=document.querySelector(".temperatureNow");
  let cityElement=document.querySelector(".currentLocation");
  let dateElement=document.querySelector(".currentTime");
  let iconElement=document.querySelector(".currentWeatherIcon");
  

  celsiusTemperature=response.data.main.temp;

  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  cityElement.innerHTML=response.data.name; 
  dateElement.innerHTML=formatDate(response.data.dt*1000);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );

  getForecast(response.data.coord);

}
function citySearch(city) {
  let apiKey = "7217515dc130401eb9daec1124e1a28f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  console.log(city);
}

function inputSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchLocation").value;
  citySearch(city);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement=document.querySelector(".temperatureNow");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelisusTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(".temperatureNow");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;


let form=document.querySelector(".header");
form.addEventListener("submit", inputSearch);

let fahrenheitLink=document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelisusTemperature);

citySearch("Riga");
