## call signatures

- > 코드에 마우스 올리면 나오는 것
  > 
![image](https://github.com/yuhyeon99/TIL/assets/83055700/e6099095-2ced-4a99-a1eb-9541e8630d97)

- 해당 코드의 변수나 함수의 타입을 알려줌!
- 타입 지정하지 않아도 타입스크립트가 해당 코드의 타입을 추론해서 적용해줌
- 함수가 만들어지기 이전에 어떻게 작동하는지 서술한다고 할 수 있음
- 프로그램을 짜기 전에 타입을 먼저 생각하고 코드를 구현하는 방식에서 많이 쓰임

```
function add(a:number, b:number) {
    return a + b
}
```

> 화살표 함수일 때 결과의 타입 추론함const add2 = (a:number, b: number)=> a + b- 인수 number 타입이므로 a + b의 결과의 타입은 number!
> 

> 함수 인수에 타입을 넣고싶지 않다면?!-> call signatures 사용
> 

`const add3 = (a, b) => a + b

> call signatures 만들기type Add = (a:number, b:number) => number- type 생성자를 통해 만들 수 있음!
>
