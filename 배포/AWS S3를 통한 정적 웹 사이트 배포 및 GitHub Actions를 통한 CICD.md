## 도입

이 글을 통해 `AWS IAM, AWS S3, AWS CloudFrount, AWS Route53, ACM(AWS Certification Manager)ㅇ`

을 활용해 **Next.js 프로젝트를 정적 웹 사이트로 배포**하고 `GitHub Actions`를 활용하여 해당 배포를 자동화하는 방법에 대해 배웁니다. 그리고 이 과정에서 `GitHub Actions` 및 배포 방식 중 하나인 **CI/CD**에 관한 기초적인 개념을 익힐 수 있습니다.

## 해야할 것

- `AWS IAM`을 통한 사용자 계정 관리
- `AWS S3`를 통한 정적 웹 사이트 배포
- `AWS CloudFront, AWS Route53, ACM`을 통해 구매한 도메인 및 HTTPS 리다이렉션 적용
- `GitHub Actions`를 활용한 배포 자동화(CI/CD)

### **AWS IAM**

### **개념**

서비스를 만들 때 보통 다수의 인원이 함께 개발에 착수합니다. 이후 배포를 할 때 다양한 클라우드 호스팅 서비스를 사용할 수 있는데, 이때 사용자를 구분하는 것이 보안적인 측면에서 좋습니다.

쉽게 생각하면 프론트엔드 개발만 하는 사람에게 백엔드 관련 서버를 다운시킨다거나 혹은 다른 사람들의 계정을 지울 수 없게 권한을 제약하는 것입니다.

바로 이러한 개별 또는 그룹의 권한 설정을 가능하게 해주는 AWS의 서비스가 바로 **IAM(Identity and Access Management)**입니다.

### **IAM 계정 생성**

AWS를 루트 계정으로 로그인 한 이후 아래 이미지와 같이 **IAM**을 검색하여 **사용자** 탭에 들어갑니다. 이후 **사용자 추가** 버튼을 누릅니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/6c363458-f82e-4624-8d5a-dd05e13a40b0/Untitled.png)

### 사용자 세부 설정

아래 이미지와 같이 본인이 원하는 이름으로 **사용자 이름**을 설정하고 **AWS 자격 증명 유형**의 경우 **액세스 키**와 **암호**를 모두 체크합니다.

**액세스 키**의 경우 **GitHub Actions** 환경 또는 설명에 적혀있는 것처럼 터미널과 같은 CLI(Command Line Interface) 환경에서 AWS 작업을 하기 위해 필요합니다.

**암호**의 경우 해당 사용자 (이 예시에서는 NEXT_FRONTEND_CI_CD ) 가 AWS 웹 페이지에 로그인할 때 암호를 사용할 수 있게 해줍니다. **콘솔 비밀번호**의 경우 무엇을 선택해도 괜찮지만 보안을 위해 **자동 생성된 비밀 번호**로 설정하였습니다. 처음 로그인할 때는 이를 통해 자동으로 생성된 비밀번호를 입력해서 접속해야 합니다. 이후 **비밀번호 재설정 필요 옵션**을 체크하였기 때문에 사용자 (이 예시에서는 NEXT_FRONTEND_CI_CD ) 가  첫 로그인 이후 직접 본인이 원하는 비밀번호로 수정할 수 있습니다. 이에 관해서는 아래에서 더 자세히 알 수 있습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/b35ebd4b-fb78-48f9-88b3-096cd8f50fda/Untitled.png)

### 권한 설정

이제 해당 사용자가 어떤 AWS 서비스를 이용할 수 있는지 권한을 부여해줍니다. 우리의 경우 앞서 이야기했던 것처럼 **S3**, **Route 53**, **CloudFront**, **Certification Manager**를 이용하기 때문에 아래 이미지와 같이 각각의 정책을 정책 필터에서 검색하여 체크해줍니다. 이때 각각의 서비스에 관해 FullAccess 권한이 아닌 더 제한적인 권한을 부여할 수 있지만 원활한 진행을 위해 FullAccess 로 권한을 부여합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/8acb7686-be71-43fe-88d6-e83ba737f0ce/Untitled.png)

