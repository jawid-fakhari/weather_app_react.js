import React from 'react'

export default function WeatherDisplay({ city, weatherData, addToFavoriteCities }) {

    // Aggiunta funzione per salvare la città preferita con i dati del weather
    const addButtonHandler = () => {
        addToFavoriteCities(city, weatherData) // aggingi la città preferita con i dati del weather
    }

    return (
        <>
            <div className="bg-blue-50 p-4 mb-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Weather in {city}</h3>
                <ul className="text-gray-800 space-y-1">
                    {/* <h2>Weather in {weatherData.location.name}</h2> */}
                    <p>Temperatura: {weatherData.current.temperature_2m}°C</p>
                    <p>Umidità: {weatherData.current.relative_humidity_2m}</p>
                    <p>rain: {weatherData.current.rain}</p>
                    <p>showers: {weatherData.current.showers}</p>
                    <p>snowfall: {weatherData.current.snowfall}</p>
                    <p>cloud_cover: {weatherData.current.cloud_cover}</p>
                    <p>wind_speed_10m: {weatherData.current.wind_speed_10m}</p>
                </ul>
                {/* Add Button per lista dei preferiti*/}
                <button
                    className="
                        mt-4 py-2 px-4
                        bg-green-600 hover:bg-green-700 
                        text-white font-semibold
                        rounded-lg 
                        transition duration-200
                        "
                    onClick={addButtonHandler}
                >
                    Aggiungi ai preferiti
                </button>
            </div>
        </>
    )
}
