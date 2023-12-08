# Chapter 08

## 알고리즘 캡슐화하기: 템플릿 메소드 패턴

### 커피와 홍차 만들기

스타버즈 커피와 홍차 만드는 법이 각각 있습니다. 각각에 대한 클래스도 함께 만들어볼게요.

#### 스타버즈 커피 만드는 법

1. 물을 끓인다.
2. 끓는 물에 커피를 우려낸다.
3. 커피를 컵에 따른다.
4. 설탕과 우유를 추가한다.

```java
public class Coffee {
    prepareRecipe() {
        boilWater();
        brewCoffeeGrinds();
        pourInCup();
        addSugarAndMilk();
    }

    boilWater() { ... }
    brewCoffeeGrinds() { ... }
    pourInCup() { ... }
    addSugarAndMilk() { ... }
}
```

#### 스타버즈 홍차 만드는 법

1. 물을 끓인다.
2. 끓는 물에 찻잎을 우려낸다.
3. 홍차를 컵에 따른다.
4. 레몬을 추가한다.

```java
public class Tea {
    prepareRecipe() {
        boilWater();
        steepTeaBag();
        pourInCup();
        addLemon();
    }

    boilWater() { ... }
    steepTeaBag() { ... }
    pourInCup() { ... }
    addLemon() { ... }
}
```

### Coffee 클래스와 Tea 클래스 추상화하기

`prepareRecipe()` 메소드와 함꼐 중복되는 부분이 보이는데요. 중복되는 걸 없애고자 추상화 해봅시다.

```java
public abstract class CaffeineBeverage {
    abstract void prepareRecipe(); // 서브클래스에서 오버라이드해서 각각의 제조법을 구현

    void boilWater() { ... }
    void pourInCup() { ... }
}

public class Coffee extends CaffeineBeverage {
    void prepareRecipe() {
        boilWater();
        brewCoffeeGrinds();
        pourInCup();
        addSugarAndMilk();
    }

    void brewCoffeeGrinds() { ... }
    void addSugarAndMilk() { ... }
}

public class Tea extends CaffeineBeverage {
    void prepareRecipe() {
        boilWater();
        steepTeaBag();
        pourInCup();
        addLemon();
    }

    void steepTeaBag() { ... }
    void addLemon() { ... }
}
```

### `prepareRecipe()` 메소드 추상화하기

`prepareRecipe()` 메소드를 더 들여다보면 제조법이 똑같다는 것을 알 수 있습니다. 음료만 다를 뿐이죠.

우선, 각각의 제조법에서 다른 점들을 살펴봅시다. 메소드명을 일반화해보면 어떨까요?

- 우려내는 것으로 일반화: `brewCoffeeGrinds()`, `steepTeaBag()` &rarr; `brew()`
- 첨가물을 추가한다는 것으로 일반화: `addSugarAndMilk()`, `addLemon()` &rarr; `addCondiments()`

일반화한 메소드들을 가지고 이제 `prepareRecipe()` 메소드를 `CaffeineBeverage` 클래스에 다시 넣어봅시다.

```java
public abstract class CaffeineBeverage { // CaffeineBeverage만 따로 객체화할 수 없기 때문에 추상 클래스로 선언
    final void prepareRecipe() { // 서브클래스가 오버라이드해서 알고리즘을 바꾸지 못하도록 final 선언
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    void boilWater() { ... }
    abstract void brew();           // Coffee와 Tea에서 각각 다르게 처리하는 메소드를 추상 메소드로 선언
    void pourInCup() { ... }
    abstract void addCondiments();
}

public class Coffee extends CaffeineBeverage {
    void brew() { ... }
    void addCondiments() { ... }
}

public class Tea extends CaffeineBeverage {
    void brew() { ... }
    void addCondiments() { ... }
}
```

[codes/BeverageTestDrive.ts](./codes/BeverageTestDrive.ts) 코드 참고

### 템플릿 메소드 패턴 알아보기

`템플릿 메소드`란?
- 알고리즘의 각 단계를 정의하며, 서브클래스에서 일부 단계를 구현할 수 있도록 유도합니다.
    - 예) CaffeineBeverage의 prepareRecipe() 메소드
- 동작 원리
    1. 템플릿 메소드를 가지고 있는 베이스 클래스와 베이스 클래스를 상속한 서브클래스가 있습니다.
    2. 서브클래스의 객체가 만들어집니다.
    3. 객체의 템플릿 메소드를 호출합니다.
    4. 템플릿 메소드에서 알고리즘의 각 단계에 해당하는 메소드들을 호출합니다.
    5. 메소드들이 호출되고 일련이 작업이 처리됩니다. 일부 메소드들은 서브클래스에서 구현된 작업을 처리합니다.

#### 템플릿 메소드를 써서 좋은 점 feat. CaffeineBeverage

1. CaffeineBeverage 클래스에서 작업을 처리합니다. 알고리즘을 독점하죠.
   - 알고리즘이 한 군데에 모여 있으므로 한 부분만 고치면 됩니다.
   - CaffeineBeverage 클래스에 알고리즘 지식이 집중되어 있으며 일부 구현만 서브클래스에 의존합니다.
2. CaffeineBeverage 클래스 덕분에 서브클래스에서 코드를 재사용할 수 있습니다.
3. 다른 음료도 쉽게 추가할 수 있는 프레임워크를 제공합니다. 음료를 추가할 때 몇 가지 메소드만 더 만들면 됩니다.

### 템플릿 메소드 패턴의 정의

```text
// 템플릿 메소드 패턴 (Template Method Pattern)
알고리즘의 골격을 정의합니다. 템플릿 메소드를 사용하면 알고리즘의 일부 단계를 서브클래스에서 구현할 수 있으며, 알고리즘의 구조는 그대로 유지하면서 알고리즘의 특정 단계를 서브클래스에서 재정의할 수도 있습니다.
```

### 템플릿 메소드 속 후크 알아보기

-  `후크(Hook)`: 추상 클래스에서 선언되지만 기본적인 내용만 구현되어 있거나 아무 코드도 들어있지 않은 메소드. 서브클래스에는 다양한 위치에서 알고리즘에 끼어들 수 있도록 합니다.

[codes/BeverageTestDriveWithHook.ts](./codes/BeverageTestDriveWithHook.ts) 코드 참고

<!-- 8. The Template Method Pattern: Encapsulating Algorithms

    •            The Hollywood Principle
    •            The Hollywood Principle and Template Method
    •            Template Methods in the Wild
    •            Sorting with Template Method
    •            We’ve got some ducks to sort...
    •            What is compareTo()?
    •            Comparing Ducks and Ducks
    •            Let’s sort some Ducks
    •            The making of the sorting duck machine
    •            Swingin’ with Frames
    •            Applets
    •            Tools for your Design Toolbox -->