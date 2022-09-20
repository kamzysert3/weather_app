window.addEventListener("load", () => {
    setInterval(() => {
        document.querySelector("#preloader").style.display= 'none'
        document.querySelector('.body').style.display = 'block';   
    }, 3500); 
})

const api ={
    key: "fa3119d6803ad98f747ba0c05051eb09",
    base: "https://api.openweathermap.org/data/2.5/"
}

let searchable = [
    'Kaduna, Ng',
    'Abuja, Ng',
    'Lagos, Ng',
    'Imo, Ng',
    'Abia , Ng',
    'Florida, Us',
    'Carlifornia, Us',
];

const searchbx = document.getElementById('search')
const resultwrapper = document.querySelector('.results');
const searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

searchbx.addEventListener('focusout', a)
searchbx.addEventListener('focusin', b)

function a(){
    resultwrapper.classList.remove('show')
}

function b(){
    resultwrapper.classList.add('show')
}

searchbx.addEventListener('keyup', ()=>{
    let results = []
    let input = searchbx.value 
    if(input.length){
        results = searchable.filter((item) =>{
            return item.toLowerCase().includes(input.toLowerCase())
        })
    }

    renderResults(results)
    sgst()
})

let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low');

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}` )
    .then(weather =>{
        return weather.json();
    }).then(displayResults)
    .catch(() => {
        city.innerText = ""
        date.innerText = ""
        temp.innerText = ""
        weather_el.innerText = "Couldn't Find City"
        hilow.innerText = ""
    });
    searchbox.value = ""
}

function displayResults (weather){
    // console.log(weather);
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()
    date.innerText = dateBuilder(now);

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#176C</span>`;

    weather_el.innerText = `${weather.weather[0].main}`

    hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&#176C</span> / ${Math.round(weather.main.temp_max)}<span>&#176C</span>`;
}


function dateBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function renderResults(results){
    let content = results
        .map((item)=> {
            return `<div class="suggest">${item}</div>`
        })
        .join('')
        
    resultwrapper.classList.add('show')
    resultwrapper.innerHTML = `<ul>${content}</ul>`
}

function sgst(){
    let suggest = Array.from(document.querySelectorAll('.suggest'))
    suggest.map( sgt => {
        sgt.addEventListener('mousedown', (x) => {
            switch(x.target.innerText){
                default:
                    searchbx.value = x.target.innerText
            }
            // resultwrapper.classList.remove('show')
            getResults(searchbox.value)
            resultwrapper.innerHTML = ``
        })
    })
}