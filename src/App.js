// React
import { useState, useEffect, useRef } from 'react';

// Taiwind
import './tailwind/input.css'
import './tailwind/output.css'

// CSS
import './css/modal.css'

// Components
import Box from './components/Box'
import Keyboard from './components/Keyboard';

// Utils
import { getSwear } from './utils/swears';
import alphabet from 'alphabet'

const gridY = 6

const guess = getSwear(5) // 5
// console.log(guess)

const initGridInput = (gridX) => {
    const grid = []
    for (let i = 0; i < gridY; i++) {
        grid.push([])
        for (let j = 0; j < gridX; j++) {
            grid[i].push('')
        }
    }
    console.log(grid)
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
    const [pattern, setPattern] = useState(initPattern(gridX))
    const [isCtrlDown, setIsCtrlDown] = useState(false)
    const [pressedChar, setPressedChar] = useState()
    const [won, setWon] = useState(false)

    // Refs
    const wonRef = useRef(won)
    const isCtrlDownRef = useRef(isCtrlDown)

    // Update Refs
    useEffect(() => {
        wonRef.current = won
        isCtrlDownRef.current = isCtrlDown
    }, [won, isCtrlDown])

    const addChar = (inchar) => {
        if (wonRef.current) return
        if (inchar.toLowerCase() === 'control') return setIsCtrlDown(true)
        if (isCtrlDownRef.current) return
        if (pointer.x === 5 && pointer.y === 5) return
        if (pointer.x === 5) { pointer.x = 0; pointer.y++ }
        if (!(alphabet.includes(inchar))) {
            if (inchar.toLowerCase() === 'backspace' && pointer.x !== 0) { changeGridValue(--pointer.x, pointer.y, ' ') }
            return
        }
        changeGridValue(pointer.x, pointer.y, inchar.toUpperCase())
        if (pointer.x === 4) { checkErrors() }
        pointer.x++
    }

    const restart = () => {
        const modalWrap = document.querySelector('.modal-wrap')
        const modalCard = document.querySelector('.modal-content')
        setGridInput(initGridInput(gridX))
        setPattern(initPattern(gridX))
        setWon(false)
        modalCard.classList.remove('fadeInCard')
        modalCard.style.opacity = 0
        modalWrap.classList.remove('fadeInOverlay')
        modalWrap.style.opacity = 0
        pointer.x = 0
        pointer.y = 0
        console.log(gridInput)
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
        if (won) return
        if (value == null || value == '') return null
        const grid = [...gridInput]
        grid[y][x] = value.toUpperCase() // <Box inchar={ value } key={ '' + x + y } />
        setGridInput(grid)
    }

    useEffect(() => {
        document.addEventListener('keyup', e => {
            if (e.key.toLowerCase() === 'control') return setIsCtrlDown(false)
            setTimeout(() => {
                setPressedChar(null)
            }, 300)
        })
        document.addEventListener('keydown', e => {
            addChar(e.key)
            setPressedChar(e.key)
        })
    }, [])

    useEffect(() => {
        const modalWrap = document.querySelector('.modal-wrap')
        const modalCard = document.querySelector('.modal-content')
        if (won) {
            setTimeout(() => {
                modalWrap.style.display = 'flex'
                modalCard.classList.add('fadeInCard')
                setTimeout(() => modalCard.style.opacity = 1, 500)
            }, 200)
        }
    }, [won])

    return (
        <div className="App">
            <div className='wordle-navbar fixed w-full bg-[#121212] z-10'>
                <div className='flex items-center justify-center md:justify-between p-4 px-6'>
                    <div className='hover:opacity-75 transition delay-75 hidden md:block'>Menu</div>
                    <div className='hover:opacity-75 transition delay-75 text-2xl font-bold'>Swear Wordle</div>
                    <div className='hover:opacity-75 transition delay-75 hidden md:block'><a href='https://github.com/caamillo/swear-wordle'>About</a></div>
                </div>
            </div>
            <div className='wordle-modal fixed w-full h-full'>
                <div className='modal-wrap backdrop-blur-md hidden justify-center items-center w-full h-full'>
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
                { guess && <p className='m-5'>{ guess }</p> }
                <div className='wordle-grid grid grid-cols-5 grid-rows-6 gap-3'>
                    { gridInput.map( (row, crow) => row.map( (val, cval) => <Box pattern={ pattern[crow][cval] } inchar={ val != null ? val : '' } id={ '' + crow + cval } key={ '' + crow + cval } /> )) }
                </div>
                <Keyboard pressedChar={ pressedChar } addChar={ addChar } />
            </div>
        </div>
    );
}

export default App;
