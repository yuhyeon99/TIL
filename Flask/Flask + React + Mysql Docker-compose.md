프로젝트 세팅 과정
프로젝트 생성
프로젝트를 생성 -> vscode로 연다.

가상환경 설정
파일구조 결과
gokuma
|_ myvenv

가상환경 설정
$ python -m venv {가상환경 이름}
가상환경 실행
mac/linux 의 경우 : $ source {가상환경 이름}/bin/activate
window의 경우 : $ source {가상환경 이름}/Scripts/activate
가상환경 종료
$ deactivate
Flask 프로젝트 시작
파일구조 결과
gokuma
|_ myvenv
|_ back(flask project)
.... |_ app.py
.... |_ config.py
.... |_ db_connect.py
.... |_ models.py
.... |_ requirements.txt

flask 설치
$ pip install flask # flask 설치
$ pip install flask-migrate # migration
$ pip install flask-cors # cors
requirements.txt 생성

$ pip freeze > requirements.txt
flask 앱만들기
기본 세팅
app.py

from flask import Flask
from flask_migrate import Migrate
from models import User
from db_connect import db
from api.user import user

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object('config')
    app.register_blueprint(user)
    
    return app

app = create_app()
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def welcome():
    message = "Gokuma is the best!"
    return message

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
config.py

# ORM
SQLALCHEMY_DATABASE_URI='mysql+pymysql://root:password@db/Gokuma'
SQLALCHEMY_TRACK_MODIFICATIONS=False

# etc config
SECRET_KEY=b'\x0c\xe6\xe8\x86\xc5\xec\xfb\xfd\xb7\x9cN=\x10M\x0fg'
JSON_AS_ASCII = False
db_connect.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    db.init_app(app)
models.py

from db_connect import db

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
migrate 명령어
flask db init
flask db migrate
flask db upgrade
flask db downgrade
api 생성
gokuma
|_ myvenv
|_ back(flask project)
.... |_ api
.... .... |_ user.py
.... |_ app.py
.... |_ config.py
.... |_ db_connect.py
.... |_ models.py
.... |_ requirements.txt

api > user.py

from flask import Blueprint, request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

import re

from models import User
from db_connect import db

user = Blueprint("user", __name__, url_prefix="/api/user")


@user.route('/temp')
def testUserApi():
    if request.method == 'GET':
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)
Dockerfile
Dockerfile

FROM python:3

WORKDIR /app

ENV FLASK_APP=app.py

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
React 시작하기
front 폴더 생성
$ npm install -g create-react-app
$ create-react-app front
$ npm run build
$ npm install axios
$ npm install react-router-dom
$ npm install http-proxy-middleware # back api 사용하기 위해서
Dockerfile
Dockerfile

FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY  . .

EXPOSE 80 # azure 배포를 위해서 80포트로 맞춰주기(기본 react는 3000)

CMD ["npm", "start"]
port 80 관련 변경사항
package.json

"scripts": {
    "start": "export PORT=80 && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
proxy 설정
front > src > setupProxy

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	// /api 포함 route에 대해서는 "http://back:5000"을 domain으로 하여 proxy설정
    app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://back:5000',
			changeOrigin: true,
		}))
}
Docker mysql
db 폴더 생성
gokuma
|_ myvenv
|_ db
.... |_ Dockerfile
.... |_ initdb.sql
.... |_ utf8.cnf

Dockerfile
Dockerfile

FROM mysql:8

COPY utf8.cnf /etc/mysql/conf.d/
COPY initdb.sql /docker-entrypoint-initdb.d/
initdb.sql

CREATE DATABASE IF NOT EXISTS Gokuma;
utf8.cnf

[client]
default-character-set = utf8

[mysqld]
init_connect = SET collation_connection = utf8_general_ci
init_connect = SET NAMES utf8
character-set-server = utf8
collation-server = utf8_general_ci
skip-character-set-client-handshake

[mysqldump]
default-character-set = utf8

[mysql]
default-character-set = utf8
Docker-compose
docker-compose.yml

version: '3'

