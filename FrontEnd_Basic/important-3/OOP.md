# OOP란 무엇인가요?

<aside>
💡 OOP는 Object Oriented Programming의 줄임말.

- 객체(Object) / Oriendted(지향) / Programming(프로그래밍)

</aside>

## 장점

- 다른 클래스를 가져와 사용할 수 있고, 상속받을 수 있어 코드의 재사용성 증가
- 자주 사용되는 로직을 라이브러리로 만들어두면 계속해서 사용할 수 있어 신뢰성을 확보 가능
- 클래스 단위로 모듈화가 가능하며, 대형 프로젝트에 적합.(위와 비슷한 의미)
- 객체 단위로 코드가 나눠져 작성되기 때문에 디버깅이 쉽고 유지보수가 용이함.

## 단점

- 처리 속도가 상대적으로 느림
- 객체가 많으면 용량이 커짐
- 설계 시 많은 노력과 시간이 필요

## 객체 지향의 특성

### 캡슐화

- 코드를 수정 없이 재활용하는 것을 목적으로 함.
- **클래스라는 캡슐에 기능과 특성을 담아 묶는다.**

### 상속

- **클래스로부터 속성과 메서드를 물려받는 것을 말함**
- 다른 클래스를 가져와서 수정할 일이 있다면, 그 클래스를 직접 수정하는 대신 상속을 받아 변경하고자 하는 부분만 변경

### 추상화

- **객체 지향 관점에서 클래스를 정의하는 것**
- **불필요한 정보 외 중요한 정보만 표현**함으로써 공통의 속성과 기능을 묶어 이름을 붙이는 것.

### 다형성

- 하나의 변수명이나 함수명이 상황에 따라 다르게 해석될 수 있음
- 대표적인 **다형성이 오버 라이딩, 오버 로딩이다.**