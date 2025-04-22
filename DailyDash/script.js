
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

