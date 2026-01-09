import React from 'react';

const Sidebar = ({ city, setCity, onSearch, onQuickSearch }) => {
    return (
        <div className="sidebar shadow-lg">
            <h1 className="gale-title">GALE <span className="gale-title-weather">WEATHER</span> </h1>

            <form onSubmit={onSearch} className="input-group mb-3">
                <input
                    className="form-control border-0 py-3"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-dark px-3" type="submit">Search</button>
            </form>

            <hr />

            <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
                {['Cairo', 'London', 'Kanpur'].map((name) => (
                    <button
                        key={name}
                        className="btn btn-outline-light btn-sm rounded-pill px-3"
                        onClick={() => onQuickSearch(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;