태그까지 마무리를 지었다면 아래 이미지와 같이 사용자가 생성된 것을 확인할 수 있습니다. 이때 권한 요약 부분에 존재해야 할 권한은 아래와 같습니다.

- AmazonS3FullAccess
- AmazonRoute53FullAccess
- AmazonCloudFrontFullAccess
- IAMUserChangePassword
- AWSCertificateManagerFullAccess

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/934d25f7-de4e-4542-82cd-b7d049fbb666/Untitled.png)

그 뒤에 **사용자 만들기** 버튼을 누르고나면 아래 이미지와 같이 **액세스 키**와 관련된 CSV 파일을 다운로드 받을 수 있는 페이지가 나타납니다.

<aside>
💡 **위험**

이때 꼭 해당 CSV 파일을 다운로드 받고 외부에 유출하거나 삭제해서는 안 됩니다.

만약 해당 파일을 잃어버리거나, 파일이 유출되었을 경우 액세스 키를 삭제하고 재생성해야 합니다.

</aside>

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/4f214483-1f1d-4183-8cdf-184021ffd162/Untitled.png)

다운로드 받은 CSV 파일을 열어보면 아래 이미지와 같습니다. 해당 파일에서 기억해야 할 부분은 아래와 같습니다.

- **Password**: IAM 계정으로 로그인할 때 필요한, 자동으로 생성된 비밀번호입니다.
- **Access key ID**: 추후 GitHub Actions를 활용하여 AWS 서비스에 접근 및 해당 서비스를 사용할 때 필요한 액세스 키입니다.(X)
- **Secret access key**: 추후 GitHub Actions를 활용하여 AWS 서비스에 접근 및 해당 서비스를 사용할 때 필요한 시크릿 키입니다.(X)
- **Console login link**: 해당 IAM 계정으로 로그인할 때 사용되는 URL입니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/f3f1d2e4-9058-41dd-853a-bafce920add4/Untitled.png)

### **액세스 키 재발급 또는 자동 생성된 비밀번호 재생성**

만약 액세스 키를 잃어버리거나 해당 키가 외부에 유출되었을 때는 키를 비활성화하고 재생성해야 합니다. 또는 자동으로 생성했던 IAM 계정의 비밀번호를 잃어버려 다시 생성해야 하는 경우도 재생성해야 합니다. 이 과정이 필요 없다면 건너 뛰셔도 좋습니다.

액세스 키 또는 IAM 계정 비밀번호를 재생성하기 위해서는 루트 사용자로 로그인한 뒤 아래 이미지와 같이 **IAM**으로 가서 생성했던 사용자를 클릭합니다,

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/eaeab29e-4509-4077-b63a-2c7c45b00910/Untitled.png)

이제 아래 이미지와 같이 **보안 자격 증명** 탭으로 이동합니다. 만약 비밀번호를 재생성해야 하는 경우 **콘솔 비밀번호**를 활용하고, 액세스 키를 재생성해야 하는 경우 기존에 존재하던 액세스 키를 **비활성화**한 뒤 **액세스 키 만들기**를 통해 새로 생성합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/1ba0dc2b-f5c7-4e67-8ce1-39acb3450db2/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/5a5f2ebd-cf7b-4c19-8480-aeed7b502241/Untitled.png)

위 항목을 목적에 맞게 선택한 후 생성버튼을 눌러 액세스 키를 생성합니다

아래 화면에서 액세스 키를 확인할 수 있습니다. .csv파일을 다운로드하여 저장해둡시다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/ed3fa609-a193-48c3-82a6-eb6616fb5a85/Untitled.png)

### **IAM 계정 로그인**

IAM 계정으로 로그인하기 위해서는 아래 이미지와 같이 **계정 ID**, **계정 별칭** 또는 **해당 계정으로 로그인할 수 있는 URL**을 사용해야 합니다. 이번에는 **계정 별칭**을 한 번 사용해보겠습니다. 간단하게 본인이 원하는 별칭으로 생성하면 됩니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/ae1935fb-ba2f-4bde-98f9-91a70789173f/Untitled.png)

