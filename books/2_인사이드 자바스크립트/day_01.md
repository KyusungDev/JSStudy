# 인사이드 자바스크립트

### 함수

- 함수 생성 방법

    + 함수 선언문 방식 (function statement)
        ```js
        function add(x, y) { return x + y; }
        ```

    + 함수 표현식 방식 (function expression)
        + 함수도 하나의 값으로 취급되므로 할당이 가능하다.  
        + 표현식의 경우 일반적으로 함수 이름을 사용하지 않는데, 이를 익명 함수 표현식이라 한다.
        ```js
        var add = function (x, y) { return x + y; }
        ```

    + Function() 생성자 함수 사용 방식
        + 일반적으로 사용하지 않는 방식
        ```js
        var add = new Function('x', 'y', 'return x + y');
        ```

- 함수 호이스팅 (Function Hoisting)
    + 함수 선언문 방식으로 정의한 함수는 코드의 맨 처음으로 끌어올려지게(hoisting) 되므로 
    정의가 되지 않은 상태에서 호출이 가능하다.  
    ```js
    add(2, 3); // 호출 가능
    function add(x, y) { return x + y };
    ```
    > 더글러스 크락포드는 이러한 방법이 구조를 엉성하게 만들수 있으므로, 함수 표현식 사용을 권장하고 있다.

- 함수 객체
    + 자바스크립트는 함수도 객체다. 따라서 프로퍼티를 추가/삭제 할 수 있다.
    + 일반 객체는 아래와 같은 동작이 가능하다.
        + 리터럴에 의한 생성
        + 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
        + 함수의 인자로 전달 가능
        + 함수의 리턴값으로 리턴 가능
        + 동적으로 프로퍼티를 생성 및 할당 기능
        
    > 이 같은 특징으로 자바스크립트에서는 함수를 ***일급 객체(First Class)*** 라고 부른다  
    > 일급 객체는 위에 나열한 기능을 모두 만족하는 객체를 말한다.

    + 변수, 프로퍼티의 값으로 할당
        ```js
        var foo = function () { return 100; }; // 변수에 할당
        var obj = {};
        obj.baz = function() { return 200; }; // 프로퍼티에 할당
        ```
    + 함수 인자로 전달
        ```js
        var foo = function(func) { func(); };
        foo(function() { console.log('bar'); });
        ```
    + 리턴값으로 활용
        ```js
        var foo = function() { 
            return function () {
                console.log('this function is the return value');
            };
        };

        var bar = foo();
        bar();
        ```
    + 함수 객체의 기본 프로퍼티
        + 함수 객체는 아래 나열된 기본(내부) 프로퍼티를 가지고 있다.  
            `length, prototype` (표준)  
            `name, caller, arguments, [[Prototype]]` (비표준)

        > ECMA 표준에서는 함수 객체의 부모 역할을 하는 프로토 타입 객체를 **Function.prototype 객체**라고 하며,
        이것 역시 함수 객체라고 정의하고 있다.
        
        + 함수 객체의 부모( Internal Property [[Prototype]] ) > Function.prototype 객체 (함수 객체)  
        + Function.prototype의 부모 ( Internal Property [[Prototype]] ) > Object.prototype 객체

        + ECMAScript 명세에는 Function.prototype 객체가 가져야 하는 프로퍼티들을 다음과 같이 기술하고 있다.
            1. constructor 프로퍼티
            2. toString() 메서드
            3. apply(thisArg, argArray) 메서드
            4. call(thisArg, [, arg1, [,arg2,]]) 메서드
            5. bind(thisArg, [, arg1, [,arg2,]]) 메서드
    
- 함수의 다양한 형태
    + **콜백 함수** : 함수를 등록하거나 이벤트가 발생하는등 특정 시점에 도달했을때 호출되도록 하는 함수.
    + **즉시 시행 함수** : 함수를 정의함과 동시에 실행하는 함수. 최초에 한번의 실행만을 필요로 하는 초기화 코드 부분에 사용.
    + **내부 함수** : 함수 코드 내부에 또 다시 함수를 정의하여 사용하는 함수.

    
