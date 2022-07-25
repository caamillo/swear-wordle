// React
import { useState, useEffect } from 'react'

function Box({ inchar, pattern, id }) {

    const [color, setColor] = useState()

    useEffect(() => {
        switch(pattern) {
            case 0:
                setColor('transparent')
                break
            case 1:
                setColor('#6a2e2e')
                break
            case 2:
                setColor('#a3a320')
                break
            case 3:
                setColor('#518324')
                break
        }
    }, [pattern])

    return (
        <div id={ id } className='w-[50px] md:w-[60px] aspect-square border-2 border-[#9e9e9e] flex justify-center items-center text-3xl transition ease-linear hover:bg-[#ffffff62]' style={{ backgroundColor: color }}>{ inchar }</div>
    )
}

export default Box