import React from 'react'
import Forecast from './Forecast';

export default function WeatherDisplay({ weatherData, addToFavoriteCities }) {


    // Ottieni la condizione macro (per esempio, sole, pioggia, neve, ecc.)
    function findCondition(weatherCode) {
        const macroCondition = {
            Soleggiato: [0, 1, 2, 3], // Cielo sereno o parzialmente nuvoloso
            Nebbia: [45, 48],        // Nebbia e nebbia con brina
            Pioggia: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99], // Pioggia e temporali, con o senza grandine
            Neve: [71, 73, 75, 77, 85, 86] // Neve
        }

        // Cerca la condizione macro nella mappa condizioni
        const condition = Object.keys(macroCondition).find(condition => macroCondition[condition].includes(weatherCode)) || "Condizione non riconosciuta";

        return condition;
    }

    // Funzione per calcolare la temperatura per prossimi ore
    function forcastObject(time, temp) {
        // Estrai solo l'orario da time
        const ore = time.map(hour => hour.slice(-5))

        // Crea un oggetto con le ore come key name e le temperature come valori
        return Object.fromEntries(ore.map((ora, index) => [ora, temp[index]]))
    }

    const currentWeatherInfo = {
        city: weatherData.location.city,
        temperatura: weatherData.current.temperature_2m,
        umidità: weatherData.current.relative_humidity_2m,
        vento: weatherData.current.wind_speed_10m,
        condizione: findCondition(weatherData.current.weather_code),
        // usare solo l'orario del forcastTime da 0-23 che combacia con forcastTemp
        forcast24Temp: forcastObject(weatherData.hourly.time, weatherData.hourly.temperature_2m)
    };

    // funzione per salvare la città preferita con i dati del weather
    const addButtonHandler = () => {
        // Passa city e currentWeatherInfo tramite callback function al Search (addToFavoriteCities)
        addToFavoriteCities(currentWeatherInfo.city, currentWeatherInfo)
    }

    return (
        <>
            <div className="bg-blue-50 p-4 mb-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    Previsioni meteo di {currentWeatherInfo.city}
                </h3>
                <ul className="text-gray-800 space-y-1">
                    <p>Temperatura: {currentWeatherInfo.temperatura}°C</p>
                    <p>Umidità: {currentWeatherInfo.umidità}%</p>
                    <p>Vento: {currentWeatherInfo.vento}km/h</p>
                    <p>Condizioni: {currentWeatherInfo.condizione}</p>
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
                <Forecast forecastData={currentWeatherInfo.forcast24Temp} />
            </div>
        </>
    )
}
