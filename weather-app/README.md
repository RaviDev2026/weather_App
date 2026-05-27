# ◈ SkyWatch — Weather App

A clean, real-time weather app built with **Vanilla JavaScript**, **HTML**, and **CSS**. Fetches live weather data using the [OpenWeatherMap API](https://openweathermap.org/api).

![SkyWatch Preview](https://via.placeholder.com/560x320/0b0c10/e8ff47?text=SkyWatch+Weather+App)

---

## Features

- 🌡️ Real-time temperature, feels-like, humidity, wind speed
- 🌤️ Live weather condition icons
- 🌅 Sunrise & sunset times (local to searched city)
- 👁️ Visibility, pressure, and cloud cover
- 📱 Fully responsive (mobile + desktop)
- ⚡ Zero dependencies — pure Vanilla JS

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-app.git
cd weather-app
```

### 2. Get a Free API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to **API Keys** in your dashboard
4. Copy your key

### 3. Add Your API Key

Open `app.js` and replace `YOUR_API_KEY_HERE` on line 9:

```js
const API_KEY = "YOUR_API_KEY_HERE"; // Replace this
```

### 4. Open the app

Simply open `index.html` in your browser — no build tools or server needed!

```bash
open index.html
# or just double-click it
```

---

## Project Structure

```
weather-app/
├── index.html   # Main HTML structure
├── style.css    # All styles and animations
├── app.js       # JavaScript logic & API calls
└── README.md    # This file
```

---

## API Reference

This app uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current):

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
```

**Key fields used:**
| Field | Description |
|---|---|
| `main.temp` | Temperature in °C |
| `main.feels_like` | Perceived temperature |
| `main.humidity` | Humidity % |
| `wind.speed` | Wind speed (m/s → converted to km/h) |
| `visibility` | Visibility in metres |
| `sys.sunrise` / `sys.sunset` | Unix timestamps |
| `weather[0].icon` | Icon code for weather image |

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — Async/Await, Fetch API, Intl API
- **OpenWeatherMap API** — Weather data (free tier)

---

## License

MIT — free to use, modify, and distribute.
