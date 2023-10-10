아래는 Angular 2+ 프로젝트의 일반적인 파일 및 폴더 구조입니다. 각 파일 폴더에 대한 설명을 작성하겠습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/89cd0718-8ba3-4487-9bcf-2c37d2ddc1c4/933f41f5-e2d3-4990-96db-f3fb4c863775/Untitled.png)

## src 폴더

- **favicon.ico**: 웹사이트 탭에 표시되는 아이콘 파일입니다.
- **index.html**: 애플리케이션의 메인 HTML 파일로, 모든 Angular 컴포넌트가 여기에 로드됩니다.
- **main.ts**: Angular 애플리케이션의 메인 엔트리 포인트로, 앱 모듈을 부트스트랩합니다.

> 참조 [https://velog.io/@4bbada/Angular-구성요소-프로젝트-파일구조](https://velog.io/@4bbada/Angular-%EA%B5%AC%EC%84%B1%EC%9A%94%EC%86%8C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8C%8C%EC%9D%BC%EA%B5%AC%EC%A1%B0)

## app 폴더

- **app.component.ts**: 모든 컴포넌트의 부모 컴포넌트가 됩니다.
  [**app.component.ts**](https://www.notion.so/app-component-ts-57c5631bbfb242eca3c50190da081a27?pvs=21)
- **app.module.ts:** Angular의 새 구성요소를 만들었을 때 이 파일로 가서 구성요소를 등록하는 루트모듈 입니다.(angular는 최소 하나의 모듈을 가지고 있어야 하며, 모듈은 관련있는 구성요소를 묶은 것으로 이루어져있는 컴포넌트의 상위 개념입니다.)
  [app.module.ts](https://www.notion.so/app-module-ts-cf95569ecfcc44029b8df74e3cfda49a?pvs=21)
- ****************************\*\*****************************app-routing.module.ts:****************************\*\***************************** 파일에서 라우팅 설정을 정의합니다.
  [**app-routing.module.ts**](https://www.notion.so/app-routing-module-ts-9f90462efa434f4ba52d14f7ed8f0cd0?pvs=21)
