import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, 
            {
                params: {
                  bl_latitude: 'sw.lat',
                  tr_latitude: 'ne.lat',
                  bl_longitude: 'sw.long',
                  tr_longitude: 'ne.long',
                },
                headers: {
                  'x-rapidapi-key': '2b87be230cmsh27c492cf6f4b829p10e2e0jsndee06799a3e1',
                  'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
                },
        });
        return data;
    }
    catch(error){
        console.log(error)
    }
}

export const getWeatherData = async(lat, lng) => {
    try{
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
            params: {lon: 'lng', lat: 'lat',},
            headers: {
                'x-rapidapi-key': '2b87be230cmsh27c492cf6f4b829p10e2e0jsndee06799a3e1',
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
        });
        return data;
    }
    catch(error){
        console.log(error)
    }
}