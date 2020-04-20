const current = document.querySelector('#current');
const hourly = document.querySelector('#hourly');
let city = document.querySelector("#weather-search").value;

let URL = 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=891f23ddd620354c9cedb1ceb5a8a36b';
let URL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=891f23ddd620354c9cedb1ceb5a8a36b';
let URLClicked1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';
let URLForecast1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';


const fetchCurrent = (URL) => {
    // Fetch Request //

    fetch(URL)
        .then((response) => {
            if (!response.ok)
                console.log(`Error: ${response.status}`);

            return response.json();
        })
        .then((data) => {
            console.log(data, 'Data');
            current.append(x(data));
        })
    // Fetch Request End //
};



const fetchHourly = (URL) => {
    // Fetch Request

    fetch(URL1)
        .then((response) => {
            if (!response.ok)
                console.log(`Error: ${response.status}`);

            return response.json();
        })
        .then((data1) => {
            console.log(data1, 'Data1');
            // hourly.append(y(data1));
        });
    // Fetch Request End //
};
fetchCurrent(URL);
fetchHourly(URL1);



// Update innerHTML Function //

function x(data) {
    const h2 = document.querySelector('#current h2');
    const h3 = document.querySelector('#current h3');
    const img = document.querySelector('#current img');
    const temp = document.querySelector('#current .temp');
    const feelsLike = document.querySelector('.tile .feels-like');
    const tempMin = document.querySelector('.tile .temp-min');
    const tempMax = document.querySelector('.tile .temp-max');
    const wind = document.querySelector('.tile .wind');
    const humidity = document.querySelector('.tile .humidity');


    const arr = Object.values(data.main);
    const dataMain = arr.map(x => Math.round(x));


    h2.innerHTML = `Current forecast in ${data.name}, ${data.sys.country}`;
    h3.innerHTML = `${data.weather[0].description}`;
    img.src = `./images/${data.weather[0].icon}@2x.png`;
    temp.innerHTML = `${dataMain[0]}oC`;
    feelsLike.innerHTML = `Feels Like <span>${dataMain[1]}oC</span>`;
    tempMin.innerHTML = `Low <span>${dataMain[2]}oC</span>`;
    tempMax.innerHTML = `High <span>${dataMain[3]}oC</span>`;
    wind.innerHTML = `Wind speed <span>${data.wind.speed}mph</span>`;
    humidity.innerHTML = `Humidity <span>${dataMain[5]}%</span>`;
};

function y(data1) {

};

// Update innerHTML Function End //




// Search Bar Click Event //

const getWeather = document.querySelector('#submit').addEventListener('click', function () {
    // QuerySelectors

    fetchCurrent(URLCurrent1);
    fetchHourly(URLForecast1);



});

// Search Bar Click Event End //