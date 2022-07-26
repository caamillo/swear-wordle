// Components
import KbdBox from './KbdBox'

// Icons
import { BackspaceIcon, ChevronUpIcon } from '@heroicons/react/outline'

function Keyboard({ addChar, pressedChar }) {

    const kbdRows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
    ]

    return (
        <div className='absolute bottom-0 w-full'>
            <div className='flex flex-col justify-center items-center mb-6'>
                { kbdRows.map( (row, crow) => <div key={ crow } className='flex'>{ row.map( (col, ccol) => <KbdBox key={ 'K' + crow + ccol } addChar={ addChar } icon={ col !== 'backspace' ? (col === 'enter' ? <ChevronUpIcon className='w-[30px]' /> : null) : <BackspaceIcon className='w-[30px]' /> } isPressed={ (pressedChar != null) && (pressedChar.toUpperCase() === col.toUpperCase()) } inchar={ col } /> ) }</div> ) }
            </div>
        </div>
    )
}

export default Keyboard