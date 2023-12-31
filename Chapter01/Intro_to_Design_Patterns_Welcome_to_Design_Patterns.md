# Chapter 01

## 디자인 패턴의 세계로 떠나기: 디자인 패턴 소개와 전략 패턴

### 오리 시뮬레이션 게임, SimUDuck app

오리 시뮬레이션 게임 "SimUDuck"을 개발 중인 Joe.\
Duck이라는 클래스에 quack(), swim(), display() 함수가 있고 MallardDuck, RedheadDuck이 Duck 클래스를 상속 받도록 개발했음.\
회사에서 오리를 날게 해달라고 해서 Duck 클래스에 fly() 함수를 추가함.\
그런데, 고무오리를 표현하기 위해 RubberDuck 또한 Duck을 상속 받도록 했더니, 날지 못하는 고무오리 역시 날 수 있게 됨.\
RubberDuck에서 fly()에 아무것도 하지 않도록 오버라이드했지만, 나무로 된 가짜 오리 DecoyDuck에서도 그냥 오버라이드하면 되는걸까?

#### 쓰면서 제대로 공부하기 (1)

다음 중 Duck의 행동을 상속할 때 단점이 될 수 있는 요소를 모두 고르시오.\
A. 서브클래스에서 코드가 중복된다.\
B. 실행 시에 특징을 바꾸기 힘들다.\
C. 오리가 춤추게 만들 수 없다.\
D. 모든 오리의 행동을 알기 힘들다.\
E. 오리가 날면서 동시에 꽥꽥거릴 수 없다.\
F. 코드를 변경했을 때 다른 오리들에게 원치 않은 영향을 끼칠 수 있다.

#### 정답과 나의 의견 (1)

A. RubberDuck과 DecoyDuck에서 아무것도 하지 않도록 오버라이드할 때 중복이 발생함\
B. 컴파일할 때 클래스가 한 번 생성되면 러닝할 때를 위한 setter를 만들지 않는 이상 해당 클래스의 동작을 변형하기 힘듦\
D. Duck 클래스는 상속 받은 MallardDuck, RedheadDuck 등의 행동을 알지 못함\
F. Duck 클래스에서 fly() 함수명이 flyToSky()와 같이 함수명이 바뀌면 RubberDuck, DecoyDuck에서 오버라이드한 함수에 영향을 끼침

### 소프트웨어 개발 불변의 진리

**_변화_**

#### 쓰면서 제대로 공부하기 (2)

변화의 원인은 수없이 많습니다. 여러분이 애플리케이션을 만드는 과정에서 코드를 바꿔야 했던 이유를 적어 보세요.(일단 2가지 이유를 적어 놓았습니다.)

1. 고객이나 사용자가 다른 것을 요구하거나 새로운 기능을 원할 때
2. 회사에서 데이터베이스 종류를 바꾸고 데이터도 전과 다른 데서 구입하기로 했는데, 그게 지금 사용하는 데이터 포맷과 완전히 다른 경우. 생각만 해도 골치 아프네요.
3. 성능 모니터링 이후, 리팩토링이 필요하다고 논의되었을 때
4. 버그가 발견되어 고쳐야하는데 다른 기능에 영향이 생겨서 전면적으로 코드를 바꿔야 할 때
5. 유저에게 제공되는 애플리케이션의 디바이스 혹은 인터페이스가 추가/수정되었을 때

### 문제를 명확하게 파악하기

```text
// 디자인 원칙 (I)
애플리케이션에서 달라지는 부분을 찾아내고, 달라지지 않는 부분과 분리한다.

"바뀌는 부분은 따로 뽑아서 캡슐화한다. 그러면 나중에 바뀌지 않는 부분에는 영향을 미치지 않고 그 부분만 고치거나 확장할 수 있다."
```

### 바뀌는 부분과 그렇지 않은 부분 분리하기

1. Duck 클래스는 여전히 모든 오리의 슈퍼클래스지만 나는 행동과 꽥꽥거리는 행동을 끄집어내서 다른 클래스 구조에 집어넣습니다.
2. 나는 행동과 꽥꽥거리는 행동 각각 별도의 클래스 집합으로 분리되었습니다.

### 오리의 행동을 디자인하는 방법

```text
// 디자인 원칙 (II)
구현보다는 인터페이스에 맞춰서 프로그래밍한다.

"'인터페이스에 맞춰서 프로그래밍한다'라는 말은 사실 '상위 형식에 맞춰서 프로그래밍한다'라는 말입니다."
```

### 오리의 행동을 구현하는 방법

다른 형식의 객체에서도 나는 행동과 꽥꽥거리는 행동을 재사용할 수 있습니다. 더 이상 Duck 클래스 안에 숨겨져 있지 않으니까요.

