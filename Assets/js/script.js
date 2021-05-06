var citySearchEl = document.querySelector("#citySearch");
var searchInputVal = document.querySelector("#search-input");
var recentSearchEl = document.querySelector(".recentSearches");
var currentResultsEl = document.querySelector(".currentResults");
var

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector("#search-input").nodeValue;
    
    if (!searchInputVal) {
        console.error("Please input a city name!");
        return;
    }


}citySearchEl.addEventListener("submit", handleSearchFormSubmit);

function gatherParams() {
    var Para
}

// add a function that allows the user to input a city name in the search box
// function to gather the parameters
// after inputing the user name the user can click the search button and be presented with the results for that city
// the user is also presented with the five day results for that city
// the city is stored under the search button along with any other recent searches
// my personal API Key 9e25d23bcd91708b2baf5fa31ef4f1b2
// the weather API https://api.openweathermap.org/data/2.5/forecast/daily?q + q=CITY&cnt=5units=imperial&appid=9e25d23bcd91708b2baf5fa31ef4f1b2

// example of working API http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9e25d23bcd91708b2baf5fa31ef4f1b2