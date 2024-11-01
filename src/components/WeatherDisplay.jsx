import React from 'react'

export default function WeatherDisplay({ weatherData }) {
    return (
        <>
            <div>
                <p>Temperatura: {weatherData.current.temperature_2m}°C</p>
                <p>Umidità: {weatherData.current.relative_humidity_2m}</p>
                <p>rain: {weatherData.current.rain}</p>
                <p>showers: {weatherData.current.showers}</p>
                <p>snowfall: {weatherData.current.snowfall}</p>
                <p>cloud_cover: {weatherData.current.cloud_cover}</p>
                <p>wind_speed_10m: {weatherData.current.wind_speed_10m}</p>
            </div>
        </>
    )
}
