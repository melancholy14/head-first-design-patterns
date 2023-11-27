# Chapter 03

## 객체 꾸미기: 데코레이터 패턴

### 초대형 커피 전문점, 스타버즈

폭발적으로 성장했지만 다양한 음료를 모두 포괄하는 주문 시스템을 미쳐 갖추지 못한 커피 전문점, 스타버즈.

현재: Beverage라는 추상 클래스를 만들고 모든 음료는 이 클래스의 서브클래스가 됩니다. 하지만 고객은 커피를 주문할 때 우유나 두유 등 옵션을 추가하죠. 결국, 클래스가 말 그대로 "폭발"...

- 추상 클래스: Beverage
  - 추상메소드: cost() &rarr; 각 서브클래스에서 cost()를 재정의
- 서브 클래스: HouseBlend, HouseBlendWithSteamedMilk, HouseBlendWithSteamedMilkAndMocha, HouseBlendWithSteamedMilkAndWhip, HouseBlendWithSoy, HouseBlendWithSoyAndMocha, etc ...

#### 뇌 단련

위 클래스들을 보면 스타버즈 커피가 클래스 관리에 어려움을 겪고 있다는 사실을 쉽게 알 수 있습니다. 만약 우유 가격이 인상되면 어떻게 해야할까요? 캐러멜을 새로 추가하면 어떻게 해야 할까요?\
클래스 관리 문제를 생각해 볼 때, 지금까지 우리가 배웠던 디자인 원칙 가운데 무엇을 제대로 지키지 않고 있는 걸까요?

#### 정답과 나의 의견

1. 구현보다는 인터페이스에 맞춰서 프로그래밍한다.
2. 상속보다는 구성을 활용한다.

그렇다면, Beverage 클래스에 우유, 두유, 모카, 휘핑크림 첨가 여부를 인스턴스 변수로 넣으면 어떨까요?

- Beverage에 milk, soy, mocha, whip 등 boolean 변수로 관리
- 서브클래스에서 cost()를 호출할 때 super.cost()를 함께 호출
  - super.cost(): 옵션 유무를 계산하여 각 옵션별 가격을 리턴

#### 쓰면서 제대로 공부하기 (1)

각 클래스에 들어갈 cost() 메소드 코드를 작성해보세요. 수도코드(pseudo code) 형태로 써도 됩니다.

#### 나의 의견 (1)

```java
public class Beverage {
    public double cost() {
        return (hasMilk()? milkCost : 0) +  (hasSoy()? soyCost : 0) + (hasMocha()? mochaCost : 0) +  (hasWhip()? whipCost : 0);
    }
}

public class DarkRoast extends Beverage {
    price = 1.99;

    public DarkRoast() {
        description = "최고의 다크 로스트 커피";
    }
    public double cost() {
        return price + super.cost();
    }
}
```

#### 쓰면서 제대로 공부하기 (2)

이 프로젝트에서 변경되었을 때 디자인에 영향을 미칠 만한 요소를 적어 봅시다(정답은 없습니다. 자유롭게 적어 보세요).

- 첨가물 가격이 바뀔 때마다 기존 코드를 수정해야 합니다.
- 첨가물의 종류가 많아지면 새로운 메소드를 추가해야 하고, 슈퍼클래스의 cost() 메소드로 고쳐야 합니다.
- 새로운 음료가 출시될 수도 있습니다. 그중에는 특정 첨가물이 들어가면 안 되는 음료도 있을 것입니다. 예를 들어 아이스 티를 생각해 보면, Tea 서브클래스에서도 hasWhip() 같은 메소드가 여전히 상속받게 될 것입니다.
- 고객이 더블 모카를 주문하면 어떻게 해야 할까요?

#### 나의 의견 (2)

- 다양한 사이즈가 나오면 코드가 달라집니다. 더불어 사이즈마다 들어가는 옵션 가격이 달라지면요?
- 이벤트성 가격이 발생할 수 있습니다. 특정 음료만 특정 기간동안 특정 가격/할인이 적용되어야 할수도 있습니다.

### OCP(Open-Closed Principle) 살펴보기

```text
// 디자인 원칙 (V)
클래스는 확장에는 열려 있어야 하지만 변경에는 닫혀 있어야 한다

"우리의 목표는 기존 코드를 건드리지 않고 확장으로 새로운 행동을 추가하는 것입니다."
```

### 데코레이터 패턴 살펴보기

특정 음료에서 시작해서 첨가물로 그 음료를 "장식(decorate)"해 볼까요? (Hint: 데코레이터 객체를 '래퍼' 객체라고 생각해 보세요).

### 주문 시스템에 데코레이터 패턴 적용하기

01. DarkRoast 객체에서 시작해볼까요.
02. 고객이 모카를 주문했으니까 Mocha 객체를 만들고 그 객체로 DarkRoast를 감쌉니다.
03. 고객이 휘핑크림도 추가했으니까 Whip 데코레이터를 만들어 Mocha를 감쌉니다.
04. 가격을 계산할 때는 가장 바깥쪽에 있는 Whip의 cost()를 호출하면 됩니다. 그러면 Whip은 Mocha의 cost()에게 가격 계산을 위임하고 리턴되면 휘핑크림의 가격을 더해서 그 결과값을 리턴합니다.

#### 지금까지 배운 내용

