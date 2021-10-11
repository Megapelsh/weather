// 0e0673fbcd51b23c32928f65b78d173c

//api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
//https://api.openweathermap.org/data/2.5/onecall?lat=50.4333&lon=30.5167&exclude=minutely,hourly&units=metric&appid=0e0673fbcd51b23c32928f65b78d173c

function date () {
    let date = new Date();
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = weekdays[date.getDay()];
    let dayOfMonth = date.getDate();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let curMonth = months[date.getMonth()];
    let curYear = date.getFullYear();
    let today = dayOfWeek + ", " + dayOfMonth + " " + curMonth + ", " + curYear;
    return today;
}

document.querySelector('#current_date').innerHTML = date();


let mainTemp = document.querySelector('.main .temp .degree');
let currentWeather = document.querySelector('#current_weather');
let currentWeatherIcon = document.querySelector('.main .temp .icon');
let windSpeed = document.querySelector('#wind');
let cloudness = document.querySelector('#rain');
let humidity = document.querySelector('#humidity');
let city = document.querySelector('.selected_city');
let cityID = city.getAttribute('data');
let appID = '0e0673fbcd51b23c32928f65b78d173c';
let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${appID}&units=metric`;
let lat = 0;
let lon = 0;
let url2 = '';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function getDataFromWeatherAPI (url) {
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            console.log('**********');
            console.log(data.main);
            console.log('**********');
            console.log(data.weather);
            mainTemp.innerHTML = Math.round(data.main.temp) + '&deg';
            currentWeather.innerHTML = capitalizeFirstLetter(data.weather[0].description);
            currentWeatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            windSpeed.innerHTML = Math.round(data.wind.speed);
            cloudness.innerHTML = data.clouds.all * 100;
            humidity.innerHTML = data.main.humidity;
            lat = data.coord.lat;
            lon = data.coord.lon;
            let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=0e0673fbcd51b23c32928f65b78d173c`
            fetch(url2)
                .then(function (resp2) {
                    return resp2.json();
                })
                .then(function (data2) {
                    console.log('===========');
                    console.log(data2);
                    console.log('===========');
                    })
                })
                .catch(function () {
                    //catch any errors
                })
        .catch(function () {
            // catch any errors
        })

    console.log('-----------------------');
}


function getDailyForecast (lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=0e0673fbcd51b23c32928f65b78d173c`
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .catch(function () {
            //catch any errors
        })
}


getDataFromWeatherAPI(url);
console.log('****////****');
console.log(getDailyForecast(50.4333, 30.5167));
console.log('****////****');