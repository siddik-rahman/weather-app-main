const API_KEY = "d59ed60418200aa188184af90b2a2519";
const input = document.getElementById("inputText");
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", getWeather);
async function getWeather() {
    const city = input.value;
    if(!city) {
        alert("Please enter a city name");
        return;
    }
    
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    if(data.cod !== 200) {
        alert(data.message);
        return;
    }

    document.querySelector(".top-card h2").textContent = data.name;
    document.querySelector(".top-card p").textContent = new Date().toDateString();
    document.querySelector(".top-card h1").textContent = Math.round(data.main.temp)+ "°C";

    document.querySelector(".box .feel-like").textContent = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".box .humidity").textContent = data.main.humidity + "%";
    document.querySelector(".box .wind").textContent = Math.round(data.wind.speed) + " mph ";
    const precipitation = data.rain ? data.rain["1h"] : 0;

    document.querySelector(".box .precipitation").textContent = precipitation + " in ";
    const days = document.querySelectorAll(".day");
    days.forEach((day, index) => {
        day.querySelector(".high").textContent = Math.round(data.main.temp_max) + "°";
        day.querySelector(".low").textContent = Math.round(data.main.temp_min) + "°";
        day.querySelector("img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    });

const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
const forecastData = await forecastRes.json();
const hours = document.querySelectorAll(".hour");
hours.forEach((hourEl, index) => {
    const item = forecastData.list[index];
    hourEl.querySelector(".hour-temp").textContent = Math.round(item.main.temp) + "°";
    hourEl.querySelector("img").src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
})





   
  

}