이제 루트 계정에서 로그아웃한 뒤 아래 이미지와 같이 기존 AWS 로그인 화면으로 이동합니다. **IAM 사용자**를 선택하고 본인이 만든 **계정 별칭**을 입력합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/de7c40f9-2f53-4cd0-a0db-0a53ad27768f/Untitled.png)

아래 이미지와 같이 **계정 별칭**, **사용자 이름**, 자동으로 생성된 비밀번호를 **암호**에 입력하고 로그인합니다

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/882a8f8d-d9a6-4960-a9c6-42c71c259d8a/Untitled.png)

### **기타**

IAM과 관련해서는 **그룹** 및 **MFA**와 같은 개념이 추가적으로 존재합니다. 관련하여 궁금한 분들은 직접 검색하길 추천드립니다. **개별 사용자**로 IAM 계정을 만드는 경우는 그룹으로 묶이는 경우보다 덜 자주 발생합니다.

### **AWS Route53**

### **개념**

Route53은 도메인 구매 및 관리를 위한 서비스입니다. 이 글에서는 도메인 구매를 [호스팅케이알(HK)](https://www.hosting.kr/)에서 진행하였으며 Route53에서는 다른 AWS 서비스와의 연동을 위한 도메인 관리 기능만 사용합니다.

### **호스팅 생성**

아래 이미지와 같이 **Route53**을 검색하여 **호스팅 영역**으로 이동해 아래 이미지와 같이 새로운 **호스팅 영역**을 생성합니다. 이때 **도메인 이름**에는 본인이 구매한 도메인을 입력하고 **유형**은 **퍼블릭 호스팅 영역**을 선택하여 생성합니다. **설명** 및 **태그**의 경우 선택 사항입니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/6633e91c-49e0-4be3-9276-c04ee9447cb3/Untitled.png)

### **네임서버 등록**

생성을 마치면 아래 이미지와 같이 **레코드**를 확인할 수 있습니다. 여기서 중요한 건 네임서버(Name Server)를 의미하는 **NS**입니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/dcf6d25d-bd7e-42f6-aae6-fdc3a301f67a/Untitled.png)

이제 해당 **NS** 값 네 개를 복사하여 아래 이미지와 같이 본인이 구매한 도메인 업체에 접속하여 네임서버를 입력합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/926facae-2497-46d4-9c7c-642c34fd4d88/Untitled.png)

### **ACM**

### **개념**

HTTP보다 보안이 높은 HTTPS를 사용하기 위해서는 **SSL/TLS** 인증서를 발급 받아야합니다.

**ACM(AWs Cerficate Manager)은 이런 인증서를 발급해주는 서비스**입니다.

### **인증서 생성**

아래 이미지와 같이 Certificate Manager를 검색하여 이동한 뒤 **인증서 프로비저닝**을 선택합니다.

<aside>
💡 CloudFront에서 적용 가능한 인증서의 지역은 us-east-1 이어야하기 때문에 먼저 우측 상단에서 해당 지역( us-east-1 )이 맞는지 확인한 뒤 아닐 경우 선택하고나서 인증서를 생성합니다.

</aside>

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/11a053ba-ff11-4f51-ae84-bbaa44402e59/Untitled.png)

다음으로 아래 이미지와 같이 **공인 인증서 요청**을 선택합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/59823cca-35fb-4e73-995e-ad5e22efb00d/Untitled.png)

해당 인증서를 적용할 도메인을 입력합니다. 아래 이미지와 같이 앞서 Route53 서비스에 입력했던 도메인( \***\*nextcourse.monster\*\*** )을 입력합니다.

다음으로 아래 이미지와 같이 검증 방법을 **DNS 검증**을 선택합니다. 이를 통해 앞서 Route53에 등록한 도메인을 통해 검증 받을 수 있습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/c96b797e-8672-47f5-b8ac-12dd0b65ae78/Untitled.png)

