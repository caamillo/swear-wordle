// React
import { useState, useEffect } from 'react'

function Box({ inchar, pattern, id }) {

    const [color, setColor] = useState()

    useEffect(() => {
        switch(pattern) {
            case 1:
                setColor('#ff0000')
                break
            case 2:
                setColor('#ffff00')
                break
            case 3:
                setColor('#ffffff')
                break
        }
    }, [pattern])

    return (
        <div id={ id } className='w-[60px] h-[60px] border-2 border-[#9e9e9e] flex justify-center items-center text-3xl transition ease-linear hover:bg-[#ffffff62]' style={{ backgroundColor: color }}>{ inchar }</div>
    )
}

export default Box