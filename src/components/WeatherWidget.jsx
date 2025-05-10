import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherWidget = () => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "41bc96a595fca0bae4063b5934162421";

  useEffect(() => {
    if (city) {
      fetchWeather();
      fetchForecast();
    }
  }, [city]);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);
    localStorage.setItem("lastCity", city);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setForecast(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        setError(data.message);
      } else {
        setForecast(data);
      }
    } catch (err) {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const getTimeBasedTheme = () => {
    if (!weather) return "";
    const hour = new Date((weather.dt + weather.timezone) * 1000).getUTCHours();
    return hour >= 6 && hour < 18 ? "bg-blue-100" : "bg-gray-800 text-white";
  };

  const convertPressureToMmHg = (hPa) => {
    return Math.round(hPa * 0.75006);
  };

  const convertWindToKmh = (ms) => {
    return Math.round(ms * 3.6);
  };

  const getTemperatureData = () => {
    if (!forecast) return { labels: [], data: [] };

    const labels = forecast.list
      .slice(0, 5)
      .map((item) => new Date(item.dt * 1000).toLocaleTimeString());
    const data = forecast.list.slice(0, 5).map((item) => item.main.temp);

    return { labels, data };
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-lg w-full max-w-screen-md mx-auto mt-8 transition-all duration-300border border-white  ${getTimeBasedTheme()}`}
    >
      <h2 className="text-xl font-semibold text-center mb-4">Weather Status</h2>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-3 text-white bg-gray-800"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Loading..." : "Show Weather"}
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {weather && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">{weather.name}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto"
          />
          <p>{weather.weather[0].description}</p>
          <p>🌡️ Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {convertWindToKmh(weather.wind.speed)} km/h</p>
          <p>
            📈 Pressure: {convertPressureToMmHg(weather.main.pressure)} mmHg
          </p>
        </div>
      )}

      {forecast && (
        <div className="mt-8">
          <h3 className="text-center text-lg font-semibold mb-4">
            Temperature Forecast (Next 5 hours)
          </h3>
          <Line
            data={{
              labels: getTemperatureData().labels,
              datasets: [
                {
                  label: "Temperature (°C)",
                  data: getTemperatureData().data,
                  borderColor: "#4C8BF5",
                  backgroundColor: "rgba(76, 139, 245, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Temperature (°C)",
                  },
                  beginAtZero: false,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
