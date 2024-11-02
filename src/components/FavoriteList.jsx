import React from 'react'

export default function FavoriteList({ favoriteCities }) {

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Città Preferite
            </h3>
            {favoriteCities.length === 0 ? (
                <p className="text-gray-500">
                    Nessuna città preferita aggiunta.
                </p>
            ) : (
                <ul className="space-y-4">
                    {favoriteCities.map((item, index) => (
                        <li
                            key={index}
                            className="bg-white p-4 border rounded-lg shadow-sm"
                        >
                            <h4 className="text-lg font-semibold text-gray-700">
                                {item.city}
                            </h4>
                            <ul className="text-gray-700 text-sm space-y-1">
                                <li>Temperatura: {item.weatherData.current.temperature_2m}°C</li>
                                <li>Umidità: {item.weatherData.current.relative_humidity_2m}%</li>
                                <li>Pioggia: {item.weatherData.current.rain} mm</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
