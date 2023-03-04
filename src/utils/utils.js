const epochToDate = (timestamp) => {
    const myDate = new Date( timestamp * 1000);
    return myDate.toLocaleString();
}

function calculateGasusedPercentage(gasUsedStr){
    const gastUsedInt = parseInt(gasUsedStr);
    const percentage = (gastUsedInt-15000000)/15000000*100;
    const sign = percentage < 0 ? '-' : '+';

    return `${sign} ${Math.abs(percentage)}`; 
}

function commafy( numString ) {
    var str = numString.split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

const isEmpty = (str) => (!str?.length);

const hashOrNumber = (blockId) => {
    return blockId.split('x').length === 2 ? blockId.trim() : parseInt(blockId)
}

export {
    epochToDate,
    commafy,
    calculateGasusedPercentage,
    isEmpty,
    hashOrNumber
}