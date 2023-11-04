import Observer from "./Observer";
import DisplayElement from "./DisplayElement";
import WeatherData from "./WeatherData";

class CurrentConditionDisplay implements Observer, DisplayElement {
    temperature: number = 0;
    humidity: number = 0;
    
    weatherData: WeatherData;

    constructor(weatherData: WeatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    update(temperature: number, humidity: number) {
        this.temperature = temperature;
        this.humidity = humidity;

        this.display();
    }

    display() {
        console.log(`현재 상태: 온도 ${this.temperature}F, 습도 ${this.humidity}%`);
    }
}

export default CurrentConditionDisplay;
