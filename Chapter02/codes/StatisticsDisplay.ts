import Observer from "./Observer";
import DisplayElement from "./DisplayElement";
import WeatherData from "./WeatherData";

class StatisticsDisplay implements Observer, DisplayElement {
    averageTemp: number = 0;
    maxTemp: number = 0;
    minTemp: number = 1000;
    count: number = 0;
    sumTemp: number = 0;
    
    weatherData: WeatherData;

    constructor(weatherData: WeatherData) {
        this.weatherData = weatherData;

        weatherData.registerObserver(this);
    }

    update(temperature: number) {
        if (this.maxTemp < temperature) {
            this.maxTemp = temperature;
        }

        if (this.minTemp > temperature) {
            this.minTemp = temperature;
        }

        this.sumTemp += temperature;
        this.count += 1;
        this.averageTemp = this.sumTemp/this.count;

        this.display();
    }

    display() {
        console.log(`평균/최고/최저 온도 = ${this.averageTemp}/${this.maxTemp}/${this.minTemp}`);
    }
}

export default StatisticsDisplay;
