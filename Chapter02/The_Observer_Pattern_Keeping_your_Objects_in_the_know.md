# Chapter 02

## 객체들에게 연락 돌리기: 옵저버 패턴

### 기상 모니터링 애플리케이션 알아보기

기상 모니터링 애플리케이션은 아래 요소로 이루어집니다.

1. 기상 스테이션: 실제 기상 정보를 수집하는 물리 장비
2. WeatherData 객체: 기상 스테이션으로부터 오는 정보를 추적하는 객체
3. 디스플레이 장비: 사용자에게 현재 기상 조건을 보여줌
    - 1번 디스플레이: 현재 기상 조건
    - 2번 디스플레이: 기상 통계
    - 3번 디스플레이: 기상 예보

주어진 WeatherData 클래스는 다음과 같으며 구현 목표는\
"`measurementsChanged()`가 호출될 때마다 WeatherData에서 디스플레이를 업데이트해야한다."\
입니다.

```java
public class WeatherData {
    // 인스턴스 변수 선언

    public void measurementsChanged() {
        float temp = getTemperature();
        float humidity = getHumidity();
        float pressure = getPressure();

        currentConditionsDisplay.update(temp, humidity, pressure);
        statisticsDisplay.update(temp, humidity, pressure);
        forecastDisplay.update(temp, humidity, pressure);
    }
}
```

#### 쓰면서 제대로 공부하기 (1)

위에 있는 코드의 설명으로 옳은 것을 모두 골라보세요.

A. 인터페이스가 아닌 구체적인 구현을 바탕으로 코딩을 하고 있습니다.\
B. 새로운 디스플레이 항목이 추가될 때마다 코드를 변경해야 합니다.\
C. 실행 중에 디스플레이 항목을 추가하거나 제거할 수 없습니다.\
D. 디스플레이 항목들이 공통적인 인터페이스를 구현하지 않습니다.\
E. 바뀌는 부분을 캡슐화하지 않았습니다.\
F. WeatherData 클래스를 캡슐화하지 않고 있습니다.

#### 정답과 나의 의견 (1)

A. currentConditionsDisplay, statisticsDisplay 처럼 구체적인 객체로 구현하였음.\
B. 구체적인 객체로 구현했기 때문에 새로운 디스플레이가 추가되면 해당 객체가 추가로 코딩되어야 함.\
C. UI에서 버튼을 클릭하여 디스플레이를 추가하는 케이스와 같이 동적으로 수정할 수 없음.\
E. temp, humidity, pressure와 같이 다양한 파라미터를 받는 부분을 캡슐화하지 않음.

### 옵저버 패턴 이해하기

- 신문사 + "구독자" = 옵저버 패턴
- 신문자 &rarr; 주제(subject), 구독자 &rarr; 옵저버(observer)
    1. 주제에서 중요한 데이터를 관리합니다.
    2. 주제 데이터가 바뀌면 옵저버에게 그 소식이 전해집니다.
    3. 옵저버 객체들은 주제를 구독하고 있으며 주제 데이터가 바뀌면 갱신 내용을 전달받습니다.
    4. 데이터가 바뀌면 새로운 데이터 값이 어떤 방법으로든 옵저버에게 전달됩니다.

### 옵저버 패턴의 정의

```text
// 옵저버 패턴 (Observer Pattern)
한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식으로 일대다(one-to-many) 의존성을 정의합니다.
```

### 옵저버 패턴의 구조

일반적으로 주제 인터페이스와 옵저버 인터페이스가 들어있는 클래스 디자인으로 구현합니다.

1. <<인터페이스>> Subject: 주제를 나타내는 Subject 인터페이스.
    - 옵저버를 등록, 탈퇴시키는 registerObserver(), removeObserver(), notifyObservers()를 가지고 있습니다.
