function showCity(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  getForecastCord(response.data.coord);
}

function getForecastCord(cordinates) {
  let key = "5863935ee9cca4c02ed68203f807c65b";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function currentCity(event) {
  event.preventDefault();
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "a7f9089acdb831d30158dfbfe345785f";
  let unit = "metric";
  let cityName = document.querySelector("#city-input").value;
  let url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showCity);
}

function showPosition(position) {
  let apiKey = "a7f9089acdb831d30158dfbfe345785f";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let apiUrl = `${url}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCity);
}

function button(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  //return showPosition;
}

function formatTime(time) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[time.getDay()];
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return daysWeek[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (days, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(days.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    days.weather[0].icon
                  }@2x.png"
                  id="icon"
                  width="45px"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forcast-temp-max">${Math.round(
                    days.temp.max
                  )}°</span
                  ><span class="weather-forcast-temp-min">${Math.round(
                    days.temp.min
                  )}°</span>
                </div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fah = document.querySelector("#temperature");
  celsiusLink.classList.remove("celsius");
  fahrenheitLink.classList.add("celsius");
  let fahrenheitTemperatureFormula = Math.round(
    celsiusTemperature * (9 / 5) + 32
  );
  fah.innerHTML = fahrenheitTemperatureFormula;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenheitLink.classList.remove("celsius");
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchLocation = document.querySelector("#button-location");
searchLocation.addEventListener("click", button);

let now = new Date();

let dayHolder = document.querySelector("#date");

dayHolder.innerHTML = formatTime(now);

let country = document.querySelector("#search-form");
country.addEventListener("click", currentCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
