export const addRide = (from,to,date,time) => {
    return {
        type: 'RIDE',
        from,
        to,
        date,
        time
    }
}