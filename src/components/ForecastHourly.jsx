import React from 'react';



export default function ForecastHourly({ forecastData }) {

    // console.log(forecastData);

    // forecastData with hours as key name and an array of temprature and precipitation probability as value 
    function iterator(data) {
        const map = new Map(Object.entries(data));
        return [...map].map(([hour, [...values]]) =>
            <div key={hour} className="">
                <p>{values[0]}°C</p>
                <p>{values[1]}%</p>
                <p>{hour}</p>
            </div>
        );


    }

    // function iterator(data) {
    //     const map = new Map(Object.entries(data));
    //     return [...map].map(([date, temp, precip]) => (
    //         <div key={date} className="">
    //             <p>{temp}°C</p>
    //             <p>{date}</p>
    //             <p>{precip}%</p>
    //         </div>
    //     ));
    // }



    return (
        <div className="bg-custom-gray-50 shadow-custom-top-left h-full w-11/12 flex justify-around rounded-3xl">
            <div className='flex items-center justify-around text-center w-full'>
                {iterator(forecastData)}
            </div>
        </div>
    );
}
