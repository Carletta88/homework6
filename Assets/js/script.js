var citySearchEl = document.querySelector("#citySearch");

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector("#search-input").nodeValue;
    
    if (!searchInputVal) {
        console.error("Please input a city name!");
        return;
    }


}citySearchEl.addEventListener("submit", handleSearchFormSubmit);

// add a function that allows the user to input a city name in the search box
// function to gather the parameters
// after inputing the user name the user can click the search button and be presented with the results for that city
// the user is also presented with the five day results for that city
// the city is stored under the search button along with any other recent searches
// my personal API Key 9e25d23bcd91708b2baf5fa31ef4f1b2
// the weather API https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} - put your personal API in the spot that says appid