import CityRecord from '../CityData/CityRecord.json';

export const CityService = {
    getValidCity,
    getCityDetails
}

function getValidCity(value) {
    var city = CityRecord.filter((city) => city.city.toLowerCase().includes(value.toLowerCase()));
    return city;
}

function getCityDetails(value) {
    return CityRecord.filter((city) => city.city.toLowerCase().includes(value.toLowerCase()))
}