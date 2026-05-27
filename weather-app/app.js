// ============================================================
//  SkyWatch — Weather App
//  Uses OpenWeatherMap API (free tier)
//  Get your free API key at: https://openweathermap.org/api
// ============================================================

const API_KEY = "YOUR_API_KEY_HERE"; // 🔑 Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ── DOM References ───────────────────────────────────────────
const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const errorMsg    = document.getElementById("errorMsg");
const loader      = document.getElementById("loader");
const weatherCard = document.getElementById("weatherCard");
const defaultHint = document.getElementById("defaultHint");

// Weather display fields
const cityNameEl    = document.getElementById("cityName");
const countryEl     = document.getElementById("country");
const dateTimeEl    = document.getElementById("dateTime");
const tempValueEl   = document.getElementById("tempValue");
const weatherIconEl = document.getElementById("weatherIcon");
const condMainEl    = document.getElementById("conditionMain");
const condDescEl    = document.getElementById("conditionDesc");
const feelsLikeEl   = document.getElementById("feelsLike");
const humidityEl    = document.getElementById("humidity");
const windSpeedEl   = document.getElementById("windSpeed");
const visibilityEl  = document.getElementById("visibility");
const pressureEl    = document.getElementById("pressure");
const cloudsEl      = document.getElementById("clouds");
const sunriseEl     = document.getElementById("sunrise");
const sunsetEl      = document.getElementById("sunset");

// ── Event Listeners ──────────────────────────────────────────
searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// ── Core Functions ───────────────────────────────────────────

/**
 * Handles the search action triggered by button or Enter key.
 */
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
}

/**
 * Fetches weather data from OpenWeatherMap API.
 * @param {string} city - City name to fetch weather for
 */
async function fetchWeather(city) {
  showLoader();
  hideError();

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found");
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your key in app.js");
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    console.error("Weather fetch error:", error.message);
    showError(error.message);
    hideLoader();
    showDefaultHint();
    hideWeatherCard();
  }
}

/**
 * Populates the UI with weather data from the API response.
 * @param {Object} data - Raw JSON response from OpenWeatherMap
 */
function displayWeather(data) {
  // Location
  cityNameEl.textContent  = data.name;
  countryEl.textContent   = getCountryName(data.sys.country);
  dateTimeEl.textContent  = formatDateTime(new Date());

  // Temperature
  tempValueEl.textContent = Math.round(data.main.temp);

  // Condition
  const weather  = data.weather[0];
  condMainEl.textContent  = weather.main;
  condDescEl.textContent  = weather.description;
  weatherIconEl.src       = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  weatherIconEl.alt       = weather.description;

  // Stats
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent  = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
  visibilityEl.textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "N/A";
  pressureEl.textContent  = `${data.main.pressure} hPa`;
  cloudsEl.textContent    = `${data.clouds.all}%`;

  // Sunrise / Sunset (UTC + timezone offset)
  const tz = data.timezone;
  sunriseEl.textContent = formatUnixTime(data.sys.sunrise, tz);
  sunsetEl.textContent  = formatUnixTime(data.sys.sunset,  tz);

  // Show card
  hideLoader();
  hideDefaultHint();
  showWeatherCard();
}

// ── Helper Utilities ─────────────────────────────────────────

/**
 * Converts a Unix timestamp + timezone offset to a human-readable time string.
 * @param {number} unixTime - Unix timestamp in seconds
 * @param {number} offsetSeconds - Timezone offset in seconds
 * @returns {string} Formatted time like "06:42 AM"
 */
function formatUnixTime(unixTime, offsetSeconds) {
  const date = new Date((unixTime + offsetSeconds) * 1000);
  const hours   = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm    = hours >= 12 ? "PM" : "AM";
  const h12     = hours % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

/**
 * Formats a Date object into a readable string.
 * @param {Date} date
 * @returns {string} e.g. "Wednesday, 27 May 2026"
 */
function formatDateTime(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Converts a 2-letter country code to a full country name.
 * Falls back to the code itself if not found.
 * @param {string} code - ISO 3166-1 alpha-2 country code
 * @returns {string}
 */
function getCountryName(code) {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

// ── UI State Helpers ─────────────────────────────────────────
function showLoader()       { loader.classList.remove("hidden"); }
function hideLoader()       { loader.classList.add("hidden"); }
function showWeatherCard()  { weatherCard.classList.remove("hidden"); }
function hideWeatherCard()  { weatherCard.classList.add("hidden"); }
function showDefaultHint()  { defaultHint.classList.remove("hidden"); }
function hideDefaultHint()  { defaultHint.classList.add("hidden"); }

function showError(message) {
  errorMsg.textContent = message || "Something went wrong. Please try again.";
  errorMsg.classList.remove("hidden");
  // Re-trigger animation
  errorMsg.style.animation = "none";
  void errorMsg.offsetWidth;
  errorMsg.style.animation = "";
}

function hideError() {
  errorMsg.classList.add("hidden");
}
