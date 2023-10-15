import Slider from "@/components/slider"
import { useState } from "react"

const INITIAL_VOLUME = 50

export default function VolumeKnob() {
    const [volume, setVolume] = useState(INITIAL_VOLUME)
    const handleSliderChange = (position: number) => {
        setVolume(position)
    }
    return (
        <div className="flex flex-col w-1/2">
            <div>
                <h1 style={{ fontSize: 28 }}>Volume: { volume }%</h1>
            </div>
            <div>
                <Slider initialValue={volume} onChange={handleSliderChange}></Slider>
            </div>
        </div>
    )
}