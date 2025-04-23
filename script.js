
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

function setDuration(minutes) {
    selectedDuration = minutes;
    timeInSeconds = selectedDuration * 60;
    defaultDuration = selectedDuration * 60;
    timer.innerHTML= formatTime(selectedDuration*60);
}

function formatTime(interval) {
    let min = String(Math.floor(interval / 60)).padStart(2, "0")
    let secs = String(interval % 60).padStart(2, "0")
    return `${min}:${secs}`
}

function startTimer() {
   clearInterval(intervalId);
    intervalId = setInterval(() => {
        if(timeInSeconds<=0){
           stopTimer();
           console.log("stop")
           return;
        }
        timeInSeconds--;
        timer.innerHTML= formatTime(timeInSeconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function resetTimer() {
    clearInterval(intervalId);
    timeInSeconds = defaultDuration;
    // console.log(formatTime(timeInSeconds))
    timer.innerHTML=formatTime(timeInSeconds);
}






