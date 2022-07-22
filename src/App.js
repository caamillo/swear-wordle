// React
import { useState, useEffect } from 'react';

// Taiwind
import './tailwind/input.css'
import './tailwind/output.css'

// Components
import Box from './components/Box'

const gridX = 5
const gridY = 6

const initGridOutput = () => {
    const grid = []
    for (let i = 0; i < gridY; i++) { // FUCK GITHUB COPILOT
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push(<Box key={ '' + i + j } />)
        }
    }
    return grid
}
const initGridInput = () => {
    const grid = []
    for (let i = 0; i < gridY; i++) {
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push('')
        }
    }
    return grid
}

const pointer = {
    x: 0,
    y: 0
}

function App() {

    const [gridInput, setGridInput] = useState(initGridInput())
    const [gridOutput, setGridOutput] = useState(initGridOutput())

    const checkErrors = () => {
        const word = gridInput[pointer.y].join('')
        console.log(word)
    }

    const changeGridValue = (x, y, value) => {
        if (value == null || value == '') return null
        const grid = [...gridInput]
        grid[y][x] = value // <Box inchar={ value } key={ '' + x + y } />
        setGridInput(grid)
    }

    useEffect(() => {
        console.log('modifica effettuata')
        setGridOutput(
            gridInput.map( (row, crow) => row.map( (val, cval) => <Box inchar={ val != null ? val : '' } key={ '' + crow + cval } /> ))
        )
        console.log(gridOutput)
    }, [gridInput])

    useEffect(() => {
        document.addEventListener('keypress', e => {
            if (pointer.x === 5 && pointer.y === 5) return null
            if (pointer.x === 5) { pointer.x = 0; pointer.y++ }
            console.log(pointer)
            changeGridValue(pointer.x, pointer.y, e.key.toUpperCase())
            pointer.x++
            if (pointer.x === 5) { checkErrors() }
        });
    }, [])

    return (
        <div className="App">
            <div className='wordle-navbar absolute w-full'>
                <div className='flex items-center justify-between p-4 px-6 text-xl'>
                    <div>Menu</div>
                    <div className='text-2xl font-bold'>Wordle</div>
                    <div>About</div>
                </div>
            </div>
            <div className='wordle-container flex justify-center items-center h-screen'>
                <div className='wordle-grid grid grid-cols-5 grid-rows-6 gap-3'>
                    { gridOutput }
                </div>
            </div>
        </div>
    );
}

export default App;
