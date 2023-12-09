# Chapter 04

## 객체지향 빵 굽기: 팩토리 패턴

### 피자 가게를 운영해봅시다

객체마을의 최첨단 피자 가게인 만큼 Pizza 인터페이스를 이용해서 코드를 짰습니다.

```java
Pizza orderPizza(String type) {
    Pizza pizza;

    if (type.equals("cheese")) {
        pizza = new CheesePizza();
    } else if (type.equals("greek")) {
        pizza = new GreekPizza();
    } else if (type.equals("pepperoni")) {
        pizza = new PepperoniPizza();
    }

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
}
```

### 신메뉴를 추가해야 합니다

위 코드는 피자 메뉴가 사라지거나 추가되면 고쳐야하기 때문에 변경에 닫혀 있지 않습니다. 즉, OCP에 위배되죠.\
주로 바뀌는 부분은 피자 객체를 생성하는 부분이므로 해당 부분을 따로 빼서 캡슐화하고 처리하는 클래스를 만들어보죠.\
이 클래스가 바로 `팩토리(Factory)` 입니다.

```java
public class PizzaStore {
    SimplePizzaFactory factory;

    public PizzaStore(SimplePizzaFactory factory) {
        this.factory = factory;
    }

    public Pizza orderPizza(String type) {
        Pizza pizza = factory.createPizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
}
```

### `간단한 팩토리`의 정의

`간단한 팩토리(Simple Factory)`는 디자인 패턴이라기 보다는 프로그래밍에서 자주 쓰이는 관용구에 가깝습니다.

1. 객체를 생성하는 팩토리가 있어, 유일하게 구상 객체 클래스를 직접 참조합니다.
    - i.e. SimplePizzaFactory
2. 팩토리를 사용하는 클라이언트 클래스에서는 구상 클래스의 인스턴스를 만들 필요도 없고 어떤 객체가 만들어지는 지 신경쓸 필요도 없습니다.
    - i.e. PizzaStore

### 다양한 팩토리 만들기

최첨단 피자 가게의 프랜차이즈 사업을 위해 각 지점별 팩토리를 써서 피자를 만들었습니다.\
그런데 왠걸? 지점마다 굽는 방식이 달라지거나 피자 상자를 이상한 것을 쓰는 일이 발생했습니다.\
그렇다면, PizzaStore와 피자 제작 코드 전체를 하나로 묶어주는 프레임워크가 필요합니다.

### 피자 가게 프레임워크 만들기

createPizza() 메소드를 PizzaStore에 넣고 추상 메소드로 선언해보겠습니다. 그리고 지역별 스타일에 맞게 PizzaStore의 서브클래스가 만들어지는 것이죠.

[codes/factory-method](./codes/factory-method) 폴더 안의 코드 참고

### 팩토리 메소드 패턴 살펴보기

! 모든 팩토리 패턴은 객체 생성을 캡슐화합니다.

- 팩토리 메소드 패턴을 서브클래스에서 어떤 클래스를 만들지 결정함으로써 객체 생성을 캡슐화합니다.

#### 생산자(Creator) 클래스

1. 제품(Product)를 생산하려고 구현하는 팩토리 메소드를 가지고 있는 클래스
2. 추상 생산자 클래스로 구현되어 팩토리 메소드(추상 메소드)를 가지며 각각의 구상 생산자 클래스에서 구상 팩토리 메소드를 구현

#### 제품(Product) 클래스

1. 팩토리 메소드를 통해 생산되는 객체 클래스
2. 추상 제품 클래스로 구현되어 각각의 구상 제품 클래스는 구상 생산자 클래스에서 호출됨

### 팩토리 메소드 패턴의 정의

```text
// 팩토리 메소드 패턴 (Factory Method Pattern)
객체를 생성할 때 필요한 인터페이스를 만듭니다. 어떤 클래스의 인스턴스를 만들지는 서브클래스에서 결정합니다. 팩토리 메소드 패턴을 사용하면 클래스 인스턴스 만드는 일으 서브클래스에게 맡기게 됩니다.
```

#### !! "결정한다"라는 표현을 쓰는 이유

실행 중에 서브클래스에서 어떤 클래스의 인스턴스를 만들지를 결정해서가 아니라, 생산자 클래스가 실제 생산될 제품을 전혀 모르는 상태로 만들어지기 때문\
&rarr; 사용하는 서브클래스에 따라 생산되는 객체 인스턴스가 결정되기 때문

### 의존성 뒤집기 원칙 (Dependency Inversion Principle)

```text
// 디자인 원칙 (VI)
추상화된 것에 의존하게 만들고 구상 클래스에 의존하지 않게 만든다.

고수준 구성 요소가 저수준 요소에 의존하면 안 되며, 항상 추상화에 의존하게 만들어야한다는 의미
```

#### `뒤집기(inversion)`라는 말이 들어있는 이유

객체지향 디자인을 할 때 일반적으로 생각하는 방법과는 반대로 뒤집어서 생각해야 하기 때문.

### 의존성 뒤집기 원칙을 지키는 방법

1. 변수에 구상 클래스의 레퍼런스를 저장하지 맙시다.
    - 팩토리를 써서 구상 클래스의 레퍼런스를 변수에 저장하는 일을 미리 방지합시다.
2. 구상 클래스에서 유도된 클래스를 만들지 맙시다.
    - 인터페이스나 추상 클래스처럼 추상화된 것으로부터 클래스를 만들어야 합니다.
3. 베이스 클래스에 이미 구현되어 있는 메소드를 오버라이드하지 맙시다.
    - 베이스 클래스에서 메소드를 정의할 때는 모든 서브클래스에서 공유할 수 있는 것만 정의해야 합니다.


<!-- 
    •            Meanwhile, back at the PizzaStore...
    •            Ensuring consistency in your ingredients
    •            Families of ingredients...
    •            Building the ingredient factories
    •            Building the New York ingredient factory
    •            Reworking the pizzas...
    •            Reworking the pizzas, continued...
    •            Revisiting our pizza stores
    •            What have we done?
    •            More pizza for Ethan and Joel...
    •            From here things change, because we are using an ingredient factory
    •            Abstract Factory Pattern defined
    •            Factory Method and Abstract Factory compared
    •            Tools for your Design Toolbox
    •            A very dependent PizzaStore
-->