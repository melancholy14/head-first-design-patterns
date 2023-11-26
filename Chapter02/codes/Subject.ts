import Observer from "./Observer";

interface Subject {
    registerObserver: (o: Observer) => void;
    removeObserver: (o: Observer) => void;
    notifyObservers: VoidFunction;
}

export default Subject;