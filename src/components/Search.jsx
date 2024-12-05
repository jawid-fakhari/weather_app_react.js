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

    const addToFavoriteCities = (city, weatherDataInfo) => {
        const isAlreadyFavorite = favoriteCities.some(fav => fav.city === city);
        // verifica se la città è già nella lista dei preferiti
        if (!isAlreadyFavorite) {
            // aggiungi la città alla lista dei preferiti con i dati ricevuti dal weatherDisplay
            setFavoriteCities(prevFavorites => [...favoriteCities, { city, weatherDataInfo }]);
        }
    }

    // carica i preferiti da localStorage come stato iniziale con un callback function che carica i dati solo al primo rendering.
    const [favoriteCities, setFavoriteCities] = useState(() => {
        const savedCities = localStorage.getItem('favoriteCities');
        return savedCities ? JSON.parse(savedCities) : [];
    });

    // elimina una città dalla lista dei preferiti
    const removeFromFavorites = (index) => {
        setFavoriteCities(prevFavorites => [...prevFavorites.slice(0, index), ...prevFavorites.slice(index + 1)]);
    }

    // salva i preferiti nel localStorage ogni volta che favoriteCities cambia
    useEffect(() => {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    }, [favoriteCities]);

    return (
        <>
            {/* Colonna sinistra */}
            <div className='absolute inset-0 flex-col items-start justify-start m-7 lg:w-2/5'>
                <form
                    onSubmit={handleSubmit}
                    className="border-hidden"
                >
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            className="w-full p-3 text-white font-semibold focus:outline-none bg-transparent"
                            placeholder="Search your city..."
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            type="submit"
                            // 7678ed
                            className="bg-[#7678ed] bg-opacity-55 hover:bg-blue-700 text-white font-semibold p-3"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {weatherData && (
                    <WeatherDisplay
                        weatherData={weatherData}
                        addToFavoriteCities={addToFavoriteCities}
                    />
                )}
            </div>


            {/* Colonna destra */}
            {/* <div
                className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg absolute top-0 right-0 border-2 border-green-600"
            >
                <FavoriteList favoriteCities={favoriteCities} removeFromFavorites={removeFromFavorites} />
            </div > */}
        </>
    )
}