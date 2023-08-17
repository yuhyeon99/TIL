Polymorphism (다형성)

다형성이란, 여러 타입을 받아들임으로써 여러 형태를 가지는 것을 의미합니다.

<aside>
💡 any와의 차이점은 해당 타입에 대한 정보를 잃지 않는다.

any는 any로서 밖에 알 수 없지만 generics는 타입 정보를 Call Signatures를 통 알 수 있다.

</aside>

generic type

- 타입의 placeholder

```

type SuperPrint={

(arr:T[]):T;

}

const superPrint:SuperPrint=(arr)=>{

return arr[0]

}

const a=superPrint([1,2,3])

const b=superPrint([true,false,true])

const c=superPrint(["a","b"])

const d=superPrint([1,2,"a","b",true])

```
