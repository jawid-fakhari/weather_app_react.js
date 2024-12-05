import React from 'react'
import Search from '../components/Search'

export default function Home() {
    return (
        <div className=''>
            <img
                src="./weatherBg.jpg"
                alt="Background"
                className="w-full h-screen object-cover"
            />
            <Search />
        </div>
    )
}
