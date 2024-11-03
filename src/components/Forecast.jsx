import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// Registra i componenti necessari
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Forecast({ forecastData }) {
    // crare un grafico lineare per l'andamento della temperatura 
    const labels = Object.keys(forecastData);
    const temperatures = Object.values(forecastData);


    const data = {
        labels,
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: temperatures,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                tension: 0.3, // rende la linea più morbida
                pointRadius: 3,
                pointBackgroundColor: '#3b82f6',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ora',
                    color: '#4b5563',
                    font: {
                        weight: 'bold',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: '#4b5563',
                    font: {
                        weight: 'bold',
                    },
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="forecast-container bg-blue-50 p-6 mt-5 rounded-lg shadow-md">
            <h4 className="text-blue-700 text-lg font-semibold mb-4">
                Temperatura per le prossime ore
            </h4>
            <div className="h-64 w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
