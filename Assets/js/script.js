var citySearchEl = document.querySelector("#citySearch");
var searchInputVal = document.querySelector("#search-input");
var recentSearchEl = document.querySelector(".recentSearches");
var currentResultsEl = document.querySelector(".currentResults");

var apiKey = '9e25d23bcd91708b2baf5fa31ef4f1b2';
var recentSearches = [];


function displayCityWeather() {
    var selctedCity = $(this).attr("data-city");

    $(".currentResults").empty();
    getCurrentWeather(selctedCity, apiKey);

    $(".fiveDayResults").empty();
    getForecast(selctedCity, apiKey);
}

function getCurrentWeather(newCity, apiKey) {
    var weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${apiKey}`;
    var cityLat;
    var cityLong;

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (data) {
        $(".currentResults").append(
            `<div class="row ml-1">
                <h3 class="mr-3">${data.name} (${(new Date(1000 * data.dt).getUTCMonth()) + 1}/${(new Date(1000 * data.dt).getUTCDate()) - 1}/${new Date(1000 * data.dt).getUTCFullYear()})</h3>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            </div>`
        )
        $(".currentResults").append(`<li>Temp: ${data.main.temp} &degF</li>`)
        $(".currentResults").append(`<li>Humidity: ${data.main.humidity} %</li>`)
        $(".currentResults").append(`<li>Wind: ${data.wind.speed} mph</li>`)
        cityLat = data.coord.lat;
        cityLong = data.coord.lon;
        getUVI(apiKey, cityLat, cityLong);
    })

}

function getForecast(newCity, apiKey) {
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${newCity}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (data) {
        for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.search("15:00:00") != -1) {
                var forecastDate = data.list[i];
                $(".forecast").append(
                    `<div class="card bg-primary shadow m-4">
                        <div class="card-body">
                            <h4 class="card-title">${(new Date(1000 * forecastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forecastDate.dt).getUTCDate()}/${new Date(1000 * forecastDate.dt).getUTCFullYear()}</h4>
                            <div class="card-text">
                                <p class="card-text">Temp: ${forecastDate.main.temp} &degF</p>
                                <p class="card-text">Humidity: ${forecastDate.main.humidity} %</p>
                            </div>
                        </div>
                    </div>`
                );
            }
        }

    })
}

function getUVI(apiKey, cityLat, cityLong) {
    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLong}&appid=${apiKey}`;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (data) {
        $(".currentResults").append(`<p>UV Index: <span class="badge badge-danger p-2">${data.value}</span></p>`);
    })
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        recentSearches = storedCities;
    }

    recentCities();

    if (recentSearches) {
        var newCity = recentSearches[recentSearches.length - 1]
        getCurrentWeather(newCity, apiKey);
        getForecast(newCity, apiKey);
    }
}

init();


$("form").on("submit", function(event) {
    event.preventDefault();
    
    var newCity = $("#search-input").val().trim();
    recentSearches.push(newCity);
    recentCities();
    saveCities();
    $("#search-input").val("");
})

function saveCities() {
    localStorage.setItem("cities", JSON.stringify(recentSearches));
}

function recentCities(){
    $(".recentSearches").empty();
    recentSearches.forEach(function(city) {
        $(".recentSearches").prepend($(`<button class="list-group-item list-group-item-action searchButton" data-city="${city}">${city}</button>`));
    })
}

$(".recentSearches").on("click", "#searchButton", displayCityWeather);


