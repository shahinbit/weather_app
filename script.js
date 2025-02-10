document.addEventListener('DOMContentLoaded', function() {
    // Fetch weather for Dhaka on page load
    fetchWeatherByCity('Dhaka');

    document.getElementById('getWeather').addEventListener('click', function() {
        const city = document.getElementById('city').value;
        if (city) {
            fetchWeatherByCity(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    document.getElementById('submitPoll').addEventListener('click', function() {
        const pollCity = document.getElementById('pollCity').value;
        if (pollCity) {
            fetchWeatherPoll(pollCity);
        } else {
            alert('Please enter a city name for the poll.');
        }
    });

    document.getElementById('saveArea').addEventListener('click', function() {
        const city = document.getElementById('city').value;
        if (city) {
            saveArea(city);
        } else {
            alert('Please enter a city name to save.');
        }
    });

    // Fetch weather by latitude and longitude
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherByCity(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=eb280ccd2bee4b53829120453250902&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data. Please try again.'));
}

function fetchWeatherByCoordinates(lat, lon) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=eb280ccd2bee4b53829120453250902&q=${lat},${lon}&aqi=no`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data. Please try again.'));
}

function fetchWeatherPoll(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=eb280ccd2bee4b53829120453250902&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => displayPollResults(data))
        .catch(error => alert('Error fetching weather data for the poll. Please try again.'));
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Weather: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} kph</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}

function displayPollResults(data) {
    const pollResults = `
        <p>${data.location.name}, ${data.location.country}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Weather: ${data.current.condition.text}</p>
    `;
    document.getElementById('pollResults').innerHTML += pollResults;
}

function saveArea(city) {
    const savedAreas = JSON.parse(localStorage.getItem('savedAreas')) || [];
    if (!savedAreas.includes(city)) {
        savedAreas.push(city);
        localStorage.setItem('savedAreas', JSON.stringify(savedAreas));
        alert(`${city} has been saved to your areas.`);
    } else {
        alert(`${city} is already saved.`);
    }
}
