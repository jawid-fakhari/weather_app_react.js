import { Html, OrbitControls } from "@react-three/drei"
import Search from "./components/Search"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Background from "./components/Background"

export default function App() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }} className="">
            <Suspense>
                <ambientLight />
                <OrbitControls />
                <Background />

                {/* <Html>
                    <Search />
                </Html> */}
            </Suspense>
        </Canvas>
    )
}
