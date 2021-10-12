let menuList = document.querySelector('.city_list');
let selectedCity = document.querySelector('.selected_city');
let dropdownArrow = document.querySelector('.city svg');
let features = document.querySelector('.features');


for (let i = 0; i < cityList.length; i++) {
    menuList.innerHTML += `<li class="city_option" data-id="${cityList[i].id}" data-lat="${cityList[i].coord.lat}" data-lon="${cityList[i].coord.lon}">${cityList[i].name}</li>`;
}

document.querySelector('.city').onclick = function () {
    menuList.classList.toggle('visible');
    dropdownArrow.classList.toggle('turn_right');
}

menuList.onclick = function (event) {
    let target = event.target;
    selectedCity.innerHTML = target.innerHTML;
    selectedCity.setAttribute('data-id', target.getAttribute('data-id'));
    selectedCity.setAttribute('data-lat', target.getAttribute('data-lat'));
    selectedCity.setAttribute('data-lon', target.getAttribute('data-lon'));
    getDailyForecast(currentDateID)
}


let days = document.querySelectorAll('.day');
for (let i = 0; i < days.length; i++) {
    days[i].onclick = function() {
        document.querySelector('.selected').classList.remove('selected');
        days[i].classList.add('selected');
        currentDateID = i;
        getDailyForecast(currentDateID);
    }
}


document.querySelector('.options svg').onclick = function() {
    features.classList.toggle('features_visible')
}