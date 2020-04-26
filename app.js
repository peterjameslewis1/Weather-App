const current = document.querySelector('#current');
const hourly = document.querySelector('#hourly');
const map = document.querySelector('.weather-map');
let city = document.querySelector("#weather-search").value;


let URL = 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=891f23ddd620354c9cedb1ceb5a8a36b';
let URL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=891f23ddd620354c9cedb1ceb5a8a36b';
let URL2 = 'http://maps.openweathermap.org/maps/2.0/weather/PAR0/5/51.51/-0.13?date=1527811200&appid=891f23ddd620354c9cedb1ceb5a8a36b';


const fetchCurrent = (value) => {


    // Fetch Request //
    fetch(value)
        .then((response) => {
            if (!response.ok)
                console.log(`Error: ${response.status}`);

            return response.json();
        })
        .then((data) => {
            console.log(data);
            current.append(x(data));
        })
    // Fetch Request End //
};



const fetchHourly = (value) => {
    // Fetch Request

    fetch(value)
        .then((response) => {
            if (!response.ok)
                console.log(`Error: ${response.status}`);

            return response.json();
        })
        .then((data1) => {
            console.log(data1);
            hourly.append(y(data1));
        });
    // Fetch Request End //
};



fetchCurrent(URL);
fetchHourly(URL1);


// Search Bar Click Event //
const inputSearch = () => {
    const submitClick = document.querySelector('#submit').addEventListener('click', function () {
        let city = document.querySelector("#weather-search").value;

        let URLClicked = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';
        let URL1Clicked = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';

        fetchCurrent(URLClicked);
        fetchHourly(URL1Clicked);
    });

    const submitKey = document.querySelector('#weather-search').addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            let city = document.querySelector("#weather-search").value;

            let URLClicked = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';
            let URL1Clicked = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=891f23ddd620354c9cedb1ceb5a8a36b';
            fetchCurrent(URLClicked);
            fetchHourly(URL1Clicked);
        }
    });
};
inputSearch();

// Search Bar Click Event End //





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
    temp.innerHTML = `${dataMain[0]}°`;
    feelsLike.innerHTML = `Feels Like <span>${dataMain[1]}°</span>`;
    tempMin.innerHTML = `Low <span>${dataMain[2]}°</span>`;
    tempMax.innerHTML = `High <span>${dataMain[3]}°</span>`;
    wind.innerHTML = `Wind speed <span>${data.wind.speed}kph</span>`;
    humidity.innerHTML = `Humidity <span>${dataMain[5]}%</span>`;
    return '';;
};

function y(data1) {
    for (let i = 0; i < 9; i++) {
        // Store data in variables
        const icon = data1.list[i].weather[0].icon;
        const description = data1.list[i].weather[0].description;
        const temp = Math.round(data1.list[i].main.temp);
        let time = data1.list[i].dt_txt;
        const newTime = time.slice(11, 16);

        /*         console.log(icon);
                console.log(description);
                console.log(temp);
                console.log(newTime); */
        const outerContainer = document.getElementById('test-div-container');
        const container = document.getElementById('test-div');
        // Create Elements
        var a = document.createElement("img");
        var b = document.createElement("div");
        var c = document.createElement("div");
        var d = document.createElement("div");

        // Add Class
        a.className = "test-img";
        b.className = "test-div";
        c.className = "test-div";
        d.className = "test-div";
        // Add innerHTML
        a.src = `./images/${icon}@2x.png`;
        b.innerHTML = `${description}`;
        c.innerHTML = `${temp}°`;
        d.innerHTML = `${newTime}`;
        // Append Elements
        container.innerHTML = "";
        container.appendChild(a);
        container.appendChild(b);
        container.appendChild(c);
        container.appendChild(d);
        outerContainer.appendChild(container);
        hourly.appendChild(outerContainer);
    };
    return '';
};

// Update innerHTML Function End //




// SIDEBAR //

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

//Add event from js the keep the marup clean
function init() {
    document.getElementById("open-menu").addEventListener("click", toggleMenu);
    document.getElementById("close").addEventListener("click", toggleMenu);
    document.getElementById("create-acc").addEventListener("click", toggleMenu);
    document.getElementById("create-acc").addEventListener("click", signUp);
    document.getElementById("login").addEventListener("click", toggleMenu);
    document.getElementById("login").addEventListener("click", login);
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "menu-open")) {
        addClass(ele, "menu-open");
    } else {
        removeClass(ele, "menu-open");
    }
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        init();
    }
});

// SIDEBAR END //

const signUp = () => {
    const clicked = document.querySelector('.container-login');
    clicked.classList.remove('clicked');

    document.querySelector('.container-login span i').addEventListener('click', function () {
        clicked.classList.add('clicked');
    })
}

const login = () => {
    document.querySelector('.container-login h2').innerHTML = 'Login';
    document.querySelector('.container-login p').style.display = 'none';
    document.querySelector('.container-login button').innerHTML = 'Login';
    const clicked = document.querySelector('.container-login');
    clicked.classList.remove('clicked');

    document.querySelector('.container-login span i').addEventListener('click', function () {
        clicked.classList.add('clicked');
    })
}









// Username & Password Check //

document.getElementById("sign-up").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.length >= 6 && password.length >= 6) {
        if (username.includes(" ") || password.includes(" ")) {
            document.getElementById("validLogin").innerHTML = "No Spaces";
        } else {
            // document.getElementById("validLogin").innerHTML = "Account Created!";
            document.querySelector('#sign-up').addEventListener('click', () => {
                document.querySelector('#sign-up img').classList.remove('clicked');
                setTimeout(function () {
                    document.location.reload()
                }, 3000);
                setTimeout(function () {
                    document.getElementById("validLogin").innerHTML = "Account Created!";
                }, 1000);
            })
        }
    } else {
        document.getElementById("validLogin").innerHTML = "Credentials must be greater than 6 characters.";
    }
});
// Username & Password Check END //
