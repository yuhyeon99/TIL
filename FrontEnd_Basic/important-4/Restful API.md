`[REST API](https://github.com/Esoolgnah/Frontend-Interview-Questions/blob/main/Notes/important-5/rest-api.md)`를 제공하는 웹사이트를 RESTful 하다고 할 수 있습니다. RESTful API를 통해 이해하기 쉬운 API를 만드는 것이 목적입니다.

> GET: 요청받은 URI의 정보를 검색하여 응답합니다.POST: 요청된 자원을 생성합니다.DELETE: 요청된 자원을 삭제할 것을 요청합니다.PUT: 요청된 자원을 (전체를) 수정합니다.
> 

> PATCH: 요청된 자원 (일부를) 수정합니다.HEAD: GET 방식과 동일, 하지만 응답에 BODY가 존재하지 않으며, 응답코드와 HEAD 만 응답합니다.CONNECT: 동적으로 터널모드를 교환, 프록시 기능을 요청시 사용합니다.TRACE: 원격지 서버에 루프백 메세지를 호출하기 위해 테스트용으로 사용합니다.OPTIONS: 웹서버에서 지원되는 메서드의 종류를 확인할 경우 사용합니다.
> 

---

## 🛠️ 용어 공부

### ⚙️ 터널모드

- IPSec에는 두 가지 모드가 있는데, IP의 내용(payload)만을 보호하느냐, 아니면 헤더까지 모두 보호하느냐에 따라서 전자는 `전송 모드(Transport Mode)`, 후자는 `터널 모드(Tunnel Mode)`라고 합니다.

### ⚙️ 프록시

- 프록시(Proxy) 는 ‘대리', '대신' 이라는 뜻을 가집니다. 주로 보안상의 문제를 방지하기 위해, 직접 통신하지 않고 중계자를 거친다는 개념입니다.

### ⚙️ 루프백

- 루프백(loopback) 이란 가상의 인터페이스를 만들어서 사용하는 것입니다. 인터페이스 예로는 LAN구간 , WAN구간 마다 다르겠지만 Serial와 Ethernet이 FastEthernet 등등 다양한 인터페이스가 존재합니다. 물리적인 인터페이스의 경우 Serial 일때 Clock rate , WAN 인캡슐레이션 등 부여를 해야하고 이는 즉 외부에 간섭을 받는다는 말이 됩니다. 하지만 loopback은 설정을 하지 않아도 되며, 라우터가 죽지 않는 이상 잘 돌아가게 됩니다. 다른 인터페이스는 죽으면 통신이 안되지만 loopback 은 그렇지 않기 때문에 비교적 안전한 인터페이스라고 말합니다.