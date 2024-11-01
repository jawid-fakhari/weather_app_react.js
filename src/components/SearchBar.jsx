import React, { useState, useEffect } from 'react'
import { getCurrentWeather } from '../services/Api';

export default function SearchBar() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // fetch weather data usando city name
        getCurrentWeather({ city })
            .then(res => {
                setWeatherData(res);
            })
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Scrivi il nome della città"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit">Cerca</button>
                </form>
            </div>

            {weatherData && (
                <div>
                    <p>Temperatura: {weatherData.current.temperature_2m}°C</p>
                    <p>Umidità: {weatherData.current.relative_humidity_2m}</p>
                    <p>rain: {weatherData.current.rain}</p>
                    <p>showers: {weatherData.current.showers}</p>
                    <p>snowfall: {weatherData.current.snowfall}</p>
                    <p>cloud_cover: {weatherData.current.cloud_cover}</p>
                    <p>wind_speed_10m: {weatherData.current.wind_speed_10m}</p>
                </div>
            )}
        </>
    )
}