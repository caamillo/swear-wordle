// React
import { useState, useEffect } from 'react';

// Taiwind
import './tailwind/input.css'
import './tailwind/output.css'

// Components
import Box from './components/Box'

const gridX = 5
const gridY = 6

const swears = 'cazzi cazzo cesso fighe froci merda merde negra negro puppa puppe tetta tette troia troie troio zinne'.split(' ')
const guess = swears[Math.floor(Math.random() * swears.length)].toUpperCase()
// console.log(guess)

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

const initPattern = () => {
    const pattern = []
    for (let i = 0; i < gridY; i++) {
        pattern.push([])
        for (let j = 0; j < gridX; j++) {
            pattern[i].push(0)
        }
    }
    return pattern
}

const pointer = {
    x: 0,
    y: 0
}

function App() {

    const [gridInput, setGridInput] = useState(initGridInput())
    const [gridOutput, setGridOutput] = useState(initGridOutput())
    const [pattern, setPattern] = useState(initPattern())

    const checkErrors = () => {
        // 0 IS NULL
        // 1 IS FALSE
        // 2 IS NOT IN POSITION
        // 3 IS TRUE
        const word = gridInput[pointer.y].join('')
        const temppattern = []
        for (let cw = 0; cw < guess.length; cw++) {
            if (guess[cw] == word[cw])  temppattern.push(3) // IN POSITION
            else if (guess.includes(word[cw])) temppattern.push(2)  // NOT IN POSITION
            else temppattern.push(1) // FALSE
        }
        const temppattern2 = initPattern()
        temppattern2[pointer.y] = temppattern
        setPattern(temppattern2)
    }

    const changeGridValue = (x, y, value) => {
        if (value == null || value == '') return null
        const grid = [...gridInput]
        grid[y][x] = value // <Box inchar={ value } key={ '' + x + y } />
        setGridInput(grid)
    }

    useEffect(() => {
        setGridOutput(
            gridInput.map( (row, crow) => row.map( (val, cval) => <Box pattern={ pattern[crow][cval] } inchar={ val != null ? val : '' } id={ '' + crow + cval } key={ '' + crow + cval } /> ))
        )
    }, [gridInput])

    useEffect(() => {
        document.addEventListener('keypress', e => {
            if (pointer.x === 5 && pointer.y === 5) return null
            if (pointer.x === 5) { pointer.x = 0; pointer.y++ }
            changeGridValue(pointer.x, pointer.y, e.key.toUpperCase())
            if (pointer.x === 4) { checkErrors() }
            pointer.x++
        });
    }, [])

    return (
        <div className="App">
            <div className='wordle-navbar absolute w-full'>
                <div className='flex items-center justify-between p-4 px-6'>
                    <div>Menu</div>
                    <div className='text-2xl font-bold'>Swear Wordle</div>
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
