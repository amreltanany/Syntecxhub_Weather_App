import React from 'react';

const WeatherDisplay = ({ data }) => {
    return (
        <div className="w-100 animate-fade" style={{ maxWidth: '1000px' }}>
            <div className="main-card">
                <div className="location-info">
                    <h2 className="fw-bold">{data.current.name}, {data.current.sys.country}</h2>
                    <p className="text-muted">{new Date().toDateString()}</p>
                    <div className="d-flex align-items-center mt-4">
                        <img src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`} alt="icon" width="120" />
                        <h1 className="display-1 fw-bold mb-0">{Math.round(data.current.main.temp)}&deg;C</h1>
                    </div>
                    <p className="text-capitalize fs-4 mt-2">{data.current.weather[0].description}</p>
                </div>

                <div className="metrics-grid">
                    <div className="metric-box"><span>Humidity</span><strong>{data.current.main.humidity}%</strong></div>
                    <div className="metric-box"><span>Wind</span><strong>{data.current.wind.speed} km/h</strong></div>
                    <div className="metric-box"><span>Pressure</span><strong>{data.current.main.pressure} mb</strong></div>
                    <div className="metric-box"><span>Visibility</span><strong>{data.current.visibility / 1000} km</strong></div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="fw-bold mb-4">5-Day Forecast</h4>
                <div className="forecast-row">
                    {data.daily.map((day, i) => (
                        <div key={i} className="forecast-card shadow-sm">
                            <p className="mb-1 small fw-bold">{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                            <p className="mb-0"><strong>{Math.round(day.main.temp)}&deg;</strong></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;