2. <<인터페이스>> Observer: 옵저버가 될 가능성이 있는 객체는 반드시 Observer 인터페이스를 구현해야 합니다.
3. ConcreteSubject: 주제 구상 클래스.
    - Subject 인터페이스를 구현하였으며 모든 옵저버에게 연락하는 notifyObservers() 메소드도 구현해야 합니다.
4. ConcreteObserver: 옵저버 구상 클래스.
    - Observer 인터페이스를 구현하였으며 특정 주제 구상 클래스에 등록하여 연락받을 수 있습니다.

### 느슨한 결합의 위력

`느슨한 결합 (Loose Coupling)`은 객체들이 상호작용할 수는 있지만, 서로를 잘 모르는 관계를 의미합니다. 느슨한 결합을 활용하면 유연성이 아주 좋아집니다.

```text
// 디자인 원칙 (IV)
상호작용하는 객체 사이에는 가능하면 느슨한 결합을 사용해야 한다.
```

*느슨하게 결합하는 디자인을 사용하면 변경 사항이 생겨도 무난히 처리할 수 있는 유연한 객체지향 시스템을 구축할 수 있습니다. 객체 사이의 상호의존성을 최소화할 수 있기 때문이죠.*

### 기상 스테이션 설계 및 구현하기

[codes](./codes/) 폴더 안의 코드 참고

### 라이브러리 속 옵저버 패턴 알아보기

- JDK에 있는 자바빈(JavaBean)과 [스윙(Swing) 라이브러리](https://en.wikipedia.org/wiki/Swing_(Java))에서도 옵저버 패턴을 쓰고 있습니다.

### 풀 방식으로 코드 바꾸기

- `푸시(Push) 방식`: 주제가 옵저버로 데이터를 보냄

```java
public void notifyObservers() {
    for (Observer observer : observers) {
        observer.update();
    }
}
```

- `풀(Pull) 방식`: 옵저버가 주제로부터 데이터를 당겨옴

```java
// Observer 인터페이스에서 update() 메소드에 매개변수가 없어집니다.
public void update() {
    this.temperature = weatherData.getTemperature();
    this.humidity = weatherData.getHumidity();

    display();
}
```

어느 하나를 선택하는 일은 구현 방법의 문제입니다. 다만, 대체로 옵저버가 필요한 데이터를 골라서 가져가도록 만드는 방법이 더 좋습니다.\
시간이 지남에 따라 애플리케이션은 계속 바뀌고 점점 더 복잡해지기 때문입니다.

## 핵심 정리

- 옵저버 패턴은 객체들 사이에 일대다 관계를 정의합니다.
- 주제는 동일한 인터페이스를 써서 옵저버에게 연락을 합니다.
- Observer 인터페이스를 구현하기만 하면 어떤 구상 클래스의 옵저버라도 패턴에 팜여할 수 있습니다.
- 주제는 옵저버들의 Observer 인터페이스를 구현한다는 것을 제외하면 옵저버에 관해 전혀 모릅니다. 따라서 이들 사이의 결합은 느슨한 결합입니다.
- 옵저버 패턴을 사용하면 주제가 데이터를 보내거나(푸시 방식) 옵저버가 데이터를 가져올(풀 방식) 수 있습니다. (일반적으로 풀 방식이 더 '옳은' 방식이라고 간주합니다.)
- 스윙은 다른 여러 GUI 프레임워크와 마찬가지로 옵저버 패턴을 많이 사용합니다.
- RxJava, 자바빈, RMI 외에 코코아나 스위프트, 자바스크립트와 같은 다른 언어의 프레임워크에서도 옵저버 패턴을 많이 사용합니다.
- 옵저버 패턴은 여러 개의 주제와 메시지 유형이 있는 복잡한 상황에서 사용하는 출판-구독 패턴과 친척입니다.
- 옵저버 패턴은 자주 쓰이는 패턴으로 모델-뷰-컨트롤러(MVC)를 배울 때 다시 만날 수 있습니다.
