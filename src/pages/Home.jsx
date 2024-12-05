import React from 'react'
import Search from '../components/Search'

export default function Home() {
    return (
        <div>
            <img
                src="./weatherBg.jpg"
                alt="Background"
                className="w-full h-screen object-cover"
            />
            <Search />
        </div>
    )
}
