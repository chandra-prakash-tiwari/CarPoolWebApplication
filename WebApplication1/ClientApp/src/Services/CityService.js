import CityRecord from '../CityData/CityRecord.json';

export const CityService = {
    getValidCity
}

function getValidCity(value) {
    var city = CityRecord.filter((city) => city.city.toLowerCase().includes(value.toLowerCase()));
    return city;
}