- 날 수 있는 클래스는 무조건 FlyBehavior 인터페이스를 구현합니다. 날 수 있는 클래스를 만들 때는 무조건 fly 메소드를 구현해야 하죠.
  - 인터페이스 FlyBehavior : fly()
  - 클래스 FlyWithWings: fly() { // 나는 방법을 구현 }
  - 클래스 FlyNoWay: fly() { // 아무것도 하지 않음 }
- 꽥꽥거리는 클래스 역시 무조건 QuackBehavior 인터페이스를 구현합니다. 그리고 무조건 quack 메소드를 구현해야 하죠.
  - 인터페이스 QuackBehavior : quack()
  - 클래스 Quack: quack() { // 꽥꽥 소리를 냄 }
  - 클래스 Squeak: quack() { // 삑삑 소리를 냄 }
  - 클래스 MuteQuack: quack() { // 아무것도 하지 않음 }

#### 쓰면서 제대로 공부하기(3)

1. 앞쪽에 나온 디자인을 활용해서 SimUDuck에 로켓의 추진력으로 날아가는 행동을 추가해야 한다면 어떻게 해야 할까요?\
A. FlyBehavior 인터페이스를 구현하는 FlyWithRocket 클래스를 추가
2. 오리 클래스가 아닌 다른 클래스에서 Quack을 활용할 방법이 있는지 한번 생각해 봅시다.\
A. 다른 새나 오리 모형 슈퍼 클래스에서 Quack 인터페이스를 활용할 수 있지 않을까?

### 오리 코드 테스트

[codes](./codes/) 폴더 안의 코드 참고

### 두 클래스를 합치는 방법

"A에는 B가 있다." 관계를 생각해 봅시다. 각 오리에는 FlyBehavior와 QuackBehavior가 있으며, 각각 나는 행동과 꽥꽥거리는 행동을 위임 받습니다.\
이런 식으로 두 클래스를 합치는 것을 "**구성(Composition)** 을 이용한다."라고 합니다.

```text
// 디자인 원칙 (III)
상속보다는 구성을 활용한다.

"'인터페이스에 맞춰서 프로그래밍한다'라는 말은 사실 '상위 형식에 맞춰서 프로그래밍한다'라는 말입니다."
```

### 첫 번째 디자인 패턴: 전략 패턴

```text
// 전략 패턴 (Strategy Pattern)
알고리즘군을 정의하고 캡슐화해서 각각의 알고리즘군을 수정해서 쓸 수 있게 해 줍니다. 전략 패턴을 사용하면 클라이언트로부터 알고리즘을 분리해서 독립적으로 변경할 수 있습니다.
```

### 디자인 패턴 만나기

디자인 패턴은 개발자 사이에서 서로 모두 이해할 수 있는 용어를 제공합니다. 일단 용어를 이해하고 나면 다른 개발자와 더 쉽게 대화할 수 있고, 패턴을 아직 모르는 사람들에게는 패턴을 배우고 싶은 생각이 들도록 자극을 줄 수 있죠. 또한 자질구레한 객체 수준에서의 생각이 아닌, 패턴 수준에서 생각할 수 있기에 아키텍처를 생각하는 수준도 끌어올려 줍니다.

- 서로 알고 있는 패턴은 정말 막강합니다.
- 패턴을 사용하면 간단한 단어로 많은 얘기를 할 수 있습니다.
- 패턴 수준에서 이야기하면 '디자인'에 더 오랫동안 집중할 수 있습니다.
- 전문 용어를 사용하면 개발팀의 능력을 극대화할 수 있습니다.
- 전문 용어를 신입 개발자에게 훌륭한 자극제가 됩니다.

## 핵심 정리

- 객체지향 기초 지식만 가지고는 훌륭한 객체지향 디자이너가 될 수 없습니다.
- 훌륭한 객체지향 디자인이라면 재사용성, 확장성, 관리의 용이성을 갖출 줄 알아야 합니다.
- 패턴은 훌륭한 객체지향 디자인 품질을 갖추고 있는 시스템을 만드는 방법을 제공합니다.
- 패턴은 검증받은 객체지향 경험의 산물입니다.
- 패턴이 코드를 바로 제공하는 것은 아닙니다. 디자인 문제의 보편적인 해법을 제공하죠. 특정 애플리케이션에 패턴을 적용하는 일은 여러분이 해야 합니다.
- 패턴은 발명되는 것이 아니라 발견되는 것입니다.
- 대부분의 패턴과 원칙은 소프트웨어이 변경 문제와 연관되어 있습니다.
- 대부분의 패턴은 시스템의 일부분을 나머지 부분과 무관하게 변경하는 방법을 제공합니다.
- 많은 경우에 시스템에서 바뀌는 부분을 골라내서 캡슐화해야 합니다.
- 패턴은 다른 개발자와의 의사소통을 극대화하는 전문 용어 역할을 합니다.
