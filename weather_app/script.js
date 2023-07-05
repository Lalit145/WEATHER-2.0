const input = document.getElementById("input-box");
const searchBtn = document.getElementById("searchBtn");
const current = document.getElementById("current");
const weather_img = document.getElementById("weather-img");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind_speed = document.getElementById("wind-speed");

async function checkweather(location) {
  const api_key = "38bdd39b6e397d7e8aed99cf722214ae";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;
  const weatherdata = await fetch(`${url}`).then((response) => response.json());
  console.log(weatherdata);
  if (weatherdata.cod === `404`) {
    alert("Location not Found");
  }

  temperature.innerHTML = `${Math.round(
    weatherdata.main.temp - 273.15
  )}<sup>°C</sup>`;
  description.innerHTML = `${weatherdata.weather[0].main}`;
  humidity.innerHTML = `${weatherdata.main.humidity}%`;
  pressure.innerHTML = `${weatherdata.main.pressure}`;
  wind_speed.innerHTML = `${weatherdata.wind.speed}Km/H`;

  switch (weatherdata.weather[0].main) {
    case "Clouds":
      weather_img.src = "cloudy-day.png";
      break;
    case "Clear":
      weather_img.src = "clear-sky.png";
      break;
    case "Rain":
      weather_img.src = "rainy.png";
      break;
    case "Haze":
      weather_img.src = "fog.png";
      break;
    case "Snow":
      weather_img.src = "snow.png";
      break;
    case "Thunderstorm":
      weather_img.src = "thunder.png";
      break;
    case "Mist":
      weather_img.src = "mist.png";
      break;
    default:
      weather_img.src = "cloud-computing.png";
      break;
  }
}
$(document).ready(function () {
  // Initialize select2
  $("#selUser").select2();

  // Read selected option
  $("#but_read").click(async function () {
    const api_key = "38bdd39b6e397d7e8aed99cf722214ae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;
    const weatherdata = await fetch(`${url}`).then((response) =>
      response.json()
    );
  });
});

searchBtn.addEventListener("click", () => {
  checkweather(selUser.options[selUser.value].text);
});

selUser.addEventListener("input", function () {
  const query = selUser.value.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.innerText.toLowerCase();

    if (text.includes(query)) {
      item.style.display = "block"; // Show the item
    } else {
      item.style.display = "none"; // Hide the item
    }
  }
});
current.addEventListener("click", function () {
  if (navigator.geolocation) {
    console.log(navigator.geolocation.getCurrentPosition(successCallback));
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  async function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    const api_key = "38bdd39b6e397d7e8aed99cf722214ae";
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then((response) =>
      response.json()
    );

    checkweather(weather_data[0].state);
  }
});
