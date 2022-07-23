// React
import { useState, useEffect } from 'react';

// Taiwind
import './tailwind/input.css'
import './tailwind/output.css'

// CSS
import './css/modal.css'

// Components
import Box from './components/Box'

// Utils
import { getSwear } from './utils/swears';
import alphabet from 'alphabet'

const gridY = 6

const guess = getSwear(5) // 5
// console.log(guess)

const initGridOutput = (gridX) => {
    const grid = []
    for (let i = 0; i < gridY; i++) { // FUCK GITHUB COPILOT
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push(<Box key={ '' + i + j } />)
        }
    }
    return grid
}

const initGridInput = (gridX) => {
    const grid = []
    for (let i = 0; i < gridY; i++) {
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push('')
        }
    }
    return grid
}

const initPattern = (gridX) => {
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

    const [gridX, setGridX] = useState(5)
    const [gridInput, setGridInput] = useState(initGridInput(gridX))
    const [gridOutput, setGridOutput] = useState(initGridOutput(gridX))
    const [pattern, setPattern] = useState(initPattern(gridX))
    const [won, setWon] = useState(false)

    const restart = () => {
        const modalWrap = document.querySelector('.modal-wrap')
        const modalCard = document.querySelector('.modal-content')
        setGridInput(initGridInput(gridX))
        setGridOutput(initGridOutput(gridX))
        setPattern(initPattern(gridX))
        setWon(false)
        modalCard.classList.remove('fadeInCard')
        modalCard.style.opacity = 0
        modalWrap.classList.remove('fadeInOverlay')
        modalWrap.style.opacity = 0
    }

    const checkErrors = () => {
        // 0 IS NULL
        // 1 IS FALSE
        // 2 IS NOT IN POSITION
        // 3 IS TRUE
        const word = gridInput[pointer.y].join('')
        const temppattern = []
        for (let cw = 0; cw < guess.length; cw++) {
            if (guess[cw] == word[cw]) temppattern.push(3) // IN POSITION
            else if (guess.includes(word[cw])) temppattern.push(2)  // NOT IN POSITION
            else temppattern.push(1) // FALSE
        }
        if (temppattern.every( p => p === 3 )) setWon(true)
        const temppattern2 = initPattern()
        temppattern2[pointer.y] = temppattern
        setPattern(temppattern2)
    }

    const changeGridValue = (x, y, value) => {
        console.log(won)
        if (won) return
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
            if (!(alphabet.includes(e.key))) {
                if (e.key.toLowerCase() === 'backspace' && pointer.x !== 0) { changeGridValue(--pointer.x, pointer.y, ' ') }
                return
            }
            changeGridValue(pointer.x, pointer.y, e.key.toUpperCase())
            if (pointer.x === 4) { checkErrors() }
            pointer.x++
        });
    }, [])

    useEffect(() => {
        const modalWrap = document.querySelector('.modal-wrap')
        const modalCard = document.querySelector('.modal-content')
        if (won) {
            setTimeout(() => {
                modalWrap.classList.add('fadeInOverlay')
                setTimeout(() => {
                    modalWrap.style.opacity = 1
                    modalCard.classList.add('fadeInCard')
                    setTimeout(() => modalCard.style.opacity = 1, 500)
                }, 2e3)
            }, 200)
        }
    }, [won])

    return (
        <div className="App">
            <div className='wordle-navbar fixed w-full bg-[#121212] z-10'>
                <div className='flex items-center justify-between p-4 px-6'>
                    <div className='hover:opacity-75 transition delay-75'>Menu</div>
                    <div className='hover:opacity-75 transition delay-75 text-2xl font-bold'>Swear Wordle</div>
                    <div className='hover:opacity-75 transition delay-75'><a href='https://github.com/caamillo/swear-wordle'>About</a></div>
                </div>
            </div>
            <div className='wordle-modal fixed w-full h-full'>
                <div className='modal-wrap backdrop-blur-md opacity-0 flex justify-center items-center w-full h-full'>
                    <div className='modal-content bg-[#201f1f] opacity-0 p-6 rounded-md space-y-3'>
                        <div className='modal-title'>
                            <div className='text-2xl font-bold'>Congrats</div>
                            <div className='text-xs'>You've just won!</div>
                        </div>
                        <div className='modal-desc text-sm'>Wanna do a fresh <button onClick={ restart } className='text-[#944dd3]'>restart</button>?</div>
                    </div>
                </div>
            </div>
            <div className='wordle-container flex flex-col justify-center items-center h-screen'>
                <p className='m-5'>{ guess }</p>
                <div className='wordle-grid grid grid-cols-5 grid-rows-6 gap-3'>
                    { gridOutput }
                </div>
            </div>
        </div>
    );
}

export default App;
