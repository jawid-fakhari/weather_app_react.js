import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';


export default function SearchBar() {
    const [city, setCity] = useState('');
    const [url, setUrl] = useState(null);

    // Chiamata a useFetch, che si attiva quando cambia l'URL
    const { weatherData } = useFetch(url);

    // funzione per il submit del form e richiesta dei dati della previsione meteo
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&format=json`;
        setUrl(newUrl); // Imposta il nuovo URL, che attiverà la chiamata in useFetch
    };

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