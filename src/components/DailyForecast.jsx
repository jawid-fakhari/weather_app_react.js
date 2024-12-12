import React from 'react'

export default function DailyForecast({ forecastData }) {

    function iterator(data) {
        const map = new Map(Object.entries(data));
        return [...map].map(([date, [...values]]) =>
            <div key={date} className="media-element space-y-5">
                <p className='flex justify-center '>{values[2]}</p>
                <p>{values[0]}</p>
                <p>{values[1]}</p>
                <p>{date}</p>
            </div>
        );
    }
    return (
        <div className="bg-custom-gray-50 shadow-custom-top-left 
        h-full flex justify-around rounded-3xl py-5"
        >
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