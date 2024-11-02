import React, { useState, useEffect } from 'react'
import { getCurrentWeather } from '../services/Api';
import WeatherDisplay from './WeatherDisplay';
import FavoriteList from './FavoriteList';


export default function Search() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // fetch weather data usando city name
        getCurrentWeather({ city })
            .then(res => {
                setWeatherData(res)
            })
            .catch(error => {
                console.error("Errore nel caricamento dei dati meteo:", error);
            });
    }

    const addToFavoriteCities = (city, weatherData) => {
        const isAlreadyFavorite = favoriteCities.some(fav => fav.city === city);
        // verifica se la città è già nella lista dei preferiti
        if (!isAlreadyFavorite) {
            // aggiungi la città alla lista dei preferiti
            setFavoriteCities(prevFavorites => [...favoriteCities, { city, weatherData }]);
        }
    }

    // carica i preferiti da localStorage come stato iniziale con un callback function che carica i dati solo al primo rendering.
    const [favoriteCities, setFavoriteCities] = useState(() => {
        const savedCities = localStorage.getItem('favoriteCities');
        return savedCities ? JSON.parse(savedCities) : [];
    });

    // salva i preferiti nel localStorage ogni volta che favoriteCities cambia
    useEffect(() => {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    }, [favoriteCities]);

    return (
        <>
            <div className="max-w-md mx-auto mt-20">

                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="relative">

                        {/* Campo per inserire il nome della città */}
                        <input
                            type="text"
                            className="
                            block w-full p-4 ps-10 
                            text-sm text-gray-900 
                            border border-gray-300 rounded-lg 
                            bg-gray-50 focus:ring-blue-500
                            focus:border-blue-500 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500
                            "
                            placeholder="Scrivi il nome della città"
                            required value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        {/* Bottone per inviare il form */}
                        <button
                            type="submit"
                            className="
                            text-white absolute end-2.5 bottom-2.5 
                            bg-blue-700 hover:bg-blue-800 
                            focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-sm px-4 py-2 
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Cerca
                        </button>
                    </div>
                </form>

                {/* Mostra i dati della previsione meteo */}
                {weatherData && (
                    <WeatherDisplay
                        city={city}
                        weatherData={weatherData}
                        addToFavoriteCities={addToFavoriteCities} // passa la funzione come props
                    />
                )}

                <FavoriteList favoriteCities={favoriteCities} />
            </div>
        </>
    )
}