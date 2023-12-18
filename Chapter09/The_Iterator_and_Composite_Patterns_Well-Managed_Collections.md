# Chapter 09

## 컬렉션 잘 관리하기: 반복자 패턴과 컴포지트 패턴

### 속보! 객체마을 식당과 팬케이크 하우스 합병

<!-- 
9. The Iterator and Composite Patterns: Well-Managed Collections
* 		Breaking News: Objectville Diner and Objectville Pancake House Merge
* 		Check out the Menu Items
* 		Lou and Mel’s Menu implementations
* 		What’s the problem with having two different menu representations?
    * 		The Java-Enabled Waitress Specification
* 		What now?
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