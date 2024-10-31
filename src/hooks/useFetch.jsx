import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function useFetch(url) {

    const [cityGeoDataLat, setCityGeoDataLat] = useState('');
    const [cityGeoDataLon, setCityGeoDataLon] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) return; // se è null interrompi
            try {
                // prima fai la richiesta alla geolocation API
                const geoLocResponse = await axios.get(url)

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
        fetchData();
    }, [url]); // Esegui useEffect ogni volta che cambia l'URL

    return { weatherData }
}
