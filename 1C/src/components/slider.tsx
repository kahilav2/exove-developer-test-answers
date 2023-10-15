import { useState, useRef, useEffect } from "react"

const DEFAULT_INITIAL_VALUE = 50

interface Props {
    onChange?: (value: number) => void
    initialValue?: number
}

export default function Slider({ onChange, initialValue }: Props) {
    const [value, setValue] = useState(initialValue ?? DEFAULT_INITIAL_VALUE)
    const [updateValueFlag, setUpdateValueFlag] = useState(false)
    const elementRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if (!updateValueFlag) return 
        setUpdateValueFlag(false)
    
        if (onChange) {
            onChange(value)
        }
    }, [updateValueFlag, onChange, value])

    const handleMouseMove = (e: MouseEvent) => {
        updateValue(e)
    }

    const updateValue = (e: MouseEvent) =>  {
        if (!elementRef.current) return

        const rect = elementRef.current.getBoundingClientRect()
        const unboundNewValue = Math.round((e.clientX - rect.left) / rect.width * 100)
        const newValue = Math.max(Math.min(unboundNewValue, 100), 0)
        setValue(newValue)
    }

    const handleMouseDown = () => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp) 
    }

    const handleMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mousemove', handleMouseMove)
        updateValue(e)
        setUpdateValueFlag(true)
    }

    return (
        <div className="my-6">
            <div ref={elementRef} 
                className="w-full bg-gray-100 h-5 rounded relative cursor-pointer" 
                onMouseDown={handleMouseDown}
                >
                
                <div className="bg-green-300 h-full pointer-events-none" style={{width: value + "%", userSelect: "none" }} />
                <div className="absolute bg-gray-400 w-1 h-8 -inset-2 border pointer-events-none" style={{ left: value + "%" }} />
            </div>
        </div>
    )
}