# Chapter 05

## 하나뿐인 특별한 객체 만들기: 싱글턴 패턴

### 고전적인 싱글턴 패턴 구현법

**싱글턴 패턴**이란? 특정 클래스에 객체 인스턴스가 하나만 만들어지도록 해 주는 패턴입니다.\
레지스트리 설정 혹은 연결 풀이나 스레드 풀과 같은 자원 풀을 관리할 때도 사용되죠.

```java
public class Singleton {
    // Singleton 클래스의 하나 뿐인 인스턴스를 저장하는 정적 변수
    private static Singleton uniqueInstance;

    // 기타 인스턴스 변수

    // 생성자를 private으로 선언했으므로 Singleton에서만 클래스의 인스턴스를 만들 수 있습니다.
    private Singleton() {}

    // getInstance() 메소드는 클래스의 인스턴스를 만들어서 리턴합니다.
    public static Singleton getInstance() {
        // uniqueInstance는 하나뿐인 정적 변수입니다.
        if (uniqueInstance == null) {
            /** 인스턴스가 필요한 상황이 닥치기 전까지 아예 인스턴스를 생성하지 않는 방법을 '게으른 인스턴스 생성(lazy instantiation)'이라고 부릅니다. */
            uniqueInstance = new Singleton();
        }
        
        // 이미 객체가 생성되었다면 바로 return해줍니다.
        return uniqueInstance;
    }

    // 기타 메소드
}
```

### 초콜릿 보일러 코드 살펴보기

초콜릿 공장에서 초콜릿을 끓이는 장치를 '초콜릿 보일러'라고 부릅니다. 주식회사 초코홀릭에도 초콜릿 보일러가 있는데요.\
아직 끓지 않은 재료 500 갤런을 그냥 흘려보낸다거나, 보일러가 가득 차 있는 상태에서 새로운 재료를 붓는 식의 실수가 일어나지 않도록 주의를 기울인 가운데,\
위의 고전적인 싱글턴 패턴을 적용하여 인스턴스가 따로 돌아가는 불상사를 막았습니다.

- [codes/ChocolateBoiler.ts](./codes/ChocolateBoiler.ts) 코드 참고

### 싱글턴 패턴의 정의

```text
// 싱글턴 패턴 (Singleton Pattern)
클래스 인스턴스를 하나만 만들고, 그 인스턴스로의 전역 접근을 제공합니다.
```

### 멀티스레딩 문제 살펴보기

*!! 싱글턴으로 업그레이드한 초콜릿 보일러에 멀티스레드를 사용하도록 최적화했더니 문제가 발생했습니다.*\
&rarr; 멀티스레딩을 하게 되면 uniqueInstance의 존재 유무를 체크할 때 동기화 이슈가 발생하여 여러 개의 객체가 발생할 수도 있어요!

#### 멀티스레딩 문제 해결하기

위의 멀티스레딩 문제를 해결하기 위한 방법들은 여러가지가 있을 수 있는데요. 대표적인 3가지 방법을 아래 소개합니다.\
*(P.S. Java 등 특정 언어에서만 지원가능한 방법도 있습니다.)*

