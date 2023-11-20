# Chapter 6

## 호출 캡슐화하기: 커맨트 패텬

### 만능 IOT 리모컨

프로그래밍이 가능한 7개의 슬롯이 있는 리모콘이 있습니다. 각 슬롯에는 ON, OFF 버튼이 있어서 연결된 가전제품을 제어할 수 있죠. 마지막으로 누른 버튼의 명령을 취소하는 undo 버튼도 있습니다.\
다만, 각 슬롯에 들어가는 가전제품들의 클래스는 제각각의 인터페이스들을 갖고 있네요. 추가될 가전제품들도 믿을 수 없습니다.

### 커맨드 패턴 소개

#### 객체마을 식당

음식을 주문한다고 가정해보죠.

고객이 원하는 것을 주문합니다 (createOrder) &rarr; 주문(Order)은 주문서와 주문 내용으로 구성됩니다 &rarr; 종업원이 주문서를 가져옵니다 (takeOrder) 그리고 주문 처리를 준비하죠 (orderUp) &rarr; 주문 객체(Order)에는 음식 준비에 필요한 모든 지시사항이 적혀 있어 주방장에게 지시할 수 있습니다 &rarr; 주방장이 음식을 준비합니다.

#### 커맨드 패턴

위 음식 주문을 커맨드 패턴에 적용할 수 있습니다.

클라이언트가 커맨드 객체를 생성합니다 (createCommandObject) &rarr; 커맨드 객체에는 행동과 리시버의 정보가 함께 들어있습니다 &rarr; 클라이언트가 인보커 객체를 호출하고요 (Invoker.setCommand) 그리고 인보커는 전달받은 커맨드 객체의 메소드를 실행합니다 (Command.execute) &rarr; 커맨드 객체에는 리시버의 정보가 있어 리시버에게 어떤 행동을 할지 호출할 수 있습니다 &rarr; 리시버의 메소드가 호출되어 행동을 실행합니다.

### 일단 만들어봅시다

[codes/RemoteControlTest.ts](./codes/RemoteControlTest.ts) 코드 참고

### 커맨드 패턴의 정의

```text
// 커맨드 패턴 (Command Pattern)
요청 내역을 객체로 캡슐화해서 객체를 서로 다른 요청 내역에 따라 매개변수화할 수 있습니다. 이러면 요청을 큐에 저장하거나 로그로 기록하거나 작업 취소 기능을 사용할 수 있습니다.
```

<!-- 6. The Command Pattern: Encapsulating Invocation

* 		The Command Pattern defined
* 		The Command Pattern defined: the class diagram
* 		Assigning Commands to slots
* 		Implementing the Remote Control
* 		Implementing the Commands
* 		Putting the Remote Control through its paces
    * 		Now, let’s check out the execution of our remote control test...
* 		Time to write that documentation...
* 		What are we doing?
* 		Time to QA that Undo button!
* 		Using state to implement Undo
* 		Adding Undo to the CeilingFan commands
* 		Get ready to test the ceiling fan
* 		Testing the ceiling fan...
* 		Every remote needs a Party Mode!
* 		Using a macro command
* 		The Command Pattern means lots of command classes
    * 		Do we really need all these command classes?
* 		Simplifying the Remote Control with lambda expressions
* 		Simplifying even more with method references
    * 		What if we need to do more than one thing in our lambda expression?
* 		Test the remote control with lambda expressions
    * 		Check out the results of all those lambda expression commands...
* 		More uses of the Command Pattern: queuing requests
* 		More uses of the Command Pattern: logging requests
* 		Tools for your Design Toolbox -->