- 호출 패턴과 this 바인딩
    + 객체의 메서드를 호출할 때  
        this는 자신을 호출한 객체에 바인딩 된다.
        ```js
        var myObject = { 
            name: 'foo', 
            sayName: function() { console.log(this.name);}
        };
        var otherObject = { name: 'bar' };

        otherObject.sayName = myObject.sayName;
        myObject.sayName();
        otherObject.sayName();

        // 출력 결과
        > foo
        > bar
        ```
    + 함수를 호출할 때   
        함수 내부에서 사용된 this는 전역객체에 바인딩 된다. (브라우저의 경우 window)  
        내부 함수를 호출하는 경우도 this는 전역객체에 바인딩 된다.  
        일반적으로 다른 변수에 저장하는 방법을 사용해서 문제를 방지한다.

        ```js
        var value = 100;
        var myObject = { 
            value: 1, 
            func1: function() { 
                var that = this;    // 다른 변수에 저장
                this.value += 1;

                func2 = function() {
                    that.value += 1;
                }
        }}
        ```

    + 생성자 함수를 호출할 때 this 바인딩
        생성자 함수는 객체를 생성하는 역할을 하는데, 기존 함수에 new 연산자를 붙여서 호출하면 생성자 함수로 동작한다.  
        이는 의도와 달리 원치 않은 함수의 동작을 방지하기 위해 생성자 함수로 정의됨을 알리기 위해 **함수이름의 첫 문자를 대문자로** 쓰기를 권장하고 있다.

        ```js
        // 객체 리터럴로 객체 생성
        var foo = {
            name: 'foo',
            age: 35,
            gender: 'men'
        };
        console.dir(foo);

        // 생성자 함수로 객체 생성
        function Person(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }

        var bar = new Person('bar', 33, 'woman');
        var baz = new Person('baz', 24, 'woman');

        console.dir(bar);
        console.dir(baz);

        // 디버깅
        > Object
          age: 35
          gender: "man"
          name: "foo"
          __proto__: Object
        > Person
          age: 33
          gender: "woman"
          name: "bar"
          __proto__: Person
        > Person
          age: 25
          gender: "woman"
          name: "baz"
          __proto__: Person
        ```

        + 객체 생성 방식의 차이(객체 리터럴 vs 생성자 함수)  
        자바스크립트 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.
            + 객체 리터럴 방식에서 생성자 함수 : Object()
            + 생성자 함수 방식에서 생성자 함수 : Person() (자신 자체)
        
        > 전문가들은 일반 함수와 생성자 함수의 구분이 없으므로 생성자 함수로 사용할 함수는 대문자로 표기하는 네이밍 규칙을 권장하고 아래와 같은 코드 패턴을 사용하기도 한다.
        > 
        >```js
        > function A(arg) {
        >   if (!(this instanceof A)) // this가 A의 instance 인지 확인
        >       return new A(arg);
        >   this.value = arg ? arg : 0;
        >}
        > ```
    
    + call과 apply 메서드를 이용한 명시적인 this 바인딩  
        apply(), call() 메서드는 모든 함수의 부모 객체인 Function.prototype 객체의 메서드이므로, 다음과 같이 호출이 가능하다.
        ```js
        function.apply(thisArg, argArray); // 인자를 배열 형태로 호출  
        function.call(thisArg[, arg1[, arg2[, ...]]]); // 인자를 열거하는 형태로 호출
        ```

        아래 코드는 결국 `Person('foo', 30, 'man')` 함수를 호출하면서 this를 `foo` 객체로 명시적으로 바인딩 하는것을 의미한다.
        ```js
        function Person(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }

        var foo = {};

        Person.apply(foo, ['foo', 30, 'man']); 
        // Person.call(foo, 'foo', 30' man'); // call 메서드를 사용한 경우
        console.dir(foo);

        // 디버깅
        > Object
          age: 30
          gender: "man"
          name: "foo"
          __proto__: Object
        ```

        apply() 메서드를 활용한 arguments 객체의 배열 표준 메서드 slice() 활용
        ```js
        function myFunction() {
            console.dir(arguments);

            // Array.prototype.slice() 메서드를 호출해라. 이때 this는 arguments 객체로 바인딩해라.
            var args = Array.prototype.slice.apply(arguments);
            console.dir(args);

            // 디버깅
            > Arguments[3]
              0: 1
              1: 2
              2: 3
              callee: function myFunction() {
                length: 3
              __proto__: Object
            
            > Array[3]
              0: 1
              1: 2
              2: 3
              length: 3
              __proto__: Array[0] 
        }
        ```

- 함수 리턴
    + 자바스크립트 함수는 항상 리턴값을 반환한다. 특히, return 문을 사용하지 않았더라도 다음 규칙으로 항상 리턴값을 전달한다.
        1) 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.
        2) 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다. (불린,숫자,문자열도 무시함)
            단, 명시적으로 다른 객체를 생성해서 반환한 경우는 새로 생성된 객체를 반환한다.