1. `getInstance()` 메소드에 [`synchronized`](https://velog.io/@backtony/Java-synchronized-%EB%8F%99%EA%B8%B0%ED%99%94) 키워드를 추가합니다.

    ```java
    public class Singleton {
        private static Singleton uniqueInstance;

        // 기타 인스턴스 변수

        private Singleton() {}

        // synchronized 키워드를 추가하면 한 스레드가 메소드 사용을 끝내기 전까지 다른 스레드는 기다려야 합니다.
        public static synchronized Singleton getInstance() {
            if (uniqueInstance == null) {
                uniqueInstance = new Singleton();
            }
            
            return uniqueInstance;
        }

        // 기타 메소드
    }
    ```

    - 여러 스레드가 해당 메소드를 동시에 실행하는 일은 일어나지 않습니다.
    - 단, 메소드를 동기화하게 되면 성능이 100배 정도 저하된다는 사실만은 기억해주세요!

2. 인스턴스가 필요할 때 생성하지 말고 처음부터 만듭니다.

    ```java
    public class Singleton {
        // 정적 초기화 부분에서 Singleton 객체를 생성합니다.
        private static Singleton uniqueInstance = new Singleton();

        // 기타 인스턴스 변수

        private Singleton() {}

        // 
        public static Singleton getInstance() {
            // 이미 객체가 생성되어 있으니, 바로 return만 해주면 됩니다.
            return uniqueInstance;
        }

        // 기타 메소드
    }
    ```

    - 객체를 생성하고 나서 계속 사용하거나 수시로 만들고 관리하기 성가시다면 처음부터 만들어도 좋습니다.
    - 단, 처음부터 객체를 생성하기 때문에 불필요한 메모리 사용이 발생할 수 있다는 점은 기억해주세요!

3. **DCL(Double-Checked Locking)**을 써서 `getInstance()` 메소드에서 동기화되는 부분을 줄입니다.

    ```java
    public class Singleton {
        // volatile 키워드를 사용하면 멀티스레딩을 쓰더라도 uniqueInstance 변수가 Singleton 인스턴스로 초기화되는 과정이 올바르게 진행됩니다.
        private volatile static Singleton uniqueInstance;

        // 기타 인스턴스 변수

        private Singleton() {}

        public static Singleton getInstance() {
            if (uniqueInstance == null) {
                // 인스턴스 유무를 확인한 뒤, 없으면 동기화된 블록으로 들어갑니다. 처음에만 동기화를 동작하는 것이죠.
                synchronized (Singleton.class) {
                    // 동기화 블록에서도 다시 한 번 null인지 확인합니다.
                    if (uniqueInstance == null) {
                        uniqueInstance = new Singleton();
                    }
                }
            }
            
            return uniqueInstance;
        }

        // 기타 메소드
    }
    ```

    - 처음에만 동기화하고 나중에는 동기화하지 않아도 되기 때문에 속도 이슈가 해결됩니다.
    - 단, Java 버전 1.4 이하라면 [`volatile`](https://nesoy.github.io/articles/2018-06/Java-volatile) 키워드를 써도 동기화가 제대로 동작되지 않을 수 있으니 버전 체크가 반드시 이루어져야 한다는 걸 기억해주세요!

&rarr; 자아, 이제 초콜릿 보일러의 문제를 해결하기 위해서 어떤 방법을 사용하면 좋을까요?

#### ENUM으로도 해결할 수 있습니다

```java
public enum Singleton {
    UNIQUE_INSTANCE;
    // 기타 필요한 필드
}
public class SingletonClient {
    public static void main(String[] args) {
        Singleton singleton = Singleton.UNIQUE_INSTANCE;
        // 여기서 싱글턴 사용
    }
}
```

동기화 문제, 클래스 로딩 문제, 리플렉션, 직렬화와 역직렬화 문제 등은 enum으로 싱글턴을 생성해서 해결할 수 있습니다!

- [Enums in Java (and Javascript)](https://medium.com/@jleveewhite/enums-in-java-and-javascript-771b5635e48b)
- [TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking)

## 핵심 정리

- 어떤 클래스에 싱글턴 패턴을 적용하면 그 클래스의 인스턴스가 1개만 있도록 할 수 있습니다.
- 싱글턴 패턴을 사용하면 하나뿐인 인스턴스를 어디서든지 접근할 수 있도록 할 수 있습니다.
- 자바에서 싱글턴 패턴을 구현할 때는 private 생성자와 정적 메소드, 정적 변수를 사용합니다.
- 멀티 스레드를 사용하는 애플리케이션에서는 속도와 자원 문제를 파악해 보고 적절한 구현법을 사용해야 합니다. (사실 모든 애플리케이션에서 멀티스레딩을 쓸 수 있다고 생각해야 합니다.)
- DCL을 써서 구현하면 자바 5 이전에 나온 버전에서는 스레드 관련 문제가 생길 수 있습니다. 주의하세요.
- 클래스 로더가 여러 개 있으면 싱글턴이 제대로 작동하지 않고, 여러 개의 인스턴스가 생길 수 있습니다.
- 자바의 enum을 쓰면 간단하게 싱글턴을 구현할 수 있습니다.
