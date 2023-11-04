import WeatherData from "./WeatherData";
import CurrentConditionDisplay from "./CurrentConditionDisplay";
import StatisticsDisplay from "./StatisticsDisplay";
import ForecastDisplay from "./ForecastDisplay";
import HeatIndexDisplay from "./HeatIndexDisplay";

function WeatherStation() {
    const weatherData = new WeatherData();

    const currentConditionDisplay = new CurrentConditionDisplay(weatherData);
    const statisticsDisplay = new StatisticsDisplay(weatherData);
    const forecastDisplay = new ForecastDisplay(weatherData);
    const heatIndexDisplay = new HeatIndexDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
    weatherData.setMeasurements(82, 70, 29.2);
    weatherData.setMeasurements(78, 90, 29.2);
}

WeatherStation();