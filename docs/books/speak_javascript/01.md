# 자바스크립트를 말하다

### **배경**
브렌던 아이크가 넷스케이프에 도입하기 위해서 만듬.
여러 언어로부터 영향을 받아서 함수형, 객체지향 프로그래밍이 혼재되어 있음. 

> JavaScript : 프로그래밍 언어  
> EcmaScript : 언어 명세에서 사용하는 이름  
> ECMA : European Computer Manufacturers Association의 준말로서 사용되다가 
국제적 확장으로 준말로 사용하지 않음

---

### **문법**
- `'==='` 3중 등호로 비교. 비교시에는 엄격학 비교를 하는 `===` 사용을 권장. 
- 세미콜론(`;`)은 옵션이지만 사용하는걸 권장.
- 원시 값 (Primitive type)  
    `Boolean, 숫자, 문자열, undefined, null`  
  + 비교시 실제 값으로 비교
  + 프로퍼티 변경 불가, 항상 불변.
  + 확장이 가능
  > undefined : 초기화 되지 않은 변수, 생략된 매개변수, 존재하지 않는 프로퍼티등을 표현  
  > null : 값이 없음, 값이 아닌 값, 객체가 아님등을 표현  

  > false, 0, NaN : 모두 false로 취급함  
  > NaN (Not a Number) : 에러 값  
  > Infinity : 에러로 발생되는 값, NaN을 제외한 어떤 숫자보다 크고, -Infinity는 NaN을 제외한 어떤 숫자보다 작다
- 원시 값이 아닌 경우 모두 객체  
    ` { firstName : 'Jane' }, [ 'apple, 'bananan' ]`
  + 비교시에 참조로 비교
  + 프로퍼티 변경이 가능함

---

### **테크닉**
- undefined인지 null인지 체크할 때
    ```js
    if (x !== undifined && x !== null) ...
    ```
- 문자열에 들어 있는 숫자를 다룰 때 (값 x가 숫자인지 문자열인지 확실치 않을 때)
    ```js
    if (Number(x) === 123) ...
    ```
- 래퍼 인스턴스와 원시 값 비교 (동등연산자로 비교)
    ```js
    'abc' == new String('abc')
    > true
    ```

- 기본 값 제공하기
    + 매개변수 기본 값
        ```js
        function saveText(text) {
            text = text || '';
        }
        ```
    + 프로퍼티 기본 값
        ```js
        setTitle(options.title || 'Untitled');
        ```
    + 함수의 기본 반환값
        ```js
        // str에 regex가 몇 번 일치하는지 센다
        // match가 배열 또는 null을 반환하므로 null인 경우 빈 배열의 length를 반환하도록 한다
        function countOccurrences(regex, str) {
            return (str.macth(regex) || []).length;
        }
        ```
- 예외처리시 Error() 생성자 사용
    ```js
    if (somethingBadHappened) {
        throw new Error('Something bad happened');
    }

    ```
- IIFE(Immediately Invoked Function Expressions)의 일반적인 형태 (전역 스코프를 오염시키지 않기 위해 사용) 
    + 즉시 호출됨, 반드시 표현식이어야 함, 세미콜론을 붙여야함 (호출)
    ```js
    (function () { // IIFE 시작
                   // IIFE 내부
    }());          // IIFE 끝
    ```
    
---

### **조언**
- 래퍼 객체는 사용하지 않는 것이 좋다.
- 문자열은 사용시 홀따옴표(`''`)로 감싸서 사용하는 것이 일반적이다.
- 함수 이름은 소문자로 시작하는 것이 관례다.
- 메서드 이름은 소문자로 시작하는 것이 관례다.
- 생성자 이름은 대문자로 시작하는 것이 관례다.
- 배열에서는 `for-in`을 쓰지마라. 프로퍼티 키도 순회 대상이므로 `for`, `forEach`를 쓰는 편이 낫다.
- 객체에서 `for-in`을 쓸 때도 주의하라. 모든 프로퍼티를 순회하며 상속된 프로퍼티도 해당한다.
- with문을 사용하지 말고 필요한 경우에는 짧고 일시적인 변수를 만들어 사용하라.
- 이름 붙은 함수 표현식의 이름은 함수 표현식 내부에서만 접근할 수 있다 (재귀 구조에서 유용)
- 스코프 내에서는 함수 선언 전에 참조가 가능하다. (Hoisting)
- 스코프 내에서는 변수 선언 전에 참조가 가능하다. 단, 값이 없을 수 있다 (`undefined`)
- 함수 호출시에 매개변수는 정보는 `arguments` 객체에 담긴다.
- 클로저는 만들어진 스코프와 연결된 채 존재하는 함수다.
- 크게 보면 자바스크립트 객체는 모두 문자열과 값으로 되어 있는(키-값 쌍) 맵(`Dictionary`)이다.
- 객체에 들어있는 키-값 쌍을 프로퍼티라고 부르는데, 메서드는 값이 함수인 프로퍼티이다.
- `delete` 연산자의 사용은 피해라. 자바스크립트 엔진은 인스턴스의 변경(프로퍼티 추가 제거)가 없을때 성능을 최적화한다. 프로퍼티를 삭제하면 최적화가 사라진다.

