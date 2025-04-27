/*|| RANDOM QUOTE GENERATOR CARD */

let quote;
let author;

function getQuote() {
    fetch("https://qapi.vercel.app/api/random")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            quote = data.quote;
            author = data.author;
            document.querySelector(".quote p").innerHTML = quote;
            document.querySelector(".quote h4").innerHTML = `- ${author}`;
        })
        .catch((error) => {
            console.log(error);
        })
}

window.addEventListener('DOMContentLoaded', getQuote);




/*|| WEATHER CARD */

let city;
let country;
let temp;
let humidity;
let conditionText;
let conditionIcon;
let feelsLikeTemp;

fetch("https://api.weatherapi.com/v1/current.json?key=794ecc358ea146be9a391627252104&q=bhilai&aqi=no")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        city = data.location.name;
        country = data.location.country;
        temp = data.current.temp_c;
        humidity = data.current.humidity;
        conditionIcon = data.current.condition.icon;
        conditionText = data.current.condition.text;
        feelsLikeTemp = data.feelslike_c;


        document.querySelector(".temp").innerHTML = `${temp}°C`;
        document.querySelector(".condition img").src = "https:" + conditionIcon;
        document.querySelector(".condition h4").innerHTML = conditionText;
        document.querySelector(".location").innerHTML = `${city} , ${country}`;
        document.querySelector(".humidity").innerHTML = `Humidity : ${humidity}`;
    })
    .catch((error) => {
        console.log(error)
    })



/*|| DATE-TIME CARD */

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = String(today.getFullYear());
const time = String(today.getTime())

let fullDate = `<span class="day-month">${day}/${month}</span><br><span class="year">${year}</span>`

document.querySelector(".date-time .date").innerHTML = fullDate;


setInterval(() => {

    document.querySelector(".hrs").innerHTML = (new Date().getHours() < 10 ? "0" : "") + new Date().getHours();

    document.querySelector(".min").innerHTML = (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes();

    document.querySelector(".sec").innerHTML = (new Date().getSeconds() < 10 ? "0" : "") + new Date().getSeconds();

}, 1000);






/*|| POMODORO TIMER CARD */


const session = document.querySelector(".session")
const longBreak = document.querySelector(".long-break")
const shortBreak = document.querySelector(".short-break")
const timer = document.querySelector(".timer")
const startButton = document.querySelector(".start-button")
const stopButton = document.querySelector(".stop-button")
const endButton = document.querySelector(".end-button")

let timeInSeconds;
let selectedDuration = 25;
let defaultDuration;
let value;
let intervalId;


startButton.classList.add("disabled")
stopButton.classList.add("disabled")
endButton.classList.add("disabled")

function setDuration(minutes) {
    selectedDuration = minutes;
    timeInSeconds = selectedDuration * 60;
    defaultDuration = selectedDuration * 60;
    timer.innerHTML = formatTime(selectedDuration * 60);

    startButton.classList.remove("disabled")
    stopButton.classList.remove("disabled")
    endButton.classList.remove("disabled")
}

function formatTime(interval) {
    let min = String(Math.floor(interval / 60)).padStart(2, "0")
    let secs = String(interval % 60).padStart(2, "0")
    return `${min}:${secs}`
}

function startTimer() {
    clearInterval(intervalId);
    session.classList.add("disabled")
    longBreak.classList.add("disabled")
    shortBreak.classList.add("disabled")
    intervalId = setInterval(() => {
        if (timeInSeconds <= 0) {
            stopTimer();
            console.log("stop")
            return;
        }
        timeInSeconds--;
        timer.innerHTML = formatTime(timeInSeconds);
    }, 1000);

}

function stopTimer() {
    clearInterval(intervalId);
}

function resetTimer() {
    clearInterval(intervalId);
    timeInSeconds = defaultDuration;
    // console.log(formatTime(timeInSeconds))
    timer.innerHTML = formatTime(timeInSeconds);
    session.classList.remove("disabled")
    longBreak.classList.remove("disabled")
    shortBreak.classList.remove("disabled")
}



/*|| TO DO LIST CARD */

const button = document.querySelector(".add_task button");
const inputBox = document.querySelector(".add_task input");
const listArea = document.querySelector(".display_task");


function addTask() {

    if (inputBox.value === "") {
        alert("add tasks");

    }

    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listArea.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "❌";
        li.appendChild(span);


        span.addEventListener('click', () => {
            li.remove();
            saveData();
        })

        li.addEventListener('click', () => {
            li.classList.toggle("checked");
            saveData();
        })
    }

    inputBox.value = "";
    saveData();

}

function saveData() {
    localStorage.setItem("data", listArea.innerHTML);
}


function showData() {
    listArea.innerHTML = localStorage.getItem("data");
    // console.log(localStorage.getItem("data"));

    let allListItems = listArea.querySelectorAll("li");
    allListItems.forEach((li) => {
        let span = li.querySelector("span");

        span.addEventListener("click", () => {
            li.remove();
            saveData();
        });

        li.addEventListener("click", () => {
            li.classList.toggle("checked");
            saveData();
        });
    });
}

showData();


/*|| JOURNAL CARD */

const journal = document.querySelector("#journal_area");

function saveJournalData() {
    localStorage.setItem("JournalData", journal.value)
}

function showJounrnalData() {
    const saved = localStorage.getItem("JournalData");
    if (saved) {
        journal.value = saved;
    }
}

showJounrnalData();

journal.addEventListener('input', saveJournalData)