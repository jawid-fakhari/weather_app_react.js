import React from 'react';


export default function ForecastHourly({ forecastData }) {
    console.log(forecastData);


    // forecastData with hours as key name and an array of temprature and precipitation probability as value 
    function iterator(data) {
        const map = new Map(Object.entries(data));
        return [...map].map(([hour, [...values]]) =>
            <div key={hour} className="media-element space-y-5">
                <p>{values[0]}°C</p>
                <p className='flex justify-center'>{values[2]}</p>
                <p>{values[1]}%</p>
                <p>{hour}</p>
            </div>
        );
    }

    return (
        <div className="bg-custom-gray-50 shadow-custom-top-left h-full w-11/12 flex justify-around rounded-3xl">
            <div className='media-scroller
            grid grid-flow-col [grid-auto-columns:23%] text-center items-center
            overflow-x-auto overscroll-contain
            [scroll-snap-type:inline_mandatory]
            no-scrollbar w-3/4'
            >
                {iterator(forecastData)}
            </div>
        </div>
    );
}
