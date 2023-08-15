📌 Types of TS(기본)

✅ 배열: 자료형[]

✅ 숫자: number

✅ 문자열: string

✅ 논리: boolean

✅ optional

const player : {

name: string,

age?:number

} = {

name: "nico"

}

❌ player.age가 undefined일 가능성 알림

if(player.age < 10) {

}

⭕ player.age가 undefined일 가능성 체크

if(player.age && player.age < 10) {

}

❗ ?를 :앞에 붙이면 optional

- optional 키워드를 지정해주면 해당 값이 존재하지 않아도 오류가 발생하지 않음

✅ Alias(별칭) 타입

type Player = {

name: string,

age?:number

}

const player : Player = {

name: "nico"

}

⭐ 함수에서는 어떻게 쓸까

type Player = {

name: string,

age?:number

}

function playerMaker1(name:string) : Player {

return {

name

}

}

const playerMaker2 = (name:string) : Player => ({name})

const nico = playerMaker1("nico")

nico.age = 12
