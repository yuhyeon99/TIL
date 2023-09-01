1. 폴더 생성 후 cd 폴더명
2. `turffle init` - 프로젝트 기본 세팅
3. contracts. migrations, test 폴더 및 truffle-config.js 생성
    1. migrations → 배포 관련 스크립트 폴더
    2. contracts → 스마트 컨트렉트 관련 코드 폴더
    3. test → 테스트 코드 관련 폴더
4. contracts 폴더에 Lottery.sol 파일 생성
    1. 기본 코드 작성 후 `truffle compile` 
    2. build 폴더에 Lottery.json 파일 생성(컴파일한 결과)
5. Lottery.json
    1. “bytecode” ⇒ 실제 블록체인 네트위크에 배포되는 코드
6. migrations
    1. const Migrations = artifacts.require("Migrations");
    2. 위 코드는 artifacts.require가 build폴더에 있는 Migrations파일의 데이터를 가져옵니다
    3. 그 다음 deployer가 배포하는 형식
        
        ```
        module.exports = function(deployer) {
          deployer.deploy(Migrations);
        };
        ```
        
    4. deployer 생성과정
        1. 실제 이더리움에서 스마트컨트렉트를 배포하는 주소가 존재
        2. truffle-config.js에서 내가 사용할 주소를 세팅하고 그 주소를 통해서 이 주소가 deployer 변수에 매핑(인젝션)이 됨
        3. 이후 deployer가 스마트 컨트렉트를 배포
7. 배포
    1. 배포하기 위해선 blockchain network가 필요함 ⇒ `genache-cli` 사용해야함
    2. `ganache-cli -d -m tutorial` ⇒ 항상 같은 주소와 같은 private 키를 가져오게 됨
    3. 추후 테스트 할 때에도 private 키를 import 해서 사용하면 됨
    4. truffle-config.js 에서 development 주석 해제
    5. 새로운 터미널을 열어서 `truffle migrate` 실행
8. 배포 완료

    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/f36e2a2a-59fa-4be0-bd4a-aaefcb50bde8/Untitled.png)
    
    1. gas : 블록체인 기술 사용과정 중 필요한 트렌젝션의 비용을 명칭
    2. 재배포 할 시에는 `truffle migrate —reset` 으로 재배포 
    : 첫 번호부터 배포 진행하도록 해야함 그렇지 않을 시 두번째 배포 때 마지막 배포파일 + 1 번부터 배포함. 

### Migration.sol 의 역할

<aside>
💡 스마트 컨트렉트의 버전 관리 역할
truffle 에서 사용하는 툴 또는 컨트렉을 몇번째 deployment 스크립트 까지 사용했는지 파일을 통해 확인 가능

</aside>

```solidity
function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
```

위 코드로 확인 uint completed 숫자가 아래 사진 앞 숫자입니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/aab75b4f-b82a-4b9d-b9ed-466eed972106/Untitled.png)

**기본적으로 truffle 구조가 Migration.sol 과 깊게 연관있기 때문에 건드리지 않는게 제일 좋음**

따로 스마트 컨트렉트를 짜고 기본 스마트 컨트렉트 배포 구조는 2_번에서구현하는게 좋음.