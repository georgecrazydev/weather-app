const form = document.getElementById('form');
const input = document.querySelector('.search__input');
const button = document.querySelector('.search__button');
const weather = document.querySelector('.weather');
const weatherCity = document.querySelector('.weather__city');
const weatherTemp = document.querySelector('.weather__temp');
const weatherIcon = document.querySelector('.weather__icon');
const weatherDescription = document.querySelector('.weather__description');
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherWind = document.querySelector('.weather__wind');


let weatherApp = {
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=24f96b205178b42e54b895018d717b83`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;
    weatherCity.innerText = `Weather in ${name}`;
    weatherTemp.innerText = `${Math.round(temp)}°C`;
    weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
    weatherDescription.innerText = description;
    weatherHumidity.innerText = `Humidity: ${humidity}%`;
    weatherWind.innerText = `Wind Speed: ${speed} km/h`;
    weather.classList.remove('loading');
  },
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value) {
    weatherApp.fetchWeather((input.value));
    input.value = '';
  }
})
