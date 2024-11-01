import React, { useState, useEffect } from 'react'
import { getCurrentWeather } from '../services/Api';
import WeatherDisplay from './WeatherDisplay';

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

            {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </>
    )
}