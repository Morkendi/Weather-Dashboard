// Declare variables
const apiKey = '8a5a9149de3afbe28b1ea8d8b5ea6a67'
    // DayJS Object
let now = dayjs()
    // City Array
let cityHistory = [];

// Column Elements
const rightColumn = document.querySelector('#right-column')
// Data Elements
const currentCity = document.querySelector('#current-city');
const currentDate = document.querySelector('#current-date');
const temperature = document.querySelector('.temp');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const searchHistory = document.querySelector('#search-history')
const weatherCard = document.querySelector('.forecast-card')

// Text input Element
const citySearch = document.querySelector('#city-input');

// Button Elements
const searchBtn = document.querySelector('#search-btn');
const deleteBtn = document.querySelector('#delete-btn');
const historyBtn = document.querySelector('.history-btn');

// On Start
function Init() {
    rightColumn.style.visibility = 'hidden'
}
// localStorage
// Save to localStorage
function saveHistory(city) {
    let cityHistory = JSON.parse(localStorage.getItem('cities'));
    if (cityHistory === null) {
        cityHistory = [];
    };
    cityHistory.push(city);
    localStorage.setItem('cities', JSON.stringify(cityHistory));
};
// Delete city history
function deleteHistory() {
    localStorage.clear();
    location.reload();
};
// Display city history
function displayHistory() {
    searchHistory.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('cities')) || [];
    let uniqueHistory = new Set(history); 

    for (let city of uniqueHistory) { 
        let listItem = document.createElement('button');
        listItem.textContent = city;
        listItem.setAttribute('class', 'btn history-btn');
        searchHistory.appendChild(listItem);

      // Add event listener to history button
        listItem.addEventListener('click', function() {
        getCityCoordinates(city); 
        });
    }
}

// API Calls
// Get latitude and longitude data
function getCityCoordinates(city) {
    if (!city) {
        alert('Please enter a city name');
        return;
    } else {
        rightColumn.style.visibility = 'visible'
        saveHistory(city);
        displayHistory();
        let apiURL = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit='+ 1 +'&appid='+ apiKey;

        fetch(apiURL)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        let lat = data[0].lat;
                        let lon = data[0].lon;
                        getWeatherInfo(lat, lon)
                    });
                }
            })
        }
}

// Get weather information
function getWeatherInfo(lat, lon) {
    let apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ apiKey +'&units=metric';

    fetch(apiURL)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data){
                    // Display current date information
                    currentCity.textContent = data.city.name;
                    currentDate.textContent = now.format('(DD/MM/YYYY)')
                    let iconCodeActual = data.list[0].weather[0].icon
                    let icon = 'https://openweathermap.org/img/wn/'+ iconCodeActual + '@2x.png';
                    let iconContainer = document.querySelector('#img-1');
                    iconContainer.setAttribute('src', icon)
                    let temp = data.list[0].main.temp;
                    temperature.textContent = 'Temp: '+ temp + ' °C'
                    let windSpeed = data.list[0].wind.speed;
                    wind.textContent = 'Wind '+ windSpeed + ' m/s';
                    let humid = data.list[0].main.humidity;
                    humidity.textContent = 'Humidity: '+ humid + '%'

                    // Set weather information for each day
                    for (let i = 1; i <= 5; i++) {
                        let day = document.querySelector('#day-' + i);
                        let dayData = data.list[i + 7];
                        day.getElementsByTagName('h4')[0].textContent = now.add(i, 'd').format('(DD/MM/YYYY)');
                        let iconCode = dayData.weather[0].icon;
                        let iconDay = 'https://openweathermap.org/img/wn/'+ iconCode + '@2x.png';
                        let iconContainer = document.querySelector('#img-' + (i + 1));
                        iconContainer.setAttribute('src', iconDay);
                        let temp = dayData.main.temp;
                        day.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp + ' °C';
                        let windSpeed = dayData.wind.speed;
                        day.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed + ' m/s';
                        let humid = dayData.main.humidity;
                        day.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid + '%';
                    }
                })
            }
        })
}

Init();
searchBtn.addEventListener('click', function fetchCity(e) {
    e.preventDefault();
    let cityName = citySearch.value;
    getCityCoordinates(cityName);
});
deleteBtn.addEventListener('click', deleteHistory);