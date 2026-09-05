import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const [recents, setRecents] = useState([]);


  useEffect(() => {
    const interval = setInterval(async () => {

      const updatedRecents = await Promise.all(
        recents.map(async (recent) => {

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${recent.latitude}&longitude=${recent.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
          );

          const data = await response.json();

          return {
            ...recent,
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code
          };
        })
      );

      setRecents(updatedRecents);

    }, 600000);

    return () => {
      clearInterval(interval);
    };
  }, [recents]);

  const convertTemperature = (temperature) => {
    if (unit === "C") {
      return temperature;
    }

    return (temperature * 9) / 5 + 32;
  };

  // getingm my own location

  const getMyLocation = () => {
    setLoading(true);
    setError("");
    setWeather(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`
          );

          const data = await response.json();

          setWeather(data);
          const recent = {
            name: "Your Location",
            country: "",
            latitude: latitude,
            longitude: longitude,
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code
          };
          setRecents((prev) => [recent, ...prev])
        } catch (err) {
          setError("Unable to fetch weather");
        }

        setLoading(false);
      },
      () => {
        setError("Unable to get your location");
        setLoading(false);
      }
    );
  };

  const searchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
      }

      const cityData = data.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`
      );

      const weatherData = await weatherResponse.json();
      setLocation(cityData);
      setWeather(weatherData);

      // create the data structure for the recent card
      const recent = {
        name: cityData.name,
        country: cityData.country,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code
      };

      setRecents((prev) => [recent, ...prev]);



    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const getWeatherCondition = (code) => {
    if (code === 0) return "☀️ Clear Sky";
    if (code === 1 || code === 2) return "🌤️ Partly Cloudy";
    if (code === 3) return "☁️ Cloudy";
    if (code === 45 || code === 48) return "🌫️ Foggy";
    if (code >= 51 && code <= 67) return "🌧️ Rainy";
    if (code >= 71 && code <= 77) return "❄️ Snowy";
    if (code >= 80 && code <= 82) return "🌧️ Rain Showers";
    if (code >= 95) return "⛈️ Thunderstorm";

    return "Unknown";
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 ">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          🌤️ Weather App
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800 text-white placeholder-slate-400 rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
            onClick={searchWeather} >
            Search
          </button>
        </div>
        <button
          onClick={getMyLocation}
          className="w-full mt-3 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg cursor-pointer"
        >
          📍 Use My Location
        </button>
        {loading && (
          <h2 className="text-2xl text-white font-bold mb-4">
            Loading
          </h2>
        )}
        {weather && (
          <div className="mt-6 bg-slate-800 rounded-xl p-5 text-white">
            <h2 className="text-2xl font-bold mb-4">
              {location
                ? `${location.name}, ${location.country}`
                : "Your Location"}
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUnit("C")}
                className={`px-3 py-2 rounded-lg cursor-pointer ${unit === "C"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300"
                  }`}
              >
                °C
              </button>

              <button
                onClick={() => setUnit("F")}
                className={`px-3 py-2 rounded-lg cursor-pointer ${unit === "F"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300"
                  }`}
              >
                °F
              </button>
            </div>

            <p className="text-lg">
              🌡️ Temperature:{" "}
              {convertTemperature(weather.current.temperature_2m).toFixed(1)}
              °{unit}
            </p>

            <p className="text-lg">
              💧 Humidity: {weather.current.relative_humidity_2m}%
            </p>

            <p className="text-lg">
              💨 Wind Speed: {weather.current.wind_speed_10m} km/h
            </p>

            <p className="text-xl font-semibold mb-4">
              {getWeatherCondition(weather.current.weather_code)}
            </p>
          </div>
        )}

        {error && (
          <h2 className="text-2xl font-bold text-red-400 mt-4">
            {error}
          </h2>
        )}



        {weather && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              5-Day Forecast
            </h2>

            <div className="grid gap-3">
              {weather.daily.time.map((date, index) => (
                <div
                  key={date}
                  className="bg-slate-800 rounded-xl p-4 text-white"
                >
                  <p className="font-semibold">
                    {date}
                  </p>

                  <p className="text-lg">
                    {getWeatherCondition(weather.daily.weather_code[index])}
                  </p>

                  <p>
                    🌡️ Max: {weather.daily.temperature_2m_max[index]}°C
                  </p>

                  <p>
                    🌡️ Min: {weather.daily.temperature_2m_min[index]}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}



        {recents.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recent Searches
            </h2>

            <div className="grid gap-3">
              {recents.map((recent, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-4 text-white"
                >
                  <h3 className="text-xl font-bold">
                    {recent.name}, {recent.country}
                  </h3>

                  <p>
                    🌡️ Temperature:{" "}
                    {convertTemperature(recent.temperature).toFixed(1)}
                    °{unit}
                  </p>

                  <p>
                    💧 Humidity: {recent.humidity}%
                  </p>

                  <p>
                    💨 Wind: {recent.wind} km/h
                  </p>

                  <p>
                    {getWeatherCondition(recent.weatherCode)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}



export default App
