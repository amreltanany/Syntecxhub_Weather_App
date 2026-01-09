import axios from 'axios';

const API_KEY = '5a65d1abf2026b557ba2c0b3e4dc4157';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getFullWeatherData = async (city) => {
    try {
        const currentRes = await axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);

        
        const forecastRes = await axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);

        const dailyData = forecastRes.data.list.filter((_, index) => index % 8 === 0);

        return {
            current: currentRes.data,
            daily: dailyData
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("City not found");
        }
        throw new Error("Network error occurred");
    }
};