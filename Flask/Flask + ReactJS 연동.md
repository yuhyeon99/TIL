React와 Flask 웹 서버를 연동한 웹 애플리케이션 프로젝트를 만들어보자!

# Flask 백엔드

프로젝트 폴더에 `flask-server` 폴더를 생성한다.

이 파일에 서버와 관련된 파일들이 들어가게 될 것이다.

## 패키지 설치와 가상환경 설정

### 1. 가상환경 만들기

생성한 `flask-server` 폴더에 가상환경을 생성해보자

### (1) 가상환경 생성

`flask-server` 폴더에 들어간 후 터미널에서

```
# 윈도우
python -m venv venv

# 맥
python3 -m venv venv
```

명령어를 실행하여 `venv` 라는 가상환경을 만든다.

### (2) 가상환경 실행

터미널에서 아래의 명령어를 통해 `venv` 가상환경을 실행한다.

```

# 윈도우
source venv/Scripts/activate
# 맥
source venv/bin/activate
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/e32e03f9-3c16-4fd8-a369-d83a37ef52e0/Untitled.png)

### 2. flask 설치

가상환경을 실행한 상태에서 flask를 설치한다.

```
pip3 install Flask
```

이제 python 파일 안에 flask를 import 하면 flask 사용이 가능하다!

> 오류
>
> flask import를 해도 VScode에서 설치한 flask를 인식하지 못하는 오류가 발생했는데
>
> !https://velog.velcdn.com/images/dalkong/post/d4f19279-8f9c-4db2-bc1b-c9af4c60d03a/image.png
>
> VScode로 `flask-server` 파일을 바로 열면 해당 문제가 발생하지 않는다.
>
> !https://velog.velcdn.com/images/dalkong/post/9fc4d804-9627-41d7-8cc8-0aebb9686a6f/image.png
>
> 심지어 실행에도 전혀 문제가 없어 더 자세한 이유는 찾아봐야 할 것 같다...

## 서버 파일 작성하고 실행하기

간단한 user 데이터를 client와 주고 받을 수 있도록 서버 파일을 생성해보자.

### 1. 서버 파일

### (1) 코드 작성

`flask-server` 폴더 안에 `server.py` 파일을 하나 생성하여 아래 코드를 작성한다.

```python
from flask import Flask # Flask

app = Flask(__name__)

@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
    return {"members": [{ "id" : 1, "name" : "yerin" },
    					{ "id" : 2, "name" : "dalkong" }]}

if __name__ == "__main__":
    app.run(debug = True)

```

### (2) 서버 실행

```
python server.py
```

위 명령을 실행하여 서버 파일을 실행한다.

```
http://127.0.0.1:5000
```

에서 서버가 돌아가고 있음을 알 수 있다.

!https://velog.velcdn.com/images/dalkong/post/351a4712-1933-436c-a94d-81cac2d8dd97/image.png

### (3) Json 데이터 확인

`127.0.0.1:5000/users` 를 통해 (1)에서 작성한 코드에 따라 users Json 데이터에 접근할 수 있다.

!https://velog.velcdn.com/images/dalkong/post/c2716114-ab58-44fa-95bd-3a60e71a12c0/image.png

# React 프론트엔드

## React 시작하기

### 1. React 파일

### (1) create-react-app

프로젝트 파일 안에서 아래의 명령어를 터미널에서 실행한다.

```
npx create-react-app client
```

`client` 라는 이름의 react 프로젝트가 만들어졌다.

!https://velog.velcdn.com/images/dalkong/post/b740b24f-abcf-47a4-9488-a86e1e805b9d/image.png

`npm start` 명령어를 실행하면

!https://velog.velcdn.com/images/dalkong/post/5d955628-eb2e-46b1-9bd9-4bbe072133de/image.png

`localhost:3000` 에서 웹이 실행되는 것을 확인할 수 있으며 해당 주소로 접속하면 아래와 같은 화면을 볼 수 있다.

!https://velog.velcdn.com/images/dalkong/post/5c5510d5-76bd-4940-8512-9618bb932b89/image.png

### (2) 불필요한 파일 삭제

React 프로젝트 파일 안에 `index.css`, `logo.svg`, `App.test.js` 같은 파일은 삭제하고 다른 파일 안에 삭제한 파일들을 import하는 코드도 삭제한다.

# Flask 와 React 연동하기

React에서 Flask 서버에 접근할 수 있도록 설정한다.

## React 프로젝트에 flask 서버 연결

### 1. proxy 구성

React 프로젝트 안에서 `htttp://127.0.0.1:5000` 주소에 직접 접근하려고 하면 오류가 발생한다. (CORS issues)

