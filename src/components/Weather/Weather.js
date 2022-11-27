import { useState, useEffect } from "react";
import './Weather.scss';
const Weather = (props) => {
    return (
        <div className="weather-container">
            <div className="weather-header">
                <h4>Weather</h4>
            </div>
            <div className="weather-body">
                <div className="weather-content">
                </div>
            </div>
            <div className="weather-footer">

            </div>
        </div>
    )
}
export default Weather;