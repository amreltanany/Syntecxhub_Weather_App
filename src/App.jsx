import React, { useState, useEffect } from 'react'; // Added useEffect
import './styles/gale.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Sidebar from './components/Sidebar';
import WeatherDisplay from './components/WeatherDisplay';
import { getFullWeatherData } from './services/weatherService';

function App() {
    const [city, setCity] = useState(''); // Input field state
    const [data, setData] = useState(null);
    const [searchCity, setSearchCity] = useState('Cairo'); // Default city for useEffect

    // This hook runs automatically on startup and whenever searchCity changes
    useEffect(() => {
        const loadWeather = async () => {
            await executeWeatherFetch(searchCity);
        };
        loadWeather();
    }, [searchCity]);

    const executeWeatherFetch = async (targetCity) => {
        try {
            const result = await getFullWeatherData(targetCity);
            setData(result);
            // We don't setCity(targetCity) here anymore to keep the input clean
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'City Not Found',
                confirmButtonColor: '#1e3c72',
                timer: 5000
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!city.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Search',
                text: 'Please enter a city name!',
                confirmButtonColor: '#1e3c72'
            });
            return;
        }
        setSearchCity(city); // Triggers the useEffect
    };

    return (
        <div className="dashboard-container">
            <Sidebar
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
                onQuickSearch={(name) => setSearchCity(name)} // Triggers the useEffect
            />

            <div className="results-area">
                {data ? (
                    <WeatherDisplay data={data} />
                ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <h2 className="text-muted opacity-25 fw-light">LOADING SYSTEM...</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;