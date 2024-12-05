import React from 'react'
import Forecast from './Forecast';
import { RiSunLine, RiRainyLine, RiFoggyLine, RiSnowyLine, RiWindyLine } from "react-icons/ri";

export default function WeatherDisplay({ weatherData, addToFavoriteCities }) {

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
        temperature: weatherData.current.temperature_2m,
        humidty: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        conditions: findCondition(weatherData.current.weather_code),
        // usare solo l'orario del forcastTime da 0-23 che combacia con forcastTemp
        forcast24Temp: forcastObject(weatherData.hourly.time, weatherData.hourly.temperature_2m)
    };

    // Ottieni la condizione macro (per esempio, sole, pioggia, neve, ecc.)
    function findCondition(weatherCode) {
        const macroCondition = {
            Sunny: [0, 1, 2, 3], // Cielo sereno o parzialmente nuvoloso
            Foggy: [45, 48],        // Nebbia e nebbia con brina
            Rainy: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99], // Pioggia e temporali, con o senza grandine
            Snowy: [71, 73, 75, 77, 85, 86] // Neve
        }

        // Cerca la condizione macro nella mappa condizioni
        const condition = Object.keys(macroCondition).find(condition => macroCondition[condition].includes(weatherCode)) || "Condition not found";

        switch (condition) {
            case 'Sunny':
                return <RiSunLine size="32" color="#ffffff" />
            case 'Foggy':
                return <RiFoggyLine size="32" color="#ffffff" />
            case 'Rainy':
                return <RiRainyLine size="32" color="#ffffff" />
            case 'Snowy':
                return <RiSnowyLine size="32" color="#ffffff" />
            default:
                return <p>Condition not found</p>
        }

    }

    // funzione per salvare la città preferita con i dati del weather
    const addButtonHandler = () => {
        // Passa city e currentWeatherInfo tramite callback function al Search (addToFavoriteCities)
        addToFavoriteCities(currentWeatherInfo.city, currentWeatherInfo)
    }
    // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    // shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
    return (
        <div className='text-white'>
            <div className="first-section flex justify-between items-center">
                <div className="condition
                bg-gray-500 bg-opacity-50
                condition w-20 h-20 rounded-full 
                flex justify-center items-center
                shadow-[2px_1.5px_1.5px_rgba(255,255,255,0.5)]
                "
                >
                    <div className="text-lg font-semibold">{currentWeatherInfo.conditions}</div>
                </div>
                <div className="temperature">
                    <div className="text-9xl font-semibold">{currentWeatherInfo.temperature}<span className='text-gray-400'>°</span></div>
                </div>
                <div className="wind">
                    <div className="wind-icon
                    bg-gray-500 bg-opacity-50
                    condition w-20 h-20 rounded-full 
                    flex justify-center items-center
                    shadow-[2px_1.5px_1.5px_rgba(255,255,255,0.5)]
                    mt-9
                    "
                    >
                        <RiWindyLine size="32" color="#ffffff" />
                    </div>
                    <div className="text-center text-lg font-semibold mt-2">{currentWeatherInfo.wind}km/h</div>
                </div>
            </div>

            <div className="second-section flex justify-between">
                <div className="sunrise">sunrise</div>
                <div className="daily-condition">
                    <div className="text-lg font-semibold">{currentWeatherInfo.conditions}</div>
                    <div className="text-lg font-semibold">{currentWeatherInfo.humidty}%</div>
                </div>
                <div className="sunshine">sunshine</div>
            </div>

            <div className="forecast-tomorrow">
                tomorrow
                <Forecast forecastData={currentWeatherInfo.forcast24Temp} />
            </div>

            <button
                className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 
                text-white font-semibold rounded-lg transition duration-200 shadow-md"
                onClick={addButtonHandler}
            >
                Add to favorites
            </button>

        </div>
    )
}
