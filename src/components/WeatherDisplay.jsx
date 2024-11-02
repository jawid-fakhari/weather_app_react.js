import React from 'react'

export default function WeatherDisplay({ city, weatherData, addToFavoriteCities }) {

    function findCondition(weatherCode) {
        // Ottieni la condizione macro (per esempio, sole, pioggia, neve, ecc.)
        const macroCondition = {
            Soleggiato: [0, 1, 2, 3], // Cielo sereno o parzialmente nuvoloso
            Nebbia: [45, 48],        // Nebbia e nebbia con brina
            Pioggia: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99], // Pioggia e temporali, con o senza grandine
            Neve: [71, 73, 75, 77, 85, 86] // Neve
        }

        const condition = Object.keys(macroCondition).find(condition => macroCondition[condition].includes(weatherCode)) || "Condizione non riconosciuta";

        return condition;

    }

    const weatherDataInfo = {
        temperatura: weatherData.current.temperature_2m,
        umidità: weatherData.current.relative_humidity_2m,
        vento: weatherData.current.wind_speed_10m,
        condizione: findCondition(weatherData.current.weather_code),
    };

    // funzione per salvare la città preferita con i dati del weather
    const addButtonHandler = () => {
        addToFavoriteCities(city, weatherData) // aggingi la città preferita con i dati del weather
    }

    return (
        <>
            <div className="bg-blue-50 p-4 mb-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Previsioni meteo a {city}</h3>
                <ul className="text-gray-800 space-y-1">
                    <p>Temperatura: {weatherDataInfo.temperatura}°C</p>
                    <p>Umidità: {weatherDataInfo.umidità}%</p>
                    <p>Vento: {weatherDataInfo.vento}km/h</p>
                    <p>Condizioni: {weatherDataInfo.condizione}</p>
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
