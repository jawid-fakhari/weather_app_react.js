import React from 'react'
import Forecast from './Forecast';

export default function WeatherDisplay({ weatherData, addToFavoriteCities }) {


    // Ottieni la condizione macro (per esempio, sole, pioggia, neve, ecc.)
    function findCondition(weatherCode) {
        const macroCondition = {
            Sunny: [0, 1, 2, 3], // Cielo sereno o parzialmente nuvoloso
            Foggy: [45, 48],        // Nebbia e nebbia con brina
            Rainy: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99], // Pioggia e temporali, con o senza grandine
            Snowy: [71, 73, 75, 77, 85, 86] // Neve
        }

        // Cerca la condizione macro nella mappa condizioni
        const condition = Object.keys(macroCondition).find(condition => macroCondition[condition].includes(weatherCode)) || "Condizione non riconosciuta";

        return condition;
    }

    // Funzione per calcolare la temperatura per prossimi ore
    function forcastObject(time, temp) {
        // Estrai solo l'orario da time
        const ore = time.map(hour => hour.slice(-5))

        // ora attuale
        const now = new Date().toTimeString().slice(0, 5);

        // filtra solo le ore successivi 
        const futureOre = ore.filter(ora => ora > now);

        // Crea un oggetto con le ore come key name e le temperature come valori 
        const completeForcast = Object.fromEntries(futureOre.map((ora, index) => [ora, temp[ore.indexOf(ora)]]));

        return completeForcast;
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
            <div className="bg-blue-50 p-6 mt-7 bg-opacity-75 rounded-lg shadow-md ">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    {currentWeatherInfo.city}
                </h3>
                <ul className="text-gray-800 space-y-2">
                    <li className="flex justify-between items-center">
                        <span className="font-medium">Temperature:</span>
                        <span className="text-lg font-semibold">{currentWeatherInfo.temperatura}°C</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium">Humidity:</span>
                        <span className="text-lg font-semibold">{currentWeatherInfo.umidità}%</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium">Wind:</span>
                        <span className="text-lg font-semibold">{currentWeatherInfo.vento} km/h</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium">Conditions:</span>
                        <span className="text-lg font-semibold">{currentWeatherInfo.condizione}</span>
                    </li>
                </ul>

                <button
                    className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 
                text-white font-semibold rounded-lg transition duration-200 shadow-md"
                    onClick={addButtonHandler}
                >
                    Add to favorites
                </button>

            </div>
            <div className="mt-7">
                <Forecast forecastData={currentWeatherInfo.forcast24Temp} />
            </div>

        </>
    )
}
