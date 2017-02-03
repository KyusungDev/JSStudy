# 인사이드 자바스크립트

### 프로토타입 체이닝

자바스크립트의 모든 객체는 자신의 부모인 프로토타입 객체를 가리키는 참조 링크 형태의 숨겨진 프로퍼티가 있다.  
ECMAScript에서는 이러한 링크를 **암묵적 프로토타입 링크(implicit prototype link)** 라고 부르며 이러한 링크는
모든 객체의 [[Prototype]] 프로퍼티에 저장된다.

자바스크립트의 생성 규칙은 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체를
자신의 부모 객체로 설정하는 [[Prototype]] 프로퍼티로 연결한다. (**[[Prototype]] 링크**)

**프로토타입 체이닝**이란 특정 객체의 프로퍼티나 메서드에 접근하려고 할 떄, 해당 객체에 접근하려는 프로퍼티나 메서드가 없다면
[[Prototype]] 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티를 차례대로 검색하는 것을 말한다.

프로토타입 체이닝을 통해 자신의 프로퍼티뿐만 아니라, 자신의 부모역할을 하는 프로토타입 객체의 프로퍼티에도 접근이 가능하다.


- 객체 리터럴 방식에서의 프로토타입 체이닝
    객체 리터럴로 생성한 객체는 Object()라는 내장 생성자 함수로 생성된다.

- 생성자 함수로 생성된 객체의 프로토타입 체이닝  
    생성자 함수로 생성한 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 취급한다.
    
    ```js
    function Person(name, age, hobby) {
        this.name = name;
        this.age = age;
        this.hobby = hobby;
    }

    var foo = new Person('foo', 30, 'tennis');

    // 프로토타입 체이닝 (foo > Person.prototype > Object.prototype.hasOwnProperty)
    console.dir(foo.hasOwnProperty('name')); // ture
    console.dir(Person.prototype);
    ```

    foo의 객체 생성자 함수는 Person이다.  
    foo 객체의 프로토타입 객체는 자신을 생성한 Person 생성자 함수 객체의 prototype 프로퍼티가 가리키는 객체가 된다.  
    즉, foo 객체의 프로토타입 객체는 Person.prototype이 된다.

    > 객체 리터럴 방식이나 생성자 함수를 이용한 방식이나 결국엔 Object.prototype에서 프로토타입 체이닝이 끝난다.

- 프로토타입도 자바스크립트 객체다
    함수가 생성될 때 자신의 prototype 프로퍼티에 연결되는 프로토타입 객체는 디폴트로 constructor 프로퍼티만을 가진 객체다.  
    따라서, 일반 객체처럼 동적으로 프로퍼티를 추가/삭제하는 것이 가능하다. 그리고 변경된 프로퍼티는 실시간으로 프로토타입 체이닝에 반영된다.
    ```js
    function Person(name) {
        this.name = name;
    }

    var foo = new Person('foo');
    // foo.sayHello() // Error!

    Person.prototype.sayHello = function() { console.log('Hello'); }
    foo.sayHello(); // Hello
    ```

- 프로토타입 메서드와 this 바인딩  
    프로토타입 메서드는 _객체의 메서드를 호출할 때 this 바인딩 규칙_이 적용된다.
    ```js
    function Person(name) {
        this.name = name;
    }

    // getName() 프로토타입 메서드 추가
    Person.prototype.getName = function () { return this.name; };

    var foo = new Person('foo');
    console.log(foo.getName()); // foo

    // Person.prototype 객체에 name 프로퍼티 동적 추가
    Person.prototype.name = 'person';
    console.log(Person.prototype.getName()); // person
    ```

- 디폴트 프로토타입 변경  
    디폴트 프로토타입 객체는 함수가 생성될 때 같이 생성되며, 함수의 prototype 프로퍼티에 연결된다.  
    자바스크립트는 이렇게 생성되는 디폴트 프로토타입 객체를 다른 일반 객체로 변경 가능하며, 이 특성을 이용해 **객체지향의 상속**을 구현한다.

    > 생성자 함수의 프로토타입 객체가 변경되면, 변경된 시점 이후에 생성된 객체들만 [[Prototype]] 링크를 연결한다.

    ```js
    function Person(name) {
        this.name = name;
    }
    console.log(Person.prototype.constructor); // Person(name)

    var foo = new Person('foo');
    console.log(foo.country); // undefined

    // 디폴트 프로토타입 객체 변경
    Person.prototype = { country: 'Korea' };
    console.log(Person.prototype.constructor); // Object()

    var bar = new Person('bar);
    console.log(foo.country); // undefined
    console.log(bar.country); // Korea
    console.log(foo.constructor); // Person(name)
    console.log(bar.constructor); // Object()
    ```
- 객체의 프로퍼티의 읽기나 메서드를 실행할 때만 프로토타입 체이닝 동작한다.  
    ```js
    function Person(name) { 
        this.name = name;
    }

    Person.prototype.country = 'Korea';
    
    var foo = new Person('foo');
    var bar = new Person('bar');

    console.log(foo.country); // Korea
    console.log(bar.country); // Korea

    // foo 객체에 새로운 프로퍼티를 동적으로 추가
    foo.country = 'USA'; 

    console.log(foo.country); // USA
    console.log(bar.country); // Korea
    ```
     
