const timeHeading = document.querySelector(".time-heading");
const dateHeading = document.querySelector(".date-heading");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Function to getquote
function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      let randInd = Math.floor(Math.random() * data.length);
      let auth = data[randInd].author ? data[randInd].author : "Unknown";
      quote.innerHTML = `${data[randInd].text}`;
      author.innerHTML = `${auth}`;
    })
    .catch((err) => {
      console.log(err);
      let txt = "Once you choose hope, anythings possible.";
      let auth = "Christopher Reeve";
      quote.innerHTML = `${txt}`;
      author.innerHTML = `${auth}`;
    });
}
getQuote();

/* **FETCHING THE POSTION AND WEATHER** */
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getWeather = () => {
  getPosition()
    .then((position) => {
      const { latitude: lat, longitude: lon } = position.coords;

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=769398ad3f3991bbc1a073eb37da612a`
      );
    })
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
            <h3>Weather in: ${data.name}</h3>
            <p class="weather-temp">${Math.round(data.main.temp)} ºC</p>
            <img
              id="weather-icon"
              class="weather-icon"
              src=${iconUrl}
              alt="weather icon"
            />
            <div class="weather-info">
                <p class="weather-humidity">Humidity: ${
                  data.main.humidity
                } %</p>
                <p class="weather-description">${
                  data.weather[0].description
                }</p>
                <p class="weather-wind">Speed: ${data.wind.speed} km/h</p>
            </div>
            `;
    })
    .catch((err) => console.error(err));
};

getWeather();


// ** Clock and Time Functionality **

const hour = document.getElementById("clock-hour");
const minutes = document.getElementById("clock-minutes");
const seconds = document.getElementById("clock-seconds");

const clock = () => {
  let date = new Date();

  let hh = date.getHours() * 30;
  let mm = date.getMinutes() * 6;
  let ss = date.getSeconds() * 6;

  //adding rotation to clock hands
  hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  minutes.style.transform = `rotateZ(${mm}deg)`;
  seconds.style.transform = `rotateZ(${ss}deg)`;
};
setInterval(clock, 1000);

// Date and Time functionality
const textHour = document.getElementById("text-hour");
const textMinutes = document.getElementById("text-minutes");
const textAmPm = document.getElementById("text-ampm");
const dateDay = document.getElementById("date-day");
const dateMonth = document.getElementById("date-month");
const dateYear = document.getElementById("date-year");

const clockText = () => {
  let date = new Date();

  let hh = date.getHours();
  let mm = date.getMinutes();
  let ampm;
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  //switch to 12 hour instead of 24 hours for more readable time
  if (hh >= 12) {
    hh = hh - 12;
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  // Chek if its was 12 AM
  if (hh == 0) {
    hh = 12;
  }

  // Since using 12 hours instad of 24, show 0s before
  //Os before hours
  if (hh < 10) {
    hh = `0${hh}`;
  }
  //Os before minutes
  if (mm < 10) {
    mm = `0${mm}`;
  }

  //Show am or pm
  textAmPm.innerHTML = ampm;

  //Show day, month and year
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  dateDay.innerHTML = day;
  dateMonth.innerHTML = `${months[month]},`;
  dateYear.innerHTML = year;

  //Showing the Time
  textHour.innerHTML = `${hh}:`;

  //Show minutes
  textMinutes.innerHTML = `${mm}`;
};
setInterval(clockText, 1000);

/* *** TIMER Functionality *** */
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");

let workMinutes = document.getElementById("w-minutes");
let workSeconds = document.getElementById("w-seconds");

let breakMinutes = document.getElementById("b-minutes");
let breakSeconds = document.getElementById("b-seconds");

let listCounter = document.querySelector(".counter-list");

//store a reference to a timer variable
let startTimer;

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("Timer is already running");
  }
});

reset.addEventListener("click", function () {
  workMinutes.innerText = 1;
  workSeconds.innerText = "00";

  breakMinutes.innerText = 1;
  breakSeconds.innerText = "00";

  document.getElementById("counter").innerText = 0;
  listCounter.innerHTML = "";
  stopInterval();
  startTimer = undefined;
});

stop.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
});

//Start Timer Function
function timer() {
  //Work Timer Countdown
  if (workSeconds.innerText != 0) {
    workSeconds.innerText--;
  } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
    workSeconds.innerText = 59;
    workMinutes.innerText--;
  }

  //Break Timer Countdown
  if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
    if (breakSeconds.innerText != 0) {
      breakSeconds.innerText--;
    } else if (breakMinutes.innerText != 0 && breakSeconds.innerText == 0) {
      breakSeconds.innerText = 59;
      breakMinutes.innerText--;
    }
  }

  //Increment Counter by one if one full cycle is completed
  if (
    workMinutes.innerText == 0 &&
    workSeconds.innerText == 0 &&
    breakMinutes.innerText == 0 &&
    breakSeconds.innerText == 0
  ) {
    workMinutes.innerText = 1;
    workSeconds.innerText = "00";

    breakMinutes.innerText = 1;
    breakSeconds.innerText = "00";

    document.getElementById("counter").innerText++;
    addItem();
  }
}

//Stop Timer Function
function stopInterval() {
  clearInterval(startTimer);
}

// Tracking Cycles via pomos
function addItem() {
  let newImage = document.createElement("img");
  newImage.setAttribute("class", "image-item");
  newImage.setAttribute("alt", "work peach");
  newImage.src = "./assets/peach.png";

  let liItem = document.createElement("li");
  liItem.setAttribute("class", "li-item");
  liItem.appendChild(newImage);
  listCounter.appendChild(liItem);
}

// ***** NOTES Functionality *****

const addBtn = document.getElementById("add");
const notesContainer = document.querySelector(".notes-container");

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = " ") {
  console.log("Note added!");
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
        <div class="tools">
            <button class="edit">Edit <i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main-note ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainNote = note.querySelector(".main-note");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  mainNote.innerHTML = marked.parse(text);

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener("click", () => {
    mainNote.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (event) => {
    const { value } = event.target;

    mainNote.innerHTML = marked.parse(value);

    updateLS();
  });

  notesContainer.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
