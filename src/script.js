let current = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let currentDay = days[current.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay}`;

function addZero(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

let currentHour = addZero(current.getHours());
let currentMinutes = addZero(current.getMinutes());
let h3 = document.querySelector("h3");
h3.innerHTML = `${currentHour}:${currentMinutes}`;

let apiKey = "93fec6aa4a6cd077a8e7a75e3382aae3";
let units = "imperial";
let city = "city";

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
let cityFormElement = document.querySelector("#city-form");

cityFormElement.addEventListener("submit", function(event) {
    event.preventDefault();
    let value = document
        .getElementById("search-text-input")
        .value;
    city = value;
    showTemperature();
});

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    console.log(position.coords.latitude, position.coords.longitude);
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let temperature = Math.round(data.main.temp);
            console.log(data);
            let cityElement = document.querySelector("#city");
            let temperatureElement = document.querySelector("#temperature");
            let descriptionElement = document.querySelector("#description");
            cityElement.innerHTML = data.name;
            temperatureElement.innerHTML = `${temperature}`;
            descriptionElement.innerHTML = data.weather[0].description;
        });
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
        showPosition(position);
    });
}

function showTemperature() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let temperature = Math.round(data.main.temp);
            console.log(data);
            let cityElement = document.querySelector("#city");
            let temperatureElement = document.querySelector("#temperature");
            let descriptionElement = document.querySelector("#description");
            cityElement.innerHTML = data.name;
            temperatureElement.innerHTML = `${temperature}`;
            descriptionElement.innerHTML = data.weather[0].description;
        });
}