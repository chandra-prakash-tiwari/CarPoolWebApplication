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
    return CityRecord.filter((city) => city.city.toLowerCase()==(value.toLowerCase()))
}

function getCitiesDetails(value) {
    console.log(CityRecord.filter((city) => city.city == value))
}