- 데코레이터의 슈퍼클래스는 자신이 장식하고 있는 객체의 슈퍼클래스와 같습니다.
- 한 객체를 여러 개의 데코레이터로 감쌀 수 있습니다.
- 데코레이터는 자신이 감싸고 있는 개체와 같은 슈퍼클래스를 가지고 있기에 원래 객체가 들어갈 자리에 데코레이터 객체를 넣어도 상관없습니다.
- 데코레이터는 자신이 장식하고 있는 객체에게 어떤 행동을 위임하는 일 말고도 추가 작업을 수행할 수 있습니다.
- 객체는 언제든지 감쌀 수 있으므로 실행 중에 필요한 데코레이터를 마음대로 적용할 수 있습니다.

### 데코레이터 패턴의 정의

```text
// 데코레이터 패턴 (Decorator Pattern)
객체에 추가 요소를 동적으로 더할 수 있습니다. 데코레이터를 사용하면 서브클래스를 만들 때보다 훨씬 유연하게 기능을 확장할 수 있습니다.
```

1. Component: 추상 슈퍼 클래스
    - methodA(), methodB()와 같이 추상 메소드 가집니다.
2. ConcreteComponent: Component 구현 클래스
    - 새로운 행동을 동적으로 추가할 수 있어요.
3. Decorator: Component 구현 클래스 이자 Component 객체를 가지고 있습니다.
    - 자신이 장식할 구성 요소와 같은 인터페이스 또는 추상 클래스를 구현합니다.
    - Component wrappedObj: 구성 요소의 레퍼런스를 포함한 인스턴스 변수가 있어요.
4. ConcreteDecorator: Decorator 구현 클래스
    - 데코레이터가 감싸고 있는 Component 객체용 인스턴스 변수가 있습니다.
    - Decorator는 Component의 상태를 확장할 수 있습니다.

### Beverage 클래스 장식하기

1. Beverage: 추상 슈퍼 클래스
    - description 변수와 getDescription(), cost()와 같이 추상 메소드 가집니다.
2. HouseBlend, DarkRoast, Espresso, Decaf: Beverage 구현 클래스
    - 커피 종류마다 구성 요소를 나타내는 구상 클래스를 하나씩 만들었습니다.
3. CondimentDecorator: Beverage 구현 클래스 이자 Beverage 객체를 가지고 있습니다.
4. Milk, Mocha, Soy, Whip: CondimentDecorator 구현 클래스
    - 각각의 첨가물을 나타내는 데코레이터.
    - cost(), getDescription()도 구현해야 합니다.

### 커피 주문 시스템 만들기

[codes](./codes/) 폴더 안의 코드 참고

#### 쓰면서 제대로 공부하기 (3)

스타버즈 커피는 톨(소), 그란데(중), 벤티(대) 사이즈 개념을 도입하기로 했습니다. 스타버즈 커피는 이런 변화가 커피 클래스 전체에 영향을 미친다고 간주하고 Beverage 클래스에 setSize()와 getSize()라는 2개의 메소드를 추가했습니다. 그리고 사이즈에 따라 첨가물 가격도 다르게 받을 계획입니다.

이런 변경 사항을 처리하려면 데코레이터 클래스를 어떻게 고쳐야 할까요?

```java
public abstract class Beverage {
  public enum Size { TALL, GRANDE, VENTI };
  Size size = Size.TALL;

  ...

  public void setSize(Size size) {
    this.size = size;
  }

  public size getSize() {
    return this.size;
  }
  ...
}
```

#### 나의 의견 (3)

각 beverage, condiment의 cost 계산 시, getSize()를 이용하여 가격 분기처리 계산

### 데코레이터가 적용된 예: 자바 I/O

[java.io](https://docs.oracle.com/javase/8/docs/api/java/io/package-summary.html)는 데코레이터 패턴을 바탕으로 만들어졌습니다. 자세한 내용은 [여기](https://codingnotes.tistory.com/238?category=968843#%EB%-D%B-%EC%BD%--%EB%A-%--%EC%-D%B-%ED%--%B-%EC%-D%--%--%EC%A-%--%EC%-A%A-%EB%--%-C%--%EC%--%--%--%-A%--%EC%-E%--%EB%B-%--%--I%-FO)를 참고해주세요.

## 핵심 정리

- 디자인의 유연성 면에서 보면 상속으로 확장하는 일은 별로 좋은 선택이 아닙니다.
- 기존 코드 수정 없이 행동을 확장해야 하는 상황도 있습니다.
- 구성과 위임으로 실행 중에 새로운 행동을 추가할 수 있습니다.
- 상속 대신 데코레이터 패턴으로 행동을 확장할 수 있습니다.
- 데코레이터 패턴은 구상 구성 요소를 감싸 주는 데코레이터를 사용합니다.
- 데코레이터 클래스의 형식은 그 클래스가 감싸는 클래스 형식을 반영합니다. (상속이나 인터페이스 구현으로 자신이 감쌀 클래스와 같은 형식을 가집니다)
- 데코레이터는 자기가 감싸고 있는 구성 요소의 메소드를 호출한 결과에 새로운 기능을 더함으로써 행동을 확장합니다.
- 구성 요소를 감싸는 데코레이터의 개수에는 제한이 없습니다.
- 구성 요소의 클라이언트는 데코레이터의 존재를 알 수 없습니다. 클라이언트가 구성 요소의 구체적인 형식에 의존하는 경우는 예외입니다.
- 데코레이터 패턴을 사용하면 자잘한 객체가 매우 많이 추가될 수 있고, 데코레이터를 너무 많이 사용하면 코드가 필요 이상으로 복잡해집니다.
