# CalendarProject_ front-end

캘린더앱 개발때 만든 API를 사용, React 프론트앤드 개발 진행중<br />

API : https://github.com/Normaltic/17_CalendarServer

~~~
"start": "webpack-dev-server --hot",
"build": "react-scripts build",
"production": "babel server"
~~~

# Info
Redux ducks 적용
- actiontype, action을 한 파일에 관리
- 연관있는 action별로 파일을 구분

Materialize css 사용 <br />


# Version

## 1.3
sidenav_fixed를 통한 SideMenu 고정 ( 모바일에서 숨김 ) <br />
react-router v3 => v4 버전 업

## 1.2
redux 구조를 ducks로 변경 <br />
로그인, 회원가입, 일정추가 구현 <br />

## 1.1
메인 컴포넌트 ( App, CalendarContainer ) 정의, 배치 <br />
캘린더 구현 ( 각 월에 해당하는 캘린더 출력 ), 버튼을 통한 이동 가능 <br />
redux 상태관리 ( ducks ) <br />
로그인, 회원가입, 일정추가 구현 <br />

## 1.0
기본 라이브러리 설치 <br />
기본 설정 ( scripts, webpack.config.js )
