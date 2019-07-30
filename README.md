# Calendar Project

17년 2학기 캡스톤 디자인 연계로, 기존의 캘린더에 몇 가지 기능을 추가한 캘린더 입니다.  

클라이언트는 React로 만든 반응형 웹과, 안드로이드 WebView를 사용한 하이브리드 앱으로 구성되었으나, 앱 코드는 유실되었습니다.

서버 코드에 대한 자세한 설명은 [여기](https://github.com/Normaltic/calendar-server)에서 확인할 수 있습니다.

## 기능
* 기존 캘린더 기능 ( 일정 추가, 수정, 삭제 )
* 그룹 개념 추가 ( 그룹별 캘린더 뷰 )
* 단체 일정 추가
    - 일정 추가 단계에서 일정 참여자, 그룹을 입력하면 참여자나 그룹 캘린더에도 해당 일정이 추가
* 단체 일정 추가 전 '조율(Vote)' 단계 추가
    - 해당 일정에 대한 참석유무 투표와 댓글을 통해 의사소통을 하는 단계
    - 일정 내용 변경 ( 시간, 장소 수정 후 재 조율 ), 확정 ( 단체 일정 추가 ), 삭제 가능
* 앱에서 일정을 추가할 때, 클립보드 내용을 바탕으로 일정 내용을 자동으로 입력할 수 있는 기능
    - [언어 분석 API](http://aiopen.etri.re.kr/)를 사용하여, 클립보드 내용에서 시간과 장소를 도출

## 기술 스택
### Client
* Android App
* React( + Router v4 )
* Redux - [ducks](https://velopert.com/3358)구조 사용( + redux-actions, redux-thunk )
* webpack
* [MaterializeCSS](https://materializecss.com/)
* other libraries ( immutable, moment..)
### Server
* node.js
* express
* babel
* MongoDB
* other libaraies ( jsonwebtoken, bcryptjs.. )

## Script
~~~
"start": "node ./build/index.js",
"build": "babel server --out-dir build --presets=es2015 && webpack",
"development": "babel-node --presets=es2015 ./server/index.js",
~~~

# Version

## 1.7
기능 최적화, 버그 및 오류 수정  
안드로이드 하이브리드 앱 연동  
-WebView로 웹 화면 출력  
-일정 추가 페이지 진입 시, 언어 분석 API로 최근 첫 클립보드를 분석  
-일정 내용(시간, 장소)이 있으면 팝업창을 띄우고, input에 자동 입력

## 1.6
조율중인 일정(Vote)에 대한 Vote => Schedule(일정으로 변환), Update, Delete 기능 추가  
Schedule의 Update, Delete 추가  
디자인 변경  

## 1.5
Group 페이지 추가  
Group 개설 ( 유저 추가, 그룹명, 그룹설명 작성 ), Group별 Calendar 추가  

## 1.4
Vote 페이지 추가  
Vote 관련 기능 추가 ( Vote 등록, 투표, 코멘트 작성 )  

## 1.3
sidenav_fixed를 통한 SideMenu 고정 ( 모바일에서 숨김 )  
react-router v3 => v4 버전 업

## 1.2
redux 구조를 ducks로 변경  
로그인, 회원가입, 일정추가 구현  

## 1.1
메인 컴포넌트 ( App, CalendarContainer ) 정의, 배치  
캘린더 구현 ( 월 별 캘린더 출력 ), 버튼을 통한 이동 가능  
redux 상태관리 ( ducks구조 )  
로그인, 회원가입, 일정추가 구현

## 1.0
기본 라이브러리 설치 <br />
기본 설정 ( scripts, webpack.config.js )
