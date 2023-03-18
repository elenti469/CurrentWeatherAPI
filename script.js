const input = document.querySelector("input");
const button = document.querySelector("button");
const errorMessage = document.querySelector(".error");
const date = document.querySelector("p");
const cityName = document.querySelector(".city_name")
const img = document.querySelector("img");
const temperature = document.querySelector(".temperature");
const temperatureDescription = document.querySelector(".temperature_description");
const feelsLike = document.querySelector(".feels_like");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind_speed");
const clouds = document.querySelector(".clouds");

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=f497fe974a94215bf8439d6f45bd7a91';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL).then(response => {
        console.log(response.data);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        clouds.textContent = `${response.data.clouds.all} %`;
        windSpeed.textContent = `${Math.round((response.data.wind.speed) * 3.6)} km/h`;
        humidity.textContent = `${response.data.main.humidity} %`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        temperature.textContent = `${Math.round(response.data.main.temp)} °C`;
        feelsLike.textContent = `${response.data.main.feels_like} °C`;
        temperatureDescription.textContent = `${response.data.weather[0].description}`;
        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
        errorMessage.textContent = ``;
    }).catch(error => {
        console.log(error);
        if (error.response.data.cod !== 200) {
            errorMessage.textContent = `${error.response.data.message}`;
        }
        [clouds, windSpeed, humidity, pressure, cityName, temperature, temperatureDescription, feelsLike].forEach(el => {
            el.textContent = ``;
        })
        img.src = ``;

    }).finally(() => {
        input.value = ``;
    })
}

function getWeatherByEnter(e) {
    if (e.key === `Enter`) {
        getWeather();
    }
}

input.addEventListener(`keypress`, getWeatherByEnter);
button.addEventListener('click', getWeather);