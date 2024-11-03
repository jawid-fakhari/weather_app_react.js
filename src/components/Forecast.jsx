import React from 'react'

export default function Forecast({ forecastData }) {

    return (
        <div className="forecast-container mt-5">
            <h4 className="text-blue-700 mb-2 font-semibold">Previsioni per le prossime 24 ore</h4>
            {Object.entries(forecastData).map(([ora, temp]) => (
                <div key={ora} className="flex justify-between gap-4">
                    <p>{ora}</p>
                    <p>{temp}°C</p>
                </div>
            ))}
        </div>
    )
}
