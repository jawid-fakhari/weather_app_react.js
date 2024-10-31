import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function SearchBar() {
    const [city, setCity] = useState('');
    const [cityGeoDataLat, setCityGeoDataLat] = useState('');
    const [cityGeoDataLon, setCityGeoDataLon] = useState('');
    const [weatherData, setWeatherData] = useState('');

    // API per avere lat & lon della città
    const geoLocationApi = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&format=json`;


    const fetchData = async () => {
        try {
            // prima fai la richiesta alla geolocation API
            const geoLocResponse = await axios.get(geoLocationApi)

            // trova le coordinate della città
            const latitude = geoLocResponse.data.results[0].latitude;
            const longitude = geoLocResponse.data.results[0].longitude;
            setCityGeoDataLat(latitude);
            setCityGeoDataLon(longitude);

            const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            // ottieni i dati della previsione meteo
            const weatherResponse = await axios.get(weatherApi);
            setWeatherData(weatherResponse.data);
            console.log(weatherResponse.data);
        } catch (error) {
            console.error(error);
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData()
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
        </>
    )
}