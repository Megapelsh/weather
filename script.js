
function date (currDate) {
    let date = new Date(currDate);
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = weekdays[date.getDay()];
    let dayOfMonth = date.getDate();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let curMonth = months[date.getMonth()];
    let curYear = date.getFullYear();
    let today = dayOfWeek + ", " + dayOfMonth + " " + curMonth + ", " + curYear;
    return today;
}


let currentDate = document.querySelector('#current_date');
let selectedDate = document.querySelector('.footer .selected')
let mainTemp = document.querySelector('.main .temp .degree');
let mainTempNight = document.querySelector('.main .temp .degree_night');
let currentWeather = document.querySelector('#current_weather');
let currentWeatherIcon = document.querySelector('.main .temp .icon');
let windSpeed = document.querySelector('#wind');
let cloudness = document.querySelector('#clouds');
let humidity = document.querySelector('#humidity');
let city = document.querySelector('.selected_city');
let cityID = city.getAttribute('data-id');
let footerDates = document.querySelectorAll('.footer_date');
let footerIcons = document.querySelectorAll('.footer_date_info .img');
let footerDegree = document.querySelectorAll('.footer_date_info .degree_c');
let currentDateID = 0;
let appID = '0e0673fbcd51b23c32928f65b78d173c';
// let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${appID}&units=metric`;
// let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=50.4333&lon=30.5167&exclude=minutely,hourly&units=metric&appid=0e0673fbcd51b23c32928f65b78d173c`

let lat = document.querySelector('.selected_city').getAttribute('data-lat');
let lon = document.querySelector('.selected_city').getAttribute('data-lon');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


let observer = new MutationObserver(getDailyForecast);
observer.observe(selectedCity, {
    attributes: true
})

function getDailyForecast(currentDateID) {
    let lat = document.querySelector('.selected_city').getAttribute('data-lat');
    let lon = document.querySelector('.selected_city').getAttribute('data-lon');
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${appID}`
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log('===========');
            console.log(data);
            console.log('===========');
            console.log(date(data.daily[3].dt * 1000));
            // console.log(date(1634030666));
            currentDate.innerHTML = date(data.daily[currentDateID].dt * 1000);
            mainTemp.innerHTML = Math.round(data.daily[currentDateID].temp.day) + '&deg';
            mainTempNight.innerHTML = 'Night: ' + Math.round(data.daily[currentDateID].temp.night) + '&deg';
            currentWeather.innerHTML = capitalizeFirstLetter(data.daily[currentDateID].weather[0].description);
            currentWeatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[currentDateID].weather[0].icon}@2x.png">`;
            windSpeed.innerHTML = Math.round(data.daily[currentDateID].wind_speed);
            cloudness.innerHTML = data.daily[currentDateID].clouds;
            console.log(data.daily[currentDateID].rain);
            humidity.innerHTML = data.daily[currentDateID].humidity;
            for (let i = 0; i < footerDates.length; i++) {
                footerDates[i].innerHTML = date(data.daily[i].dt * 1000).split(',')[1];
                footerIcons[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png">`;
                footerDegree[i].innerHTML = Math.round(data.daily[i].temp.day) + '&deg';
            }
        })

        .catch(function () {
            //catch any errors
        })
}

getDailyForecast(currentDateID)



