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
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Le tue città Preferite
            </h3>
            <button
                onClick={handleSort}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Ordina per Temperatura
            </button>
            {sortedCities.length === 0 ? (
                <p className="text-gray-500 mt-4">
                    Nessuna città preferita aggiunta.
                </p>
            ) : (
                <ul className="space-y-4 mt-6">
                    {sortedCities.map((item, index) => (
                        <li
                            key={index}
                            className="bg-white p-5 border rounded-lg shadow-md transition duration-200 hover:shadow-lg hover:bg-blue-50"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    {item.city}
                                </h4>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs py-1 px-3 rounded-full shadow-sm transition duration-200"
                                    onClick={() => { deleteHandler(index) }}
                                >
                                    Elimina
                                </button>
                            </div>
                            <ul className="text-gray-600 text-sm space-y-1">
                                <li className="flex items-center">
                                    <span className="w-1/2 font-medium"> Temperatura:</span>
                                    <span>{item.weatherDataInfo.temperatura}°C</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1/2 font-medium"> Umidità:</span>
                                    <span>{item.weatherDataInfo.umidità}%</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1/2 font-medium"> Vento:</span>
                                    <span>{item.weatherDataInfo.vento} km/h</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1/2 font-medium"> Condizione:</span>
                                    <span>{item.weatherDataInfo.condizione}</span>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}
