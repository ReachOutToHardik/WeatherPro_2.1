const WEATHER_API_KEY = "1bd6f76a62bb90328909f8136f466b63"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

// Fetch weather details
document
  .getElementById("fetchWeatherBtn")
  .addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      weatherDiv.innerHTML =
        '<p class="placeholder">Please enter a city name.</p>';
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
    weatherDiv.innerHTML = "<p>Loading...</p>"; // Show loading message

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found. Please try again.");

      const data = await response.json();

      // Log the full API response to the console
      console.log("OpenWeatherMap API Response:", data);

      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherDiv.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="${iconUrl}" alt="${
        data.weather[0].description
      }" class="weather-icon" />
          <p class="temperature">${data.main.temp}°C</p>
          <p>${data.weather[0].main} - ${data.weather[0].description}</p>
          <div class="weather-details">
            <div>
              <i class="fas fa-thermometer-half"></i>
              <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
            </div>
            <div>
              <i class="fas fa-wind"></i>
              <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </div>
            <div>
              <i class="fas fa-sun"></i>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            </div>
            <div>
              <i class="fas fa-cloud"></i>
              <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
            </div>
            <div>
              <i class="fas fa-tint"></i>
              <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
            </div>
            <div>
              <i class="fas fa-eye"></i>
              <p><strong>Visibility:</strong> ${(
                data.visibility / 1000
              ).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherDiv.innerHTML = `<p class="placeholder">${error.message}</p>`;
    }
  });
