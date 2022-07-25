function KbdBox({ inchar, addChar }) {
    return (
        <div onClick={ () => addChar(inchar) } className=' w-[30px] md:w-[50px] py-2 md:py-3 m-1 cursor-pointer bg-[#2e2c2c] rounded-md flex justify-center items-center md:text-2xl transition ease-linear hover:bg-[#ffffff62]'>{ inchar.toUpperCase() }</div>
    )
}

export default KbdBox