import React, { useEffect, useState } from 'react'

export default function FavoriteList({ favoriteCities, removeFromFavorites }) {

    // state per contenere le città ordinate per temperatura
    const [sortedCities, setSortedCities] = useState(favoriteCities);

    // inizializza sortedCities con favoritCities ogni volta che favoritCites cambia
    useEffect(() => {
        setSortedCities(favoriteCities);
    }, [favoriteCities]);

    // ordina le città per temperatura in modo decrescente
    const handleSort = () => {
        const sorted = [...favoriteCities].sort((a, b) => b.weatherDataInfo.temperatura - a.weatherDataInfo.temperatura);
        setSortedCities(sorted);
    }

    const deleteHandler = (index) => {
        removeFromFavorites(index)
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Le tue città Preferite
            </h3>
            <button
                onClick={handleSort}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                Ordina per Temperatura
            </button>
            {sortedCities.length === 0 ? (
                <p className="text-gray-500">
                    Nessuna città preferita aggiunta.
                </p>
            ) : (
                <ul className="favCity space-y-4">
                    {sortedCities.map((item, index) => (
                        <li
                            key={index}
                            className="bg-blue-50 p-6 border border-gray-200 rounded-lg shadow-md transition duration-200 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    {item.city}
                                </h4>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs py-1 px-3 rounded-full shadow-sm transition duration-200"
                                    onClick={() => { deleteHandler(index) }}
                                >
                                    Elimina
                                </button>
                            </div>
                            <ul className="text-gray-700 text-sm space-y-1">
                                <li>Temperatura: {item.weatherDataInfo.temperatura}°C</li>
                                <li>Umidità: {item.weatherDataInfo.umidità}%</li>
                                <li>Vento: {item.weatherDataInfo.vento}km/h</li>
                                <li>Condizione: {item.weatherDataInfo.condizione}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}
