import Observer from "./Observer";
import Subject from "./Subject";

class WeatherData implements Subject {
    observers: Observer[] = [];
    temperature: number = 0;
    humidity: number = 0;
    pressure: number = 0;

    constructor() {
        this.observers = [];
    }

    registerObserver(o: Observer){
        this.observers.push(o);
    }

    removeObserver(o: Observer){
        this.observers = this.observers.filter(observer => observer !== o);
    }

    notifyObservers(){
        this.observers.forEach(o => {
            o.update(this.temperature, this.humidity, this.pressure);
        });
    }

    measurementsChanged() {
        this.notifyObservers();
    }

    setMeasurements(temperature: number, humidity: number, pressure: number) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;

        this.measurementsChanged();
    }
}

export default WeatherData;