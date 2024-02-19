const apiKey = '';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('addCity').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === 200) {
                addCityToLocalStorage(city);
                updateUI(city, data);
            } else {
                alert('Nie znaleziono miasta!');
            }
        })
        .catch(error => {
            alert('Wystąpił błąd przy pobieraniu danych pogodowych');
            console.error('Error:', error);
        });
}

function updateUI(city, weatherData) {
    const citiesList = document.getElementById('citiesList');
    const weatherIconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

    const cityDiv = document.createElement('div');
    cityDiv.classList.add('city');
    cityDiv.innerHTML = `
        <h2>${city}</h2>
        <img src="${weatherIconUrl}" class="weather-icon" alt="Ikona pogody">
        <p>Temperatura: ${weatherData.main.temp}°C</p>
        <p>Wilgotność: ${weatherData.main.humidity}%</p>
        <button onclick="removeCity('${city}')">Usuń</button>
    `;
    citiesList.appendChild(cityDiv);
}

function addCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function removeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities = cities.filter(c => c !== city);
    localStorage.setItem('cities', JSON.stringify(cities));
    loadSavedCities();
}

function loadSavedCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    document.getElementById('citiesList').innerHTML = '';
    cities.forEach(city => getWeatherData(city));
}

loadSavedCities();