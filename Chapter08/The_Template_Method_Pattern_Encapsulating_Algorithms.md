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

- `후크(Hook)`: 추상 클래스에서 선언되지만 기본적인 내용만 구현되어 있거나 아무 코드도 들어있지 않은 메소드. 서브클래스에는 다양한 위치에서 알고리즘에 끼어들 수 있도록 합니다.

[codes/BeverageTestDriveWithHook.ts](./codes/BeverageTestDriveWithHook.ts) 코드 참고

### 할리우드 원칙

```text
// 디자인 원칙 (VIII)
먼저 연락하지 마세요. 저희가 연락드리겠습니다.

할리우드 원칙을 활용하면 의존성 부태를 방지할 수 있습니다. 저수준 구성 요소가 시스템에 접속할 수는 있지만 언제, 어떻게 그 구성 요소를 사용할지는 고수준 구성 요소가 결정합니다.
```

**의존성 부패** 란? 어떤 고수준 구성 요소가 저수준 구성 요소에 의존하고, 그 저수준 구성 요소가 다시 고수준 구성 요소에 의존하면서 의존성이 복잡하게 꼬인 것을 의미합니다.

#### 할리우드 원칙과 템플릿 메소드 패턴

`CaffeineBeverage` 클래스를 살펴보면, 알고리즘을 장악하는 `prepareRecipe()` 메소드를 가지고 있는 `CaffeineBeverage` 클래스가 고수준 구성 요소이고,\
`Coffee`, `Tea` 클래스가 저수준 구성요소입니다. `Coffee`와 `Tea` 클래스는 호출 당하기 전까지는 `CaffeineBeverage` 클래스를 직접 호출하지 않죠.

#### 할리우드 원칙 vs. 의존성 뒤집기 원칙

- 할리우드 원칙: 저수준 구성요소가 컴퓨테이션에 참여하면서도 저수준 구성요소와 고수준 계층 간 의존을 없애도록 프레임워크나 구성 요소를 구축하는 기법
  - 저수준 구성 요소를 다양하게 사용할 수 있으면서도 다른 클래스가 구성 요소에 너무 의존하지 않게 만들어 주는 디자인 구현 기법
- 의존성 뒤집기 원칙: 될 수 있으면 구상 클래스 사용을 줄이고 추상화된 것을 사용해야 한다는 원칙
  - 의존성 뒤집기 원칙이 훨씬 더 상하고 일반적인 내용

### 템플릿 메소드 패턴 vs. 전략 패턴 vs. 팩토리 메소드 패턴

- 템플릿 메소드 패턴: 알고리즘의 어떤 단계를 구현하는 방법을 서브클래스에서 결정합니다.
- 전략 패턴: 바꿔 쓸 수 있는 행동을 캡슐화하고, 어떤 행동을 사용할 지는 서브클래스에 맡깁니다.
- 팩토리 메소드 패턴: 구상 클래스의 인스턴스 생성을 서브클래스에서 결정합니다.

### 자바 API 속 템플릿 메소드 패턴 알아보기

#### 템플릿 메소드로 정렬하는 방법

`Arrays` 클래스의 [`sort()` 메소드](https://www.geeksforgeeks.org/arrays-sort-in-java-with-examples/)에는 정렬 알고리즘을 가지고 있는 템플릿 메소드가 있으며 `compareTo()` 메소드에 의해 결과가 결정됩니다.\
그렇다면 `compareTo()`는 어디서 오는 것일까요?\
바로, `sort()`를 통해서 넘어온 파라미터의 객체에서 구현된 `compareTo()`를 호출합니다. 때문에 `sort()` 메소드에 파라미터로 들어가는 배열은 `Comparable 인터페이스`를 구현해야하죠.
&rarr; `sort()`라는 템플릿 메소드가 있는 `Arrays` 클래스를 상속하지 않았지만, 정적 메소드를 정의한 다음 `compareTo()` 메소드를 정렬될 객체에서 구현하도록 함으로써 `sort()` 메소드 구현 자체는 템플릿 메소드 패턴의 기본 정신을 충실히 따르고 있습니다.

## 핵심 정리

- 템플릿 메소드는 알고리즘의 단계를 정의하며 일부 단계를 서브클래스에서 구현하도록 할 수 있습니다.
- 템플릿 메소드 패턴은 코드 재사용에 큰 도움이 됩니다.
- 템플릿 메소드가 들어있는 추상 클래스는 구상 메소드, 추상 메소드, 후크를 정의할 수 있습니다.
- 추상 메소드는 서브클래스에서 구현합니다.
- 후크는 추상 클래스에 들어있는 메소드로 아무 일도 하지 않거나 기본 행동만을 정의합니다. 서브 클래스에서 후크를 오버라이드할 수 있습니다.
- 할리우드 원칙에 의하면, 저수준 모듈을 언제 어떻게 호출할지는 고수준 모듈에서 결정하는 것이 좋습니다.
- 템플릿 메소드 패턴은 실전에서도 꽤 자주 쓰이지만 반드시 '교과서적인' 방식으로 적용되진 않습니다.
- 전략 패턴과 템플릿 메소드 패턴은 모두 알고리즘을 캡슐화하는 패턴이지만 전략 패턴은 구성을, 템플릿 메소드 패턴은 상속을 사용합니다.
- 팩토리 메소드 패턴은 특화된 템플릿 메소드 패턴입니다.
