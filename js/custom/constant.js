"use strict";

/****************** 사이트별로 변경이 필요한 부분은 수정해서 사용. ***************************************/
GBL.DEBUG.USE = true;
GBL.DEEP_COPY.TYPE = "structuredClone";
GBL.INTERVAL.TYPE = "default";
GBL.SESSION_RENEW.IS_USE = true;
GBL.SESSION_RENEW.INTERVAL.TERM = 1000 * 60 * 60 * 2; //두시간;
GBL.ACCOUNT.AFTER_LOGIN_URL = "/stocks/index";
GBL.MANAGER_PREFIX = "";
GBL.ON_PREMISE = false;
GBL.ACCOUNT.IS_AUTH = function(loginMove = false) {
    if(GBL.ACCOUNT.TOKEN === null) {
        if(typeof CookieHelper.get('accessToken') != "undefined") {
            GBL.ACCOUNT.REFRESH_SET();
            GBL.ACCOUNT.CHECK.RUN();
            return true;
        }
    }
    else {
        GBL.ACCOUNT.CHECK.RUN();
        return true;
    }
    GBL.ACCOUNT.CHECK.INTERVAL.INIT();
    if(loginMove === true) {
        Seers.Loader.goMove("seers", "login");
    }
    return false;
}
GBL.ACCOUNT.IS_AUTH_CHECK = function() {
    GBL.ACCOUNT.CHECK.INTERVAL.OBJ = setInterval(function() {
        if(GBL.ACCOUNT.IS_AUTH() === false) {
            Seers.Loader.goMove("seers", "login");
            window.clearInterval(GBL.ACCOUNT.CHECK.INTERVAL.OBJ);
            GBL.ACCOUNT.CHECK.INTERVAL.OBJ = null;
        }
    }, GBL.ACCOUNT.CHECK.INTERVAL.TERM);
}
GBL.ACCOUNT.SET = function(response = null) {
    if(response == null) {
        GBL.ACCOUNT.INFO = null;
        GBL.ACCOUNT.TOKEN = null;
        GBL.ACCOUNT.CHECK.INTERVAL.INIT();
        CookieHelper.remove('userAccount');
        CookieHelper.remove('accessToken');
    }
    else {
        GBL.ACCOUNT.INFO = response.userAccount;
        GBL.ACCOUNT.INFO.isZaid = false;
        if(GBL.ACCOUNT.INFO.id.indexOf("zaid") !== -1) {
            GBL.ACCOUNT.INFO.isZaid = true;
        }
        GBL.ACCOUNT.TOKEN = response.accessToken;

        CookieHelper.set('userAccount', JSON.stringify(response.userAccount), null);
        CookieHelper.set('accessToken', response.accessToken, null);

    }
}
GBL.ACCOUNT.REFRESH_SET = function() {
    if(CookieHelper.get('accessToken') != undefined && CookieHelper.get('userAccount') != undefined) {
        GBL.ACCOUNT.INFO = JSON.parse(CookieHelper.get('userAccount'));
        GBL.ACCOUNT.TOKEN = CookieHelper.get('accessToken');
    }
}
GBL.ACCOUNT.CHECK.RUN = function() {
    if(GBL.ACCOUNT.CHECK.INTERVAL.OBJ == null) {
        GBL.ACCOUNT.IS_AUTH_CHECK();
    }
}
GBL.DESIGN.THEME = "default";
GBL.DESIGN.PAGE_DIV_NAME = "#main-cont";
GBL.DESIGN.PAGE_PARENT_DIV_NAME = "#parent-contents";
GBL.DESIGN.HEADER_NAME = "#page-header";
GBL.DESIGN.SIDE_MENU_NAME = "#side-menu";
GBL.DESIGN.COMMON_DIV_HIDE = [".pop.logout"];
GBL.DESIGN.APP_VER_DIV_NAME = ".login_container";
GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES = ["login", "error", "logout"];
GBL.DESIGN.DEFAULT_CONTROLLER = "stocks";
GBL.DESIGN.DEFAULT_ACTION = "index";
GBL.DESIGN.APP_EXPLAIN_CONFIRM = true; // 최종 설치 여부..
GBL.DESIGN.SITE_META.NAME = "STOCKS";
GBL.DESIGN.SITE_META.TYPE = "website";
GBL.DESIGN.SITE_META.TITLE = "STOCKS";
GBL.DESIGN.SITE_META.DESCRIPTION =  "stocks";
GBL.DESIGN.SITE_META.KEYWORDS = "stocks";
GBL.DESIGN.SITE_META.AUTHOR = "stocks";
GBL.DESIGN.SITE_META.IMAGE = null;
GBL.DESIGN.SITE_META.IMAGE_WIDTH = null;
GBL.DESIGN.SITE_META.IMAGE_HEIGHT = null;
GBL.DESIGN.SITE_META.URL = null;
GBL.DESIGN.SELECT_MENU = function(controller, addParams = {}) {
    // 아래 주석 참고하여 직접 구현
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // let selector = null;
    // if(addParams.hasOwnProperty("selector") === true) {
    //     selector = addParams.selector;
    // }
    // else {
    //     selector = `${GBL.DESIGN.SIDE_MENU_NAME} > li`;
    // }
    // if(selector !== null) {
    //     $(`${selector}`).each(
    //         function(index, item) {
    //             let obj = $(item);
    //             let objInfo = obj.data("info");
    //             let objInfoDatas = objInfo.datas;
    //             if(objInfoDatas.indexOf(controller) != -1) {
    //                 obj.removeClass('off');
    //                 obj.removeClass('on').addClass('on');
    //             }
    //             else {
    //                 obj.removeClass('on');
    //                 obj.removeClass('off').addClass('off');
    //             }
    //         }
    //     );
    // }
    // 직접 구현
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
GBL.PAGING.DATA.PAGE.PER_COUNT = 10;
GBL.PAGING.DATA.PAGE.PER_PAGE = 10;
GBL.API.FAKE = {}; // {}/false: {} 사용, false 비사용
GBL.API.URL = {
    ACCOUNT: {
        LOGIN: "/Account/Login",
        LOGOUT: "/Account/Logout"
    },

    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
GBL.API.RESPONSE.CODE = {
    SUCCESS: 0x0000,
    INVALID_PARAMETER: 0x0001,
    DATABASE_ERROR: 0x0002,
    ACCOUNT_INFO_FAIL: 0x0003,
    AUTHORITY_ERROR: 0x0004,
    INCORRECT_DATA: 0x0005,
    SESSION_CLOSED: 0x00F1,
};
GBL.API.SET_BASE_URL = function() {
    if((location.hostname.indexOf('localhost') !== -1 || location.hostname.indexOf("127.0.0.1") !== -1 || location.hostname.indexOf('staging-') !== -1 || location.hostname.indexOf('seersipm') !== -1 || location.hostname.indexOf('dev') !== -1) === false) {
        showSiteLoadingLog(` 운영 서버 `, `#1e4df8`, `#ffffff`);
        GBL.API.SERVICE_TYPE = `RELEASE`;
        // GBL.API.BASE_URL = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
        GBL.API.BASE_URL = "https://stocks-owcr.onrender.com";   // release
        GBL.DEBUG.USE = false;

        // 추가 내용 정리
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (location.hostname.indexOf("10.") !== -1 || location.hostname.indexOf("192.") !== -1 || isOnPremisesDomain() === true) {
            // 내부망에 https 구축을 해달라고 할때, 같은 도메인을 쓴다고 가정 해서 처리
            // 온프라미스에서 포트번호를 달리해서 사용하는 경우도 있어서
            // origin 는 프로토콜 + 호스트이름 + 포트
            if (location.origin.indexOf(`https`) !== -1) {
                GBL.API.BASE_URL = `https://${location.hostname}:8443/mobiCAREConsole/API`
            }
            else {
                GBL.API.BASE_URL = `http://${location.hostname}:8080/mobiCAREConsole/API`
            }
            if (isOnPremisesDomain() === true) {
                setOnPremisesApiDomain();
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    else if(location.hostname.indexOf('staging-') !== -1) {
        showSiteLoadingLog(` 스테이징 서버 `, `#1e4df8`, `#ffffff`);
        GBL.API.SERVICE_TYPE = `STAGING`;
        GBL.API.BASE_URL = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
        GBL.DEBUG.USE = true;

        // 추가 내용 정리
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    else {
        showSiteLoadingLog(` 테스트 서버 `, `#1e4df8`, `#ffffff`);
        GBL.API.SERVICE_TYPE = `DEVELOPMENT`;
        // GBL.API.BASE_URL = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
        // GBL.API.BASE_URL = "https://www.dev-api.seersthync.com/mobiCAREConsole/API";   // test
        // GBL.API.BASE_URL = "http://localhost:22222";   // test
        GBL.API.BASE_URL = "https://stocks-owcr.onrender.com";   // test
        GBL.DEBUG.USE = true;

        // 추가 내용 정리
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 서비스 on-premise로 설치 후 localhost로 확인시 사용
        if (GBL.ON_PREMISE === true) {
            GBL.API.BASE_URL = `localhost:8080/mobiCAREConsole/API`;
            GBL.DEBUG.USE = false;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    // 추가 내용 정리
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

// 아래 영역에 custom 함수 재정의, 전역 변수 코드 작성
// 예시
// CUSTOM.CHART = {
//     IS_USE: true
// }
// GBL.API.FAKE[GBL.API.URL.ACCOUNT.LOGIN] = true; // true/false: true로 설정시 fake_api_json_.js를 init에 넣어 로딩한다. 이후 필요없을때 주석처리 또는 삭제
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 추가 소스는 아래에 > SET_BASE_URL() 항상 마지막 줄에 위치해야 함

// 대시보드 도메인인지 확인하여, 기본 링크 변경
const isOnPremisesDomain = function() {
    if (location.hostname.indexOf('.mex-us.kr') !== -1) {
        return true;
    }
    return false;
}
// on-premises 가정
const setOnPremisesApiDomain = function() {
    if (location.origin.indexOf(`https`) !== -1) {
        GBL.API.BASE_URL = `https://192.168.0.1:8443/mobiCAREConsole/API`
    }
    else {
        GBL.API.BASE_URL = `http://192.168.0.1:8080/mobiCAREConsole/API`
    }
}
GBL.SESSION_FIRST_CHECK = true; // false : 인증, true : 비인증
GBL.API.SET_BASE_URL();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////