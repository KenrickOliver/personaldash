const timeHeading = document.querySelector('.time-heading')
const dateHeading = document.querySelector('.date-heading')
const quote = document.getElementById("quote")
const author = document.getElementById("author")

const saveBtn = document.getElementById('input-button')

saveBtn.addEventListener('click', () => {
    console.log('click')
})

//Fetch weather data
navigator.geolocation.getCurrentPosition(position => {

    let lon = position.coords.longitude;
    let lat = position.coords.latitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=769398ad3f3991bbc1a073eb37da612a`)
    .then(res => {
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
        <h3>Weather in: ${data.name}</h3>
        <p class="weather-temp">${Math.round(data.main.temp)} ºC</p>
        <img
          id="weather-icon"
          class="weather-icon"
          src=${iconUrl}
          alt="weather icon"
        />
        <div class="weather-info>
            <p class="weather-description">${data.weather[0].description}</p>
            <p class="weather-humidity">${data.main.humidity} %</p>
            <p class="weather-wind">${data.wind.speed} km/h</p>
        </div>
        `
    })
    .catch(err => console.error(err))
    
});

/*
coords: GeolocationCoordinates
accuracy: 1960
altitude: null
altitudeAccuracy: null
heading: null
latitude: 43.58144
longitude: -79.6229632
speed: null
*/

// Function to getquote
function getQuote() {
    
    fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then((data) => {
            let randInd = Math.floor(Math.random() * data.length)
            let auth = (data[randInd].author ? data[randInd].author : 'Unknown')
            quote.innerHTML = `${data[randInd].text}`
            author.innerHTML = `${auth}`
  })
        .catch(err => {
            console.log(err)
            let txt = 'Once you choose hope, anythings possible.';
            let auth = 'Christopher Reeve'
            quote.innerHTML = `${txt}`
            author.innerHTML = `${auth}`
        })
}
getQuote();

//Function to get and display the current Date/Time
function setTime() {
    let today = new Date();
    let date = 'Date: ' + today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = 'Time: ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+" "+(today.getHours()<12 ? 'AM' : 'PM');

    timeHeading.innerHTML = time;
    dateHeading.innerHTML = date;
}

setInterval(setTime, 1000); //Update the time every second(1000 milliseconds)