!https://velog.velcdn.com/images/dalkong/post/7f289ceb-0c18-4d4e-8ec6-2e28047a4649/image.png

이를 해결하기 위해 React에 proxy를 구성해주어야 한다.

### (1) package.json 파일 수정

package.json 파일에 proxy를 추가해준다.

flask 서버의 주소를 값으로 넣어준다.

!https://velog.velcdn.com/images/dalkong/post/8b6f7160-0836-4fc9-ac01-551c74cc8f5d/image.png

### 2. 결과 확인하기

### (1) App.js 코드 작성하기

이제 `"/users"` 주소를 이용하여 `"htttp://127.0.0.1:5000/users"` 에 있는 데이터에 접근할 수 있다.

아래와 같이 `App.js` 코드를 작성하여 데이터에 잘 접근되었는지 확인한다.

- `useEffect` 를 이용하여 웹을 처음 실행할 때만 데이터를 받아오는 작업을 실행하도록 한다.
- `fetch` 를 통해 주소에 있는 데이터를 GET 해온다.

```jsx
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/users")
      .then(
        // response 객체의 json() 이용하여 json 데이터를 객체로 변화
        (res) => res.json()
      )
      .then(
        // 데이터를 콘솔에 출력
        (data) => console.log(data)
      );
  }, []);

  return <div className="App"></div>;
}

export default App;
```

⚠️ 오류

잘 연결되다가 가끔 `http://127.0.0.1:5000/`에 접근이 불가능하다고 뜨는 오류가 발생했다.

[출처](https://www.pythonfixing.com/2022/07/fixed-how-to-solve-403-error-with-flask.html) 에서 확인한 결과

맥북의 AirPlay 기능 때문에 발생한 오류여서 [AirPlay 설정](https://support.apple.com/ko-kr/guide/mac-help/mchl15c9e4b5/mac)에 들어가 기능을 꺼주었다.

### (2) 데이터 확인

React 앱을 실행하여 콘솔을 확인해보면

해당 주소의 데이터를 잘 받아온 것을 확인할 수 있다.

!https://velog.velcdn.com/images/dalkong/post/7628d75a-0615-4f1c-8729-5bceeced3658/image.png

### 3. 브라우저 화면에 데이터 렌더링하기

### (1) App.js 코드 작성

받은 데이터를 화면에 간단하게 출력해보자

- `useState` 이용하여 data를 저장할 state 변수 `data` 와 state 변경 함수 `setData` 를 만든다.
- axios가 완료되어 데이터를 받아오면 `setData` 함수를 통해 `data` state를 변경해준다. -> 화면이 re-rendering 될 것이다.

```jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

interface dataType {
  id: string;
  name: string;
}

function App() {
  const [data, setData] = useState<dataType[]>([{ id: "", name: "" }]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setData(res.data.members);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>TEST 하는 중...</h1>
      <div>
        {data.map((member: dataType) => (
          <p key={member.id}>{member.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
```

### (3) 결과 화면

다시 React를 실행하면 결과가 잘 나오는 것을 확인할 수 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/caf8dcec-8f3c-4cfb-8a97-9968266b6640/Untitled.png)
