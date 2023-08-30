this는 호출 패턴에 따라 다른 객체를 참조합니다. 실행 컨텍스트(EC)가 생성될 때마다 this의 바인딩이 일어나며 우선순위 순으로 나열해보면 다음과 같습니다.

1. `[new](https://github.com/Esoolgnah/Frontend-Interview-Questions/blob/main/Notes/important-4/this.md#gear-new)` 를 사용했을 때 해당 객체로 바인딩됩니다.

```
var name = 'global';
function Func() {
  this.name = 'Func';
  this.print = function f() {
    console.log(this.name);
  };
}
var a = new Func();
a.print(); // Func
```

1. `[call](https://github.com/Esoolgnah/Frontend-Interview-Questions/blob/main/Notes/important-4/this.md#gear-call)`, `[apply](https://github.com/Esoolgnah/Frontend-Interview-Questions/blob/main/Notes/important-4/this.md#gear-apply)`, `[bind](https://github.com/Esoolgnah/Frontend-Interview-Questions/blob/main/Notes/important-4/this.md#gear-bind)` 와 같은 명시적 바인딩을 사용했을 때 인자로 전달된 객체에 바인딩됩니다.

```
function func() {
  console.log(this.name);
}
var obj = { name: 'obj name' };
func.call(obj); // obj name
func.apply(obj); // obj name
func.bind(obj)(); // obj name
```

1. 객체의 메소드로 호출할 경우 해당 객체에 바인딩됩니다.

```
var obj = {
  name: 'obj name',
  print: function p() {
    console.log(this.name);
  },
};
obj.print(); // obj name
```

1. 그 외의 경우
- strict mode(엄격 모드): `undefined` 로 초기화됩니다.
- 일반: 브라우저라면 `window` 객체에 바인딩됩니다.

---

## 🛠️ 용어 공부

### ⚙️ 바인딩

- 바인딩(Binding) 이란 프로그램의 어떤 기본 단위가 가질 수 있는 구성요소의 구체적인 값, 성격을 확정하는 것을 말합니다.

### ⚙️ EC

- EC는 실행 컨텍스트(Execution Context)의 약자이며 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리입니다.

### ⚙️ new

- new라는 기호는 자바스크립트의 고유의 예약어이며 고유의 연산자(operator) 입니다. 아래는 자바스크립트의 new라는 연산자(operator)에 대한 정의 입니다.

> new 연산자는 사용자 정의 객체 타입 또는 내장 객체 타입의 인스턴스를 생성한다.
> 

### ⚙️ call

- call을 사용하면 함수를 실행하고 함수의 첫 번째 인자로 전달하는 값에 this를 바인딩합니다.

### ⚙️ apply

- call과 마찬가지로 apply를 사용하면 함수를 실행하고 함수의 첫 번째 인자로 전달하는 값에 this를 바인딩합니다. call과의 차이점은 인자를 배열의 형태로 전달한다는 것입니다. 이 때, 인자로 배열 자체가 전달되는 것이 아니라, 배열의 요소들이 값으로 전달됩니다.

### ⚙️ bind

- bind는 함수의 첫 번째 인자에 this를 바인딩한다는 점은 같지만, 함수를 실행하지 않으며 새로운 함수를 반환합니다. 즉 반환된 새로운 함수를 실행해야 원본 함수가 실행됩니다.