services:
  db:
    build:
      context: ./db
      dockerfile: ./Dockerfile
    environment:
      MYSQL_ROOT_PASSWORD: "password"
      MYSQL_DATABASE: Gokuma
    command:
      - --character-set-server=utf8 
      - --collation-server=utf8_unicode_ci
    restart: always
  back:
    depends_on:
      - db
    build: ./back
    ports: 
      - "5000:5000"
    volumes:
      - ./back:/app
    environment:
      FLASK_ENV: development
  front:
    build: ./front
    ports:
      - "80:80"
    volumes:
      - ./front:/usr/src/app
    depends_on:
      - back
Docker Compose 참고사항
다중 컨테이너 application을 정의하고 공유할 수 있도록 개발된 도구이다. compose에서 서비스를 정의하는 yaml 파일(docker-compose.yml)을 만들고, 단일 명령을 사용하여 모두 실행하거나 모두 종료할 수 있다.

version
파일 규격 버전
services
실행하려는 서비스(컨테이너) 각각의 묶음
service name
db, back, front
각 service 속성
volumes: ${PWD}:${mount를 원하는 디렉토리}의 형태로 볼륨 매핑을 해준다.
build: 자동으로 Dockerfile을 빌드하여 이미지를 생성해준다.
context: Docker file이 있는 경로
dockerfile: Dockerfile 파일명
environment: 컨테이너의 환경변수를 정의해준다.
command: docker-compose를 실행 및 빌드할 때 작성한 명령이 실행된다.
restart: 컨테이너를 재시작한다.
no: 수동으로 재시작한다.
always: 컨테이너를 수동으로 끄기 전까지 항상 재시작한다.
on-failure: 오류가 있을 시에 재시작한다.
depends_on: 서비스가 하나 이상일 때 실행 의존성을 지정할 수 있다. 즉, 서비스간의 종속성 순서대로 서비스를 시작할 수 있다.
port: 호스트OS와 컨테이너의 포트를 바인딩 시켜준다. 형식은 "host:container" 또는 "container" 등으로 사용된다.



로컬에서 프로젝트 실행 방법
GitLab repository 클론
$ git clone https://kdt-gitlab.elice.io/ai_track/class_03/ai_project/team6/gokuma.git
$ cd gokuma
Git bash 창에서 명령어 입력
리엑트 서드파티모듈 설치
$ cd front && npm install && cd ..
docker-compose 실행
$ docker-compose up -d
-d 옵션: 백그라운드 실행
back서버에 접속하기(초기 데이터베이스 설정 목적)
$ docker exec -it gokuma-back-1 /bin/bash
또는

$ docker exec -it gokuma-back-1 //bin//bash
초기 데이터베이스에 값 넣기
# flask db upgrade
# exit
위 명령어가 오류나면 아직 DB의 실행이 덜 끝나서 그러니, 잠시 뒤 한번 더 입력해주시면 됩니다.
위 명령어는 최초 1회만 실행해주시고, 이후에는 자동으로 db/data 폴더 내 자료가 저장됩니다.
웹페이지 접속해서 확인하기
localhost:80 에 접속해서 gokuma가 뜨는지 확인
localhost:5000 에 접속해서 gokuma is the best! 가 뜨는지 확인
서버 종료 하기
$ docker-compose down
서버 삭제 하기
$ docker rmi gokuma_front gokuma_back gokuma_db
서버를 종료해야 삭제가 가능합니다.

기타 명령어
back(flask) 서버 cmd창 들어가기
$ docker exec -it gokuma-back-1 /bin/bash
또는

$ docker exec -it gokuma-back-1 //bin//bash
초기 데이터베이스에 값 넣기
$ flask db upgrade
데이터베이스에 값 삭제하기
$ flask db downgrade
위 명령어 한번 실행에 바로 직전 migration 하나가 취소됩니다.

db 서버 cmd창 들어가기
$ docker exec -it gokuma-db-1 /bin/bash
또는

$ docker exec -it gokuma-db-1 //bin//bash
mysql로 들어가기
mysql -u root -p
password 입력(back > config에서 확인)
배포 하기
$ docker-compose -f docker-compose.prod.yml up -d
개발 서버 도커 이미지가 있다면 상단 서버 삭제하기 명령어를 통해 삭제 후 실행