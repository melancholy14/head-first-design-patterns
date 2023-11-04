import Observer from "./Observer";
import DisplayElement from "./DisplayElement";
import WeatherData from "./WeatherData";

class HeatIndexDisplay implements Observer, DisplayElement {
    heatIndex: number = 0;
    
    weatherData: WeatherData;

    constructor(weatherData: WeatherData) {
        this.weatherData = weatherData;

        weatherData.registerObserver(this);
    }

    update(temperature: number, humidity: number) {
        this.heatIndex = this.computeHeatIndex(temperature, humidity);

        this.display();
    }

    computeHeatIndex (t: number, rh: number) {
        const result = ((16.923 + (0.185212 * t) + (5.37941 * rh) - (0.100254 * t * rh) 
			+ (0.00941695 * (t * t)) + (0.00728898 * (rh * rh)) 
			+ (0.000345372 * (t * t * rh)) - (0.000814971 * (t * rh * rh)) +
			(0.0000102102 * (t * t * rh * rh)) - (0.000038646 * (t * t * t)) + (0.0000291583 * 
			(rh * rh * rh)) + (0.00000142721 * (t * t * t * rh)) + 
			(0.000000197483 * (t * rh * rh * rh)) - (0.0000000218429 * (t * t * t * rh * rh)) +
			0.000000000843296 * (t * t * rh * rh * rh)) -
			(0.0000000000481975 * (t * t * t * rh * rh * rh)));

        return Math.round(result * 100) / 100;
    }

    display() {
        console.log(`체감 온도: ${this.heatIndex}`);
    }
}

export default HeatIndexDisplay;
