import React from 'react'
import { RiSunLine, RiRainyLine, RiFoggyLine, RiSnowyLine, RiWindyLine } from "react-icons/ri";
import { FiSunset, FiSunrise, FiDroplet } from "react-icons/fi";
import ForecastHourly from './ForecastHourly';
import DailyForecast from './DailyForecast';

export default function WeatherDisplay({ weatherData, addToFavoriteCities }) {

    const weatherDataReq = {
        city: weatherData.location.city,
        temperature: weatherData.current.temperature_2m,
        humidty: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        sunrise: weatherData.daily.sunrise.map(time => time.slice(-5)),
        sunset: weatherData.daily.sunset.map(time => time.slice(-5)),
        currentCondition: findCondition(weatherData.current.weather_code),
        // usare solo l'orario del forcastTime da 0-23 che combacia con forcastTemp
        hourlyForecastData: forecastObject(
            weatherData.hourly,
            weatherData.current.time.slice(-5),
        ),
        dailyForecastData: weeklyForecastObject(
            weatherData.daily
        )
    };

    function weeklyForecastObject(data) {

        const maxTemperature = data.temperature_2m_max;
        const minTemperature = data.temperature_2m_min;

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dates = data.time.map(dateString => new Date(dateString));
        const days = dates.map(date => daysOfWeek[date.getDay()]);

        const weatherCondition = data.weather_code;
        const dailyForecast = Object.fromEntries(days.map((day, index) => {
            return [day, [
                maxTemperature[index],
                minTemperature[index],
                findCondition(weatherCondition[index]),
            ]];
        }));

        return dailyForecast;
    }

    function forecastObject(data, currentTime) {
        // Extract only the first 24 hours
        const next24Hours = data.time.slice(0, 24).map(time => time.slice(-5));
        const currentIndex = next24Hours.findIndex(time => time > currentTime);

        // Get future hours starting from the current hour
        const futureHours = next24Hours.slice(currentIndex);

        // Create forecast object
        const completeForecast = Object.fromEntries(futureHours.map((hour, index) => {
            const actualIndex = currentIndex + index;
            return [hour, [
                data.temperature_2m[actualIndex],
                data.precipitation_probability[actualIndex],
                findCondition(data.weather_code[actualIndex]),
            ]];
        }));

        return completeForecast;
    }


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
        // Passa city e weatherDataReq tramite callback function al Search (addToFavoriteCities)
        addToFavoriteCities(weatherDataReq.city, weatherDataReq)
    }
    // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    // shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
    return (
        <div className='text-white'>
            {/* first section */}
            <div className="first-section 
            flex flex-wrap justify-between items-center mt-7
            md:flex-nowrap
            "
            >

                {/* condition */}
                <div className="condition
                bg-custom-gray-50
                condition w-16 h-16 rounded-full 
                flex justify-center items-center
                shadow-custom-top-left
                "
                >
                    <div className="text-lg font-semibold">
                        {weatherDataReq.currentCondition}
                    </div>
                </div>

                {/* current temerature */}
                <div className="temperature order-first w-full text-center md:order-none md:w-1/2 ">
                    <div className="text-9xl font-semibold">
                        {weatherDataReq.temperature}
                        <span className='text-gray-400'>°</span>
                    </div>
                </div>

                {/* current wind condition */}
                <div className="wind">
                    <div className="wind-icon
                    bg-custom-gray-50
                    condition w-16 h-16 rounded-full 
                    flex justify-center items-center
                    shadow-custom-top-left
                    mt-9
                    "
                    >
                        <RiWindyLine size="32" color="#ffffff" />
                    </div>
                    <div className="text-center text-base font-semibold mt-2">{weatherDataReq.wind}km/h</div>
                </div>
            </div>

            {/* second section */}
            <div className="second-section
            flex flex-wrap justify-between items-center mt-7
            xl:flex-nowrap md:mt-20
            "
            >

                {/* sunrise-sunset */}
                <div className="sunrise-sunset 
                    bg-custom-gray-50
                    condition w-16 h-48 rounded-full 
                    flex flex-col justify-center items-center gap-9
                    shadow-custom-top-left
                    "
                >
                    <div className='flex flex-col justify-center items-center'>
                        <FiSunrise size="25" color="#ffffff" />
                        <div className="text-base font-semibold">
                            {weatherDataReq.sunrise[0]}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <FiSunset size="25" color="#ffffff" />
                        <div className="text-base font-semibold">
                            {weatherDataReq.sunset[0]}
                        </div>
                    </div>
                </div>

                {/* Hourly forecast section */}
                <div className="
                forecast-hourly w-full flex justify-center 
                order-first mb-7
                xl:order-none xl:mb-0
                "
                >
                    <ForecastHourly
                        forecastData={weatherDataReq.hourlyForecastData}
                    />
                </div>

                {/* humidty */}
                <div className="humidity
                    bg-custom-gray-50
                    w-16 h-48 rounded-full
                    flex flex-col justify-center items-center
                    shadow-custom-top-left
                    "
                >
                    <div
                        className="w-8 h-8 rounded-full border-2 flex
                        justify-center items-center"
                    >
                        <FiDroplet size="20" color="#ffffff" />
                    </div>
                    <div className="text-base font-semibold">{weatherDataReq.humidty}%</div>
                </div>

            </div>

            {/* Daily forecast section */}
            <div className="forecast-daily mt-7 xl:mt-20">
                <DailyForecast
                    forecastData={weatherDataReq.dailyForecastData}
                />
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