다음으로 **인증서 ID를 클릭하면** 아래 이미지와 같이 **CNAME**을 기록할 수 있게 **이름**과 **값**을 알려줍니다. Route 53에서 레코드 생성을 눌러 직접 입력하는 대신 AWS에서 대신 간편하게 해당 도메인에 **CNAME**을 입력할 수 있게 합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/aecd220f-34d2-44a1-bcea-6a4cd4378327/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/19df3bfd-5c2c-4c93-bcc7-87353392939d/Untitled.png)

이제 기다리면 아래 이미지와 같이 **상태**가 **발급 완료**가 된 것을 확인할 수 있습니다. 이제부터 정삭적으로 해당 도메인에서 HTTPS를 사용할 수 있게 되었습니다.

### **AWS S3**

### **개념**

AWS S3는 파일을 저장할 수 있는 파일 스토리지(File Storage) 중 하나입니다.

S3의 가장 큰 특징 중 하나는 다른 AWS 서비스에서도 S3에 업로드 된 파일에 바로 접근할 수 있다는 것입니다.

파일 스토리지라는 이름을 통해 알 수 있듯 S3에는 보통 웹 애플리케이션에서 사용되는 이미지 등이 업로드 됩니다.

이번에는 S3를 통해 정적 웹 사이트를 호스팅해보겠습니다.

### **버킷 생성**

**S3**를 검색하여 아래 이미지와 같이 **버킷**으로 이동한 다음 **버킷 만들기** 버튼을 클릭합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/28e1568b-9562-445b-afa1-15398852aa06/Untitled.png)

이제 아래 이미지와 같이 생성할 **버킷 이름**을 입력하고 맨 아래 **버킷 만들기** 버튼을 클릭하여 버킷을 생성합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/46316325-ecf4-4c5e-992c-d34156c03623/Untitled.png)

이제 아래 이미지와 같이 만든 **버킷** (이 예시에서는 **nextjs-course**) 으로 이동하여 **객체** 속성에서 **업로드** 버튼을 클릭하여 배포할 파일 및 폴더를 업로드합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/21a694d0-1a61-4b19-b3ca-41da0d849bf3/Untitled.png)

### NextJS에서 npm run build를 통해 out폴더 생성

<aside>
💡 npm run build를 해주기 전에
next.config.js에서 아래와 같이 output : “export” 속성과 속성값을 추가해줘야
정적 웹 사이트 배포를 위한 out폴더가 생성됩니다.

</aside>

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/bfb6816a-2375-4aa7-95c9-6b3f484757a4/Untitled.png)

### **빌드 파일 및 폴더 업로드**

이제 아래 이미지와 같이 **파일 추가** 및 **폴더 추가** 버튼을 눌러 .out 폴더 내에 있는 프로젝트의 빌드 파일을 업로드합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/ccbe9c00-7cc7-45a0-99f9-fe4a6c05c9c7/Untitled.png)

<aside>
💡 **주의**

.out 폴더 내에 있는 파일 및 폴더를 버킷에 정상적으로 업로드 했으면 index.html 이 해당 버킷의 루트 디렉토리에 존재합니다.

만약 index.html 파일이 루트 디렉토리에 존재하지 않을 경우 S3는 해당 파일을 읽을 수 없습니다.

</aside>

그리고 아래 이미지와 같이 해당 탭 맨 아래 존재하는 **정적 웹 사이트 호스팅** 부분에서 **편집** 버튼을 클릭합니다.

아래 이미지와 같이 **정적 웹 사이트 호스팅**을 **활성화**하고 **호스팅 유형**을 **정적 웹 사이트 호스팅**으로 설정합니다.

**인덱스 문서**의 경우 루트 경로( / )로 접근했을 때 보여질 문서를 의미합니다. **오류 문서**의 경우 오류가 발생했을 때 보여질 문서로 이 예시에서는 루트 경로로 리다이렉션 되게 하기 위해 **인덱스 문서** 및 **오류 문서** 모두 index.html 로 설정합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/41cb160b-3cf4-46df-998d-c478a7bf18d7/Untitled.png)

