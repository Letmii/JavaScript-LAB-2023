const apiKey = '';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Dodanie nasłuchiwacza zdarzeń do przycisku 'Dodaj'
document.getElementById('addCity').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value; // Pobranie nazwy miasta z pola tekstowego
    getWeatherData(city); // Wywołanie funkcji pobierającej dane pogodowe dla miasta
});

// Funkcja pobierająca dane pogodowe dla danego miasta
function getWeatherData(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=pl`; // Budowanie URL do zapytania API

    fetch(url) // Wykonanie zapytania HTTP do API
        .then(response => response.json()) // Parsowanie odpowiedzi jako JSON
        .then(data => {
            if(data.cod === 200) { // Sprawdzenie, czy odpowiedź jest poprawna
                addCityToLocalStorage(city); // Dodanie miasta do localStorage
                updateUI(city, data); // Aktualizacja interfejsu użytkownika danymi pogodowymi
            } else {
                alert('Nie znaleziono miasta!'); // Alert, jeśli miasto nie zostało znalezione
            }
        })
        .catch(error => { // Obsługa błędów
            alert('Wystąpił błąd przy pobieraniu danych pogodowych');
            console.error('Error:', error);
        });
}

// Funkcja aktualizująca interfejs użytkownika danymi pogodowymi
function updateUI(city, weatherData) {
    const citiesList = document.getElementById('citiesList'); // Pobranie elementu listy miast
    const weatherIconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`; // URL ikony pogodowej

    const cityDiv = document.createElement('div'); // Stworzenie nowego diva dla miasta
    cityDiv.classList.add('city'); // Dodanie klasy do diva
    cityDiv.innerHTML = `
        <h2>${city}</h2>
        <img src="${weatherIconUrl}" class="weather-icon" alt="Ikona pogody">
        <p>Temperatura: ${weatherData.main.temp}°C</p>
        <p>Wilgotność: ${weatherData.main.humidity}%</p>
        <button onclick="removeCity('${city}')">Usuń</button>
    `; // Wypełnienie diva danymi pogodowymi i przyciskiem do usuwania
    citiesList.appendChild(cityDiv); // Dodanie diva do listy miast
}

// Funkcja dodająca miasto do localStorage
function addCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || []; // Pobranie miast z localStorage lub utworzenie nowej tablicy
    if (!cities.includes(city)) {
        cities.push(city); // Dodanie nowego miasta do tablicy
        localStorage.setItem('cities', JSON.stringify(cities)); // Zapisanie tablicy w localStorage
    }
}

// Funkcja usuwająca miasto z localStorage i aktualizująca UI
function removeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || []; // Pobranie miast z localStorage
    cities = cities.filter(c => c !== city); // Usunięcie wybranego miasta z tablicy
    localStorage.setItem('cities', JSON.stringify(cities)); // Zapisanie zmodyfikowanej tablicy w localStorage
    loadSavedCities(); // Ponowne załadowanie i wyświetlenie miast
}

// Funkcja ładowania zapisanych miast i ich wyświetlenia
function loadSavedCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || []; // Pobranie miast z localStorage
    document.getElementById('citiesList').innerHTML = ''; // Wyczyszczenie listy miast w UI
    cities.forEach(city => getWeatherData(city)); // Pobranie danych pogodowych dla każdego zapisanego miasta
}

loadSavedCities(); // Wywołanie funkcji ładowania miast przy pierwszym załadowaniu skryptu