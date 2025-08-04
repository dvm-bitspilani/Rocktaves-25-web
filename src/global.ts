const randInt = (min:number = 1, max:number) => {
    return Math.round(Math.random()*(max - min) + min);
}

const setObjectState = (state: any, key: string, value: any) => {
    const newObject = {...state}
    newObject[key] = value;
    return newObject;
}

const addItemToArrayState = (state: any, item: any) => {
    console.log(state, item)
    const newArray = [...state]
    newArray.push(item)
    return newArray
}

const arrayStatePop = (state: any) => {
    const newArray = [...state]
    newArray.splice(0, 1)
    return newArray;
}

export {setObjectState, randInt, addItemToArrayState, arrayStatePop};