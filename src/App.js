// React
import { useState, useEffect } from 'react';

// Taiwind
import './tailwind/input.css'
import './tailwind/output.css'

// Components
import Box from './components/Box'

const gridX = 5
const gridY = 6

const initGrid = () => {
    const grid = []
    for (let i = 0; i < gridY; i++) { // FUCK GITHUB COPILOT
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push(<Box key={ '' + i + j } />)
        }
    }
    return grid
}

const pointer = {
    x: 0,
    y: 0
}

function App() {

    const [gridOutput, setGridOutput] = useState(initGrid())

    const changeGridValue = (x, y, value) => {
        if (value == null || value == '') return null
        const grid = [...gridOutput]
        grid[y][x] = <Box inchar={ value } key={ '' + x + y } />
        setGridOutput(grid)
    }

    useEffect(() => {
        console.log('modifica effettuata')
        console.log(gridOutput)
    }, [gridOutput])

    useEffect(() => {
        document.addEventListener('keypress', e => {
            if (pointer.x === 4 && pointer.y === 5) return null
            if (pointer.x === 4) { pointer.x = 0; pointer.y++ }
            console.log(pointer)
            changeGridValue(pointer.x, pointer.y, e.key.toUpperCase())
            pointer.x++
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
                    { gridOutput.map( row => row.map( col => col ) ) }
                </div>
            </div>
        </div>
    );
}

export default App;