정적 웹 사이트 호스팅을 완료하면 아래 이미지와 같이 **버킷 웹 사이트 엔드포인트**가 생성된 것을 확인할 수 있습니다. 아래 URL로 한 번 접속해봅시다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/2d852c22-e419-4f6e-a583-3a74fe822d36/Untitled.png)

그러면 이제 아래 이미지와 같이 **403 Forbidden** 오류를 반환한 것을 확인할 수 있습니다. 반환된 오류의 메세지를 확인해보면 **AccessDenied**라고 되어 있습니다. 이는 퍼블릭 액세스 권한을 막아놨기 때문입니다. 따라서 이제 버킷의 권한을 수정해줘야 합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/7b3e1dea-4162-4e5d-980f-d113db854cfb/Untitled.png)

이제 해당 버킷의 **권한** 탭으로 넘어와 **퍼블릭 액세스 차단(버킷 설정)** 부분을 **편집** 버튼을 눌러 수정합니다.

아래 이미지와 같이 외부에서 조회할 수 있게, 다시 말해 어느 곳에서나 정적 웹 사이트를 열람할 수 있게 **모든 퍼블릭 액세스 차단**을 **비활성**합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/c5d58ac0-4656-4c68-8a33-8e84930568a5/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/85043b47-0bad-410c-a1b2-bf773cd81de4/Untitled.png)

이제 아래 이미지와 같이 조금 내려와 **버킷 정책** 부분에서 **편집**을 눌러 정책을 설정해줍니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/da3b6464-c768-4604-82e1-7fa663842e3d/Untitled.png)

본인이 직접 정책을 입력할 수 있지만 조금 더 간단하게 설정하기 위해 아래 이미지와 같이 **정책 생성기** 버튼을 눌러 도움을 받습니다. 이때 **버킷 ARN** (이 예시에서는 arn:aws:s3:::nextjs-course ) 을 복사합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/5b507e92-87dc-405e-9ba4-579bef40d8d4/Untitled.png)

이제 아래 이미지와 같이 정책을 선택합니다. 하나씩 정리하면 아래와 같습니다.

- **Select Type of Policy**: 정책 유형을 의미합니다. **S3 Bucket Policy**를 선택합니다.
- **Effect**: 정책의 유형을 허용(**Allow**) 또는 거부(**Deny**)로 선택할 수 있습니다. 허용(**Allow**)을 선택합니다.
- **Principal**: 특정 부분에만 권한을 부여할 수 있습니다. \*\*\*\* 를 입력하여 모든 부분에 권한을 허용합니다.
- **Actions**: 어떤 권한을 부여할 것인지 선택합니다. 정적 웹 사이트 열람, 다시 말해 조회( GET )만 허용하는 것이기 때문에 **GetObject** 만을 선택합니다.

이제 아래 이미지와 같이 **Amazon Resource Name (ARN)**에 아까 복사한 **버킷 ARN** (이 예시에서는 arn:aws:s3:::nextjs-course  ) 을 입력하고 **Add Statement** 버튼을 클릭합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/341229dd-f1da-43bf-9eb6-df8f74c5e6cd/Untitled.png)

이제 아래 이미지와 같이 정리된 정책을 확인하고 **Generate Policy** 버튼을 눌러 정책을 생성하고 이를 복사합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/61913393-684c-402b-9bbf-3ca2670d1a8e/Untitled.png)

다시 **버킷 정책 편집**으로 돌아와 아래 이미지와 같이 앞서 복사한 정책을 붙여넣습니다.

이때 유의할 점은 Resource 부분의 끝에 /\* 를 추가해야 합니다. 이는 해당 버킷 (이 예시에서는 arn:aws:s3:::nextjs-course ) 에 업로드 된 모든 객체에 대해 해당 정책을 적용하겠다는 의미입니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/2f1fcbf0-3e67-498a-899b-0e8e5759105b/Untitled.png)

이제 다시 **버킷 웹 사이트 엔드포인트**에 접근하면 아래 이미지와 같이 정상적으로 정적 웹 사이트가 배포된 것을 확인할 수 있습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/ae098ee2-820a-40b8-a80f-961610b6b0ee/6371d5a6-85be-44d5-b26c-856b651ddc02/Untitled.png)
