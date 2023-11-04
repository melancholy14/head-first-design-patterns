import Observer from "./Observer";
import DisplayElement from "./DisplayElement";
import WeatherData from "./WeatherData";

class ForecastDisplay implements Observer, DisplayElement {
    prevPressure: number = 0;
    currentPressure: number = 0;
    
    weatherData: WeatherData;

    constructor(weatherData: WeatherData) {
        this.weatherData = weatherData;

        weatherData.registerObserver(this);
    }

    update(temperature: number, humidity: number, pressure: number) {
        this.prevPressure = this.currentPressure;
        this.currentPressure = pressure;

        this.display();
    }

    display() {
        let status = '지금과 비슷할 것 같습니다.';
        if (this.prevPressure < this.currentPressure) {
            status = '날씨가 좋아지고 있습니다!';
        } else if (this.prevPressure > this.currentPressure) {
            status = '쌀쌀하며 비가 올 것 같습니다.';
        }
        
        console.log(`기상 예보: ${status}`);
    }
}

export default ForecastDisplay;
