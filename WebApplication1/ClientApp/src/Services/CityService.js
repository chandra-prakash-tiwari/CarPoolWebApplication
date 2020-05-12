import CityRecord from '../CityData/CityRecord.json';

export const CityService = {
    getValidCity,
    getCityDetails,
    getCitiesDetails
}

function getValidCity(value) {
    if(value!=null)
        return CityRecord.filter((city) => city.city.toLowerCase().includes(value.toLowerCase()));

    return CityRecord.filter((city) => city.city.includes(value));
}

function getCityDetails(value) {
    var abc = CityRecord.filter((city) => city.city.toLowerCase() === (value.toLowerCase()));
    return abc[0];
}

function getCitiesDetails(value) {
    console.log(CityRecord.filter((city) => city.city == value))
}