const hourlyLimit = 5;
const dailyLimit = 10;

const modelRightPanel = " ._ae65 ";
const modalButtons = " button._abl- ";
const modalHartSvg = " svg._ab6- ";
const arrowModal = " ._aeap ";
// const leftButtonClass  = " ._aaqf button ";
const rightButtonClass = " ._aaqg button ";

function getRandomWait() {
    let pMin = 1000;
    let pMax = 7000;

    pMin = Math.round(pMin);
    pMax = Math.round(pMax);
    if (pMax < pMin) {
        let t = pMin;
        pMin = pMax;
        pMax = t;
    }

    return Math.floor(Math.random() * (pMax + 1 - pMin) + pMin);
}

function isLiked(hartSvg) {
    return hartSvg.attr("aria-label") === "Unlike";
}

function getDate(isTypeDay) {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();

    if (isTypeDay) {
        return `${year}-${month}-${day}`;
    }

    return `${year}-${month}-${day}.${hour}`;
}

function setLocalstorageNameSpace(key) {
    return `insta-autolike.${key}`;
}

function getLocalstorage(key) {
    const item = localStorage.getItem(setLocalstorageNameSpace(key));

    if (!item || item === 'null') {
        return null;
    }

    try {
        return item;
    } catch (e) {
        return null;
    }
}

function setLocalstorage(key, value) {
    if (value === undefined) {
        value = null;
    } else if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }

    try {
        localStorage.setItem(setLocalstorageNameSpace(key), value);
    } catch (e) {
        return false;
    }

    return true;
}

function addLikeCount(isTypeDay) {
    const date = getDate(isTypeDay);
    const currentValue = getLocalstorage(date);
    const currentValueInt = parseInt(getLocalstorage(date), 10);

    if (null === currentValue) {
        setLocalstorage(date, 1);

        return;
    }

    setLocalstorage(date, currentValueInt + 1);
}

function getLikeCount(isTypeDay) {
    const date = getDate(isTypeDay);
    const currentValue = getLocalstorage(date);
    return  parseInt(getLocalstorage(date), 10);
}

function isLimitReached(isTypeDay)
{
    const limit = isTypeDay ? dailyLimit : hourlyLimit;
    const currentCount = getLikeCount(isTypeDay);

    return currentCount > limit;
}

function main() {
    console.log(getDate());
    console.log(getDate(true));

    addLikeCount(true);
    console.log(isLimitReached(true));

    if (isLimitReached(true))
    {
        console.log("Daily like limit reached")
        setTimeout(main, getRandomWait());

        return;
    }

    addLikeCount(false);
    console.log(isLimitReached(false));

    if (isLimitReached(false))
    {
        console.log("Hourly like limit reached")
        setTimeout(main, getRandomWait());

        return;
    }

    const hartButton    = $(modelRightPanel + modalButtons).eq(1);
    const hartSvg       = $(modelRightPanel + modalButtons + modalHartSvg).eq(2);
    // const messageButton = $(modelRightPanel + modalButtons).eq(2);
    // const shareButton   = $(modelRightPanel + modalButtons).eq(3);

    const rightButton = $(arrowModal + rightButtonClass);
    // const leftButton  = $(arrowModal + leftButtonClass);

    if (!isLiked(hartSvg))
    {
        console.log("New like added");
        hartButton.click();
        rightButton.click();

        setTimeout(main, getRandomWait());

        return false;
    }
    console.log("Already liked photo");
    rightButton.click();

    setTimeout(main, getRandomWait());
}

main();
