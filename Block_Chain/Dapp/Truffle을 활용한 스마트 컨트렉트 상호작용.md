```solidity
// 버전 0.4보다 높고 0.9보다 작은 스마트 컨트렉트 사용
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function getSomeValue() public pure returns (uint256 value){
        return 5;
    }
}
```

- `address public owner;` ⇒ 주소로 owner 을 설정, public 으로 만들면 자동으로 getter를 만들어 줌
    
    : 스마트 컨트렉트에서 바로 owner 값을 확인할 수 있음
    
- `constructor()` ⇒ 배포될 때 실행되는 함수
    - `owner = msg.sender;` : 보낸 사람으로 owner을 저장하겠다
- 배포하게 되면 최초 배포했을 때 보다 gas 비용이 증가했음 
⇒ 코드를 작성한 만큼 블록체인에 저장해야하기 때문에 더 많은 gas가 요구됨
- `truffle console` 을 입력해서 콘솔에 접근하면 web3 object를 사용할 수 있음
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/b215c047-1e49-49cb-b629-6619a459c8f7/Untitled.png)
    

### 상호작용 하는 법

1. truffle console 커맨드 창에서 `Lottery.address`를 입력하면 address 확인가능
⇒ build 폴더 안 Lottery.json 에서 가져와주는 것
2. `Lottery.deployed().then(function(instance){lt=instance})`
3. `lt` ⇒ lt 안에 Lottery 의 인스턴스가 들어온걸 확인할 수 있음.
    1. `lt.abi` ⇒ lt에서 사용할 수 있는 여러 함수를 볼 수 있음
    2. `lt.owner()` ⇒ 0번째 account를 확인할 수 있음
    3. `lt.getSomeValue()` ⇒ 5가 나옴 BN(Big Number), 이더리움에서 다루는 숫자가 크기때문.