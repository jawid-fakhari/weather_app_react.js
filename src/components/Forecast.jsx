import React from 'react';



export default function Forecast({ forecastData }) {

    function iterator(data) {
        const map = new Map(Object.entries(data));
        return [...map].map(([date, temp]) => (
            <div key={date} className="">
                <p>{date}</p>
                <p>{temp}°C</p>
            </div>
        ));
    }



    return (
        <div className="bg-blue-50 p-6 mt-7 bg-opacity-75 rounded-lg shadow-md">
            <div className='flex items-center justify-center gap-3'>
                {iterator(forecastData)}
            </div>
        </div>
    );
}
