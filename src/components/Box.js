function Box({ inchar }) {
    return (
        <div className='w-[60px] h-[60px] border-2 border-[#9e9e9e] flex justify-center items-center text-3xl transition ease-linear hover:bg-[#ffffff62]'>{ inchar }</div>
    )
}

export default Box