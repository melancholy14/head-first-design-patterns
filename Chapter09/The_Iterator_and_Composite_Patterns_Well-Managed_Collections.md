# Chapter 09

## 컬렉션 잘 관리하기: 반복자 패턴과 컴포지트 패턴

### 속보! 객체마을 식당과 팬케이크 하우스 합병

아침에는 팬케이크 하우스 메뉴를 쓰고 점심에는 객체마을 식당 메뉴를 쓴답니다.\
두 식당이 메뉴 항목을 구현하는 방법은 이미 합의가 됐는데요, 아직 메뉴를 어떤 식으로 구현할지는 얘기가 안 끝났다네요.

- 합의한 메뉴 항목를 나타내는 [MenuItem 클래스](/codes/MenuItem.ts)

- 아직 합의하지 못한 메뉴 구현법

1. 팬케이크 하우스: 새로운 항목을 추가하기 쉽게 `ArrayList`를 썼습니다.

```java
public class PancakeHouseMenu {
    List<MenuItem> menuItems;

    public PancakeHouseMenu() {
        menuItems = new ArrayList<MenuItem>();

        addItem('K&B 팬케이크 세트', '스크램블 에그와 토스트가 곁들여진 팬케이크', true, 2.99);

        addItem('레귤러 팬케이크 세트', '달걀 프라이와 소시지가 곁들여진 팬케이크', false, 2.99);

        addItem('블루베리 팬케이크', '신선한 블루베리와 블루베리 시럽으로 만든 팬케이크', true, 3.49);

        addItem('와플', '취향에 따라 블루베리나 딸기를 얹을 수 있는 와플', true, 3.59);
    }

    public void addItem(String name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        menuItems.add(menuItem);
    }

    public ArrayList<MenuItem> getMenuItems() {
        return menuItems;
    }
}
```

2. 객체마을 식당: 메뉴에 들어가는 항목의 최대 개수를 정해놓고 배열을 쓰네요. 바로 MenuItem을 쓰기 위함 이랍니다.

```java
public class DinerMenu {
    static final int MAX_ITEMS = 6;
    int numberOfItems = 0;
    MenuItem[] menuItems;

    public DinerMenu() {
        menuItems = new MenuItem[MAX_ITEMS];

        addItem('채식주의자용 BLT', '통밀 위에 콩고기 베이컨, 상추, 토마토를 얹은 메뉴', true, 2.99);

        addItem('BLT', '통밀 위에 베이컨, 상추, 토마토를 얹은 메뉴', false, 2.99);

        addItem('오늘의 스프', '감자 샐러드를 곁들인 오늘의 스프', false, 3.29);

        addItem('핫도그', '사워크라우트, 갖은 양념, 양파, 치즈가 곁들여진 핫도그', false, 3.05);
    }

    public void addItem(String name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        if (numberOfItems >= MAX_ITEMS) {
            System.err.println('죄송합니다, 메뉴가 꽉 찼습니다. 더 이상 추가할 수 없습니다.');
        } else {
            menuItems[numberOfItems] = menuItem;
            numberOfItems = numberOfItems + 1;
        }
    }

    public MenuItem[] getMenuItems() {
        return menuItems;
    }
}
```

#### 메뉴 구현 방식이 다르다면 어떤 문제가 생길까요?

메뉴에 있는 모든 항목을 출력한다고 해봅시다. PancakeHouseMenu와 DinerMenu에서 리턴한 메뉴 항목이 다르기 떄문에 반복하는 순환문도 다를 겁니다.

```java
for (int i = 0; i < pancakeHouseMenu.menuItems.size(); i++) {
    MenuItem menuItem = pancakeHouseMenu.menuItems.get(i);

    menuItem.print();   // 메뉴 아이템 내용 출력 메소드
}

for (int i = 0; i < dinerMenu.menuItems.length; i++) {
    MenuItem menuItem = dinerMenu.menuItems[i];

    menuItem.print();   // 메뉴 아이템 내용 출력 메소드
}
```

항상 두 메뉴를 사용하고, 각 항목에서 반복 작업을 수행하려면 2개의 순환문을 써야하죠. 만일 다른 가게가 또 합병한다면 순환문이 늘어날 지도 모릅니다.

<!-- 
9. The Iterator and Composite Patterns: Well-Managed Collections


* 		Can we encapsulate the iteration?
* 		Meet the Iterator Pattern
* 		Adding an Iterator to DinerMenu
* 		Reworking the Diner Menu with Iterator
* 		Fixing up the Waitress code
* 		Testing our code
    * 		Here’s the test run...
* 		What have we done so far?
* 		What we have so far...
* 		Making some improvements...
* 		Cleaning things up with java.util.Iterator
* 		We are almost there...
* 		What does this get us?
* 		Iterator Pattern defined
* 		Single Responsibility
* 		Taking a look at the Café Menu
* 		Reworking the Café Menu code
* 		Adding the Café Menu to the Waitress
* 		Breakfast, lunch AND dinner
    * 		Here’s the test run; check out the new dinner menu from the Café!
* 		What did we do?
* 		We decoupled the Waitress....
* 		... and we made the Waitress more extensible
* 		But there’s more!
* 		Iterators and Collections
* 		Is the Waitress ready for prime time?
* 		Just when we thought it was safe...
* 		What do we need?
* 		The Composite Pattern defined
* 		Designing Menus with Composite
* 		Implementing the Menu Component
* 		Implementing the Menu Item
* 		Implementing the Composite Menu
    * 		Fixing the print() method
* 		Getting ready for a test drive...
* 		Now for the test drive...
* 		Getting ready for a test drive...
* 		Flashback to Iterator
* 		The Composite Iterator
* 		The Null Iterator
* 		Give me the vegetarian menu
* 		The magic of Iterator & Composite together...
* 		Tools for your Design Toolbox -->