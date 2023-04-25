// Declare variables
// OpenWeather API Key
const apiKey = '8a5a9149de3afbe28b1ea8d8b5ea6a67';

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

// Button Element
const searchBtn = document.querySelector('#search-btn')

// Store previously searched cities
let cityHistory = [];

// DayJS Object
let now = dayjs()

// API Calls
// Get latitude and longitude data
function getCityCoordinates(city) {
    let apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit='+ 1 +'&appid='+ apiKey;

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

// Get weather information
function getWeatherInfo(lat, lon) {
    let apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid='+ apiKey +'&units=metric';

    fetch(apiURL)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function (data){
                    console.log(data)

                // Display current date information
                    currentCity.textContent = data.city.name;
                    currentDate.textContent = now.format('(DD/MM/YYYY)')
                    let temp = data.list[0].main.temp;
                    temperature.textContent = 'Temp: '+ temp + ' °C'
                    let windSpeed = data.list[0].wind.speed;
                    wind.textContent = 'Wind '+ windSpeed + ' m/s';
                    let humid = data.list[0].main.humidity;
                    humidity.textContent = 'Humidity: '+ humid + '%'

                // Day 1
                let day1 = document.querySelector('#day-1')
                day1.getElementsByTagName('h4')[0].textContent = now.add(1,'d').format('(DD/MM/YYYY)');
                let temp1 = data.list[8].main.temp;
                day1.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp1 + ' °C'
                let windSpeed1 = data.list[8].wind.speed;
                day1.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed1 + ' m/s';
                let humid1 = data.list[8].main.humidity;
                day1.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid1 + '%'

                // Day 2
                let day2 = document.querySelector('#day-2')
                day2.getElementsByTagName('h4')[0].textContent = now.add(2,'d').format('(DD/MM/YYYY)');
                let temp2 = data.list[16].main.temp;
                day2.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp2 + ' °C'
                let windSpeed2 = data.list[16].wind.speed;
                day2.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed2 + ' m/s';
                let humid2 = data.list[16].main.humidity;
                day2.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid2 + '%'

                // Day 3
                let day3 = document.querySelector('#day-3')
                day3.getElementsByTagName('h4')[0].textContent = now.add(3,'d').format('(DD/MM/YYYY)');
                let temp3 = data.list[24].main.temp;
                day3.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp3 + ' °C'
                let windSpeed3 = data.list[24].wind.speed;
                day3.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed3 + ' m/s';
                let humid3 = data.list[24].main.humidity;
                day3.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid3 + '%'

                // Day 4
                let day4 = document.querySelector('#day-4')
                day4.getElementsByTagName('h4')[0].textContent = now.add(4,'d').format('(DD/MM/YYYY)');
                let temp4 = data.list[32].main.temp;
                day4.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp4 + ' °C'
                let windSpeed4 = data.list[32].wind.speed;
                day4.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed4 + ' m/s';
                let humid4 = data.list[32].main.humidity;
                day4.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid4 + '%'

                // Day 5
                let day5 = document.querySelector('#day-5')
                day5.getElementsByTagName('h4')[0].textContent = now.add(5,'d').format('(DD/MM/YYYY)');
                let temp5 = data.list[39].main.temp;
                day5.getElementsByTagName('p')[0].textContent = 'Temp: '+ temp5 + ' °C'
                let windSpeed5 = data.list[39].wind.speed;
                day5.getElementsByTagName('p')[1].textContent = 'Wind: '+ windSpeed5 + ' m/s';
                let humid5 = data.list[39].main.humidity;
                day5.getElementsByTagName('p')[2].textContent = 'Humidity: '+ humid5 + '%'
                })
            }
        })
}

searchBtn.addEventListener('click', function fetchCity() {
    let cityName = citySearch.value;
    getCityCoordinates(cityName)
})
