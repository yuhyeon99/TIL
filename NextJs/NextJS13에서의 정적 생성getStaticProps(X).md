### 정적 생성이란

- 빌드 시에 HTML을 생성 후 유저들이 요청할 때마다 미리 생성한 HTML 페이지를 재사용해서 보여줌

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/51c0258d-b769-4021-b6dc-9095f92d2b56/Untitled.png)

### 정적 생성을 위한 getStaticProps

```jsx
export async function getStaticProps(context){...}
```

- getStaticProps 함수는 모든 페이지 파일에 추가할 수 있고 페이지에만 추가할 수 있으며 내보내야(export) 합니다.
- Next.js 가 페이지를 사전 생성할 때 사용자를 대신하여 getStaticProps 함수를 실행합니다.
- 이를 통해 이 페이지가 사전 생성되어야 하는 페이지임을 Next.js 알려줍니다.
- Next.js는 기본적으로 모든 페이지를 사전 생성합니다.

<aside>
💡 그러나 13 버전에서는 getStaticProps를 지원하지 않습니다..

</aside>

그래서 fetch함수를 이요해서 아래와 같은 방식으로 코드를 구현했습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/2a9acefd-0e3f-4e3d-afbf-a13fbe169bda/Untitled.png)
