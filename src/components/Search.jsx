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
            <div className="
                max-w-lg mx-auto 
                mt-20 p-4 
                bg-white 
                shadow-lg 
                rounded-lg
                "
            >

                <form
                    className="mb-6"
                    onSubmit={handleSubmit}
                >
                    <div className="
                        flex items-center 
                        border border-gray-300 
                        rounded-lg 
                        overflow-hidden
                        "
                    >

                        {/* Campo per inserire il nome della città */}
                        <input
                            type="text"
                            className="w-full p-3 text-gray-900 focus:outline-none"
                            placeholder="Scrivi il nome della città"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        {/* Bottone per inviare il form */}
                        <button
                            type="submit"
                            className="
                                bg-blue-600 hover:bg-blue-700 
                                text-white font-semibold p-3
                                "
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