const swears5 = 'cazzi cazzo cesso fighe froci merda merde negra negro puppa puppe tetta tette troia troie troio zinne'.split(' ')

const getSwear = size => {
    switch(size) {
        case 5:
            return swears5[Math.floor(Math.random() * swears5.length)].toUpperCase()
    }
}

export { getSwear }