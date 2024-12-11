import React from 'react'

export default function DailyForecast({ forecastData }) {
    console.log(forecastData);

    function iterator(data) {
        const map = new Map(Object.entries(data));
        return [...map].map(([date, [...values]]) =>
            <div key={date} className="media-element space-y-5">
                <p>Max{values[2]}</p>
                <p className='flex justify-center'>{values[4]}</p>
                <p>Min{values[3]}</p>
                <p>{date}</p>
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
    )
}