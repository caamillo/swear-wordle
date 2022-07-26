function KbdBox({ inchar, addChar, isPressed, icon }) {
    return (
        <div onClick={ () => addChar(inchar) } className={`py-2 md:py-3 m-1 cursor-pointer rounded-md flex justify-center items-center md:text-2xl transition ease-linear hover:bg-[#ffffff62] ${ isPressed ? 'bg-[#ffffff62]' : 'bg-[#2e2c2c]' } ${ icon != null ? 'md:w-[70px] w-[49px]' : 'md:w-[50px] w-[30px]' }`}>{ !(['backspace', 'enter'].includes(inchar)) && inchar.toUpperCase() }{ (['backspace', 'enter'].includes(inchar)) && icon }</div>
    )
}

export default KbdBox