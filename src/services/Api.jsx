import axios from "axios";

/**
 *  Base Url's
 */
const clientGeoLocation = axios.create({
    baseURL: "https://geocoding-api.open-meteo.com/v1"
})

const clientWeather = axios.create({
    baseURL: "https://api.open-meteo.com/v1"
})

/**
 *  Axios Request's
 */

export async function getCurrentWeather({ city }) {
    // prima fai la richiesta alla geolocation API
    const geoLocResponse = await clientGeoLocation(`/search?name=${city}&format=json`)

    const latitude = geoLocResponse.data.results[0].latitude;
    const longitude = geoLocResponse.data.results[0].longitude;

    // ottieni i dati della previsione meteo
    const { data } = await clientWeather(`/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_min,temperature_2m_max&forecast_days=7&timezone=auto`);

    // add city to the data
    data.location = { city: city }
    return data;
}