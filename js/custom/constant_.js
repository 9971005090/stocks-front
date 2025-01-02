"use strict";

/****************** 사이트별로 변경이 필요한 부분은 수정해서 사용. ***************************************/
GBL.DEBUG.USE = true;
GBL.DEEP_COPY.TYPE = "structuredClone";
GBL.INTERVAL.TYPE = "default";
GBL.SESSION_RENEW.IS_USE = true;
GBL.SESSION_RENEW.INTERVAL.TERM = 1000 * 60 * 60 * 2; //두시간;
GBL.ACCOUNT.AFTER_LOGIN_URL = "/info/index";
GBL.MANAGER_PREFIX = "/manager-admin";
GBL.ACCOUNT.IS_AUTH = function(loginMove = false) {
    if(GBL.ACCOUNT.TOKEN == null) {
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
GBL.DESIGN.PAGE_DIV_NAME = "#main-contents";
GBL.DESIGN.PAGE_PARENT_DIV_NAME = "#parent-contents";
GBL.DESIGN.HEADER_NAME = "#page-header";
GBL.DESIGN.SIDE_MENU_NAME = "#side-menu";
GBL.DESIGN.COMMON_DIV_HIDE = [".pop.logout"];
GBL.DESIGN.APP_VER_DIV_NAME = ".login_container";
GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES = ["login", "error", "logout"];
GBL.DESIGN.DEFAULT_CONTROLLER = "info";
GBL.DESIGN.DEFAULT_ACTION = "index";
GBL.DESIGN.APP_EXPLAIN_CONFIRM = false; // 최종 설치 여부..
GBL.DESIGN.SITE_META.NAME = "SEERSTECH FRAME WORK";
GBL.DESIGN.SITE_META.TYPE = "website";
GBL.DESIGN.SITE_META.TITLE = "SEERSTECH FRAME WORK";
GBL.DESIGN.SITE_META.DESCRIPTION =  "seers";
GBL.DESIGN.SITE_META.KEYWORDS = "seers";
GBL.DESIGN.SITE_META.AUTHOR = "seers";
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
GBL.API.FAKE = false; // {}/false: {} 사용, false 비사용
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
    if((location.hostname.indexOf('localhost') !== -1 || location.hostname.indexOf("127.0.0.1") !== -1 || location.hostname.indexOf('staging-') !== -1 || location.hostname.indexOf('seersipm') !== -1) === false) {
        showSiteLoadingLog(` 운영 서버 `, `#1e4df8`, `#ffffff`);
        GBL.API.SERVICE_TYPE = `RELEASE`;
        GBL.API.BASE_URL = "https://www.api.seersthync.com/mobiCAREConsole/API";   // release
        GBL.DEBUG.USE = false;

        // 추가 내용 정리
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        GBL.API.BASE_URL = "https://www.api.seersthync.com/mobiCAREConsole/API";   // test
        GBL.DEBUG.USE = true;

        // 추가 내용 정리
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

GBL.API.SET_BASE_URL();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////