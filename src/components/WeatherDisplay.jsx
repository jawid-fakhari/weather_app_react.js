import React from 'react'

export default function WeatherDisplay({ city, weatherData, addToFavoriteCities }) {

    // Aggiunta funzione per salvare la città preferita con i dati del weather
    const addButtonHandler = () => {
        addToFavoriteCities(city, weatherData) // aggingi la città preferita con i dati del weather
    }

    return (
        <>
            <div>
                {/* <h2>Weather in {weatherData.location.name}</h2> */}
                <p>Temperatura: {weatherData.current.temperature_2m}°C</p>
                <p>Umidità: {weatherData.current.relative_humidity_2m}</p>
                <p>rain: {weatherData.current.rain}</p>
                <p>showers: {weatherData.current.showers}</p>
                <p>snowfall: {weatherData.current.snowfall}</p>
                <p>cloud_cover: {weatherData.current.cloud_cover}</p>
                <p>wind_speed_10m: {weatherData.current.wind_speed_10m}</p>
            </div>
            {/* Add Button per lista dei preferiti*/}
            <button
                className="
                    bg-transparent
                    hover:bg-blue-500 
                    text-blue-700 font-semibold
                    hover:text-white 
                    py-2 px-4 
                    border border-blue-500 
                    hover:border-transparent 
                    rounded"
                onClick={addButtonHandler}
            >
                Aggiungi ai preferiti
            </button>
        </>
    )
}
