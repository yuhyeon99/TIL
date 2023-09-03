truffle에서는 js기반의 테스트에서도 유명한 모카차이가 있습니다

```jsx
contract('Lottery', function ({deployer, user1, user2}){

});
```

위 contract 함수에서 콜백 함수로 파라미터를 줄 수 있는데 {deployer, user1, user2} ganache-cli 에서 생성된 10개의 계정이 순서대로 들어갑니다.

```jsx
contract('Lottery', function ({deployer, user1, user2})){
    beforeEach(async () => {
        console.log('Before each')
    })

    it('Basic test', async () => {
        console.log('Basic test');
    })
};
```

truffle test의 두가지 방법

1. `truffle test` 를 치면 테스트 파일 전체가 실행됩니다. => 다른 테스트 파일 전부 실행됨..
2. 단일 테스트일 경우에는 `truffle test test/lottery.test.js` 이런식으로 테스트함

배포

배포는 lottery = await [Lottery.new](http://lottery.new/)(); 를 통해 배포가능

주의

migrations 폴더에 스크립트 폴더는 테스트할 때 사용하지 않으며 배포한 스마트 컨트렉트를 통해 테스트하는것이다.

!https://cdn.inflearn.com/public/files/posts/dddd668b-c1cb-42c6-a0b1-66f4c045b522/image.png

위 코드가 아니라 아래 new 함수를 통해 선언한 객체를 사용함

!https://cdn.inflearn.com/public/files/posts/f0e484a7-7a04-4bc0-87e1-d80a6d9d9c6e/image.png