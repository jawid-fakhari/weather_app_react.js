import React from 'react'

export default function FavoriteList({ favoriteCities }) {

    return (
        <div className="mt-10">
            <h3>Città Preferite</h3>
            {favoriteCities.length === 0 ? (
                <p>Nessuna città preferita aggiunta.</p>
            ) : (
                <ul>
                    {favoriteCities.map((item, index) => (
                        <li key={index} className="border-b py-2">
                            <h4>{item.city}</h4>
                            <p>Temperatura: {item.weatherData.current.temperature_2m}°C</p>
                            <p>Umidità: {item.weatherData.current.relative_humidity_2m}</p>
                            <p>Pioggia: {item.weatherData.current.rain}</p>
                            {/* Aggiungi altre informazioni se desideri */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
