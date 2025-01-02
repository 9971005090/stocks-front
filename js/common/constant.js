"use strict";

// [지원브라우저]
// Chrome 61 이상
// Firefox 54 이상 (behind the dom.moduleScripts.enabled setting in about:config.)
// Edge 16 이상
// Safari 10.1 이상

let GBL = {
    DEBUG: {
        USE: true
    },
    DEEP_COPY: {
        TYPE: "structuredClone" // stringify, cloneDeep, structuredClone
    },
    INTERVAL: {
        TYPE: "default" // default(interval), timeout
    },
    SESSION_RENEW: {
        IS_USE: false,
        INTERVAL: {
            START: false,
            TERM: 1000
        },
        OBJ: null,
        API: {
            URL: null
        }
    },
    MANAGER_PREFIX: "/manager-admin",
    ON_PREMISE: false,
    SESSION_FIRST_CHECK: false,
    DESIGN: {
        SITE_META: {
            NAME: null,
            TYPE: null,
            TITLE: null,
            DESCRIPTION: null,
            KEYWORDS: null,
            AUTHOR: null,
            IMAGE: null,
            IMAGE_WIDTH: null,
            IMAGE_HEIGHT: null,
            URL: null
        },
        THEME: "default",
        MAIN_DIV_NAME: "#app",
        HEADER_NAME: "#header",
        FOOTER_NAME: "#footer",
        SIDE_MENU_NAME: "#side-menu",
        PAGE_DIV_NAME: "#main-contents",
        PAGE_PARENT_DIV_NAME: "#page-wrapper",
        COMMON_DIV_HIDE: [], //".pop.logout" 계정정보 팝업 div(다른 곳을 클릭하면 닫혀야 하는 것들)
        APP_VER_DIV_NAME: "#wrap",
        PAGING_DIV_NAME: "paging",
        NO_DATA_MSG: "등록된 데이터가 없습니다.",
        LAYOUT: {
            IGNORE_CONTROLLER_NAMES: [],
            IS_USE: function(controllerName) {
                for(let i = 0; i < GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES.length; i++) {
                    if(GBL.DESIGN.LAYOUT.IGNORE_CONTROLLER_NAMES[i] == controllerName) {
                        return false;
                    }
                }
                return true;
            },
            // LOADING_DONE: false, // interval로 로딩 여부를 확인하지 않고, async promise로 처리함
            EXIST: false,
            CLEAR: function() {
                $(`${GBL.DESIGN.MAIN_DIV_NAME}`).html("");
                GBL.DESIGN.LAYOUT.EXIST = false;
            },
        },
        // CUSTOM_ASSET_LOADING_DONE: false,
        SET_SITE_NAME: function() {
            document.title = GBL.DESIGN.SITE_META.NAME;
        },
        SET_SITE_META_ALL: function() {
            document.querySelector('meta[name="name"]').setAttribute("content", GBL.DESIGN.SITE_META.NAME);
            document.querySelector('meta[name="type"]').setAttribute("content", GBL.DESIGN.SITE_META.TYPE);
            document.querySelector('meta[name="title"]').setAttribute("content", GBL.DESIGN.SITE_META.TITLE);
            document.querySelector('meta[name="description"]').setAttribute("content", GBL.DESIGN.SITE_META.DESCRIPTION);
            document.querySelector('meta[name="keywords"]').setAttribute("content", GBL.DESIGN.SITE_META.KEYWORDS);
            document.querySelector('meta[name="author"]').setAttribute("content", GBL.DESIGN.SITE_META.AUTHOR);

            document.querySelector('meta[property="og:name"]').setAttribute("content", GBL.DESIGN.SITE_META.NAME);
            document.querySelector('meta[property="og:type"]').setAttribute("content", GBL.DESIGN.SITE_META.TYPE);
            document.querySelector('meta[property="og:title"]').setAttribute("content", GBL.DESIGN.SITE_META.TITLE);
            document.querySelector('meta[property="og:description"]').setAttribute("content", GBL.DESIGN.SITE_META.DESCRIPTION);
            document.querySelector('meta[property="og:keywords"]').setAttribute("content", GBL.DESIGN.SITE_META.KEYWORDS);
            document.querySelector('meta[property="og:author"]').setAttribute("content", GBL.DESIGN.SITE_META.AUTHOR);
            document.querySelector('meta[property="og:image"]').setAttribute("content", GBL.DESIGN.SITE_META.IMAGE);
            document.querySelector('meta[property="og:image:width"]').setAttribute("content", GBL.DESIGN.SITE_META.IMAGE_WIDTH);
            document.querySelector('meta[property="og:image:height"]').setAttribute("content", GBL.DESIGN.SITE_META.IMAGE_HEIGHT);
            document.querySelector('meta[property="og:url"]').setAttribute("content", GBL.DESIGN.SITE_META.URL);
        },
        SELECT_MENU: function() {},
        SET_PAGE_PARENT_DIV_HTML: function() {},
        DEFAULT_CONTROLLER: null,
        DEFAULT_ACTION: null,
        APP_EXPLAIN_CONFIRM: false
    },
    SITE_MENU: {
        URL: null,
        CHOICE_CONTROLLER: null
    },
    MODULE: {
        OBJ: {},
        IS_LOADING: {},
        IS_PRE_LOADING: {},
        SUPER: null
    },
    CONTROLLER: {
        OBJ: {},
        IS_PRE_LOADING: {},
        SUPER: null
    },
    WINDOW_HISTORY_STATE: {
        DEPTH: 5,
        URL: [],
        IS_CHANGE: function(force = false) {
            if(GBL.WINDOW_HISTORY_STATE.URL.length > 0) {
                let back = null;
                if (GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
                    back = GBL.WINDOW_HISTORY_STATE.URL[1].replace(GBL.MANAGER_PREFIX, ``).split("/")[1];
                }
                let current = GBL.WINDOW_HISTORY_STATE.URL[0].replace(GBL.MANAGER_PREFIX, ``).split("/")[1];
                if (force === true) {
                    back = GBL.WINDOW_HISTORY_STATE.URL[0].replace(GBL.MANAGER_PREFIX, ``).split("/")[1];
                    current = location.pathname.replace(GBL.MANAGER_PREFIX, ``).split("/")[1];
                }
                if(back != current) {
                    return true;
                }
            }
            return false;
        },
        IS_SUB_CHANGE: function() {
            if(GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
                let back = GBL.WINDOW_HISTORY_STATE.URL[1].replace(GBL.MANAGER_PREFIX, ``).split("/");
                let current = GBL.WINDOW_HISTORY_STATE.URL[0].replace(GBL.MANAGER_PREFIX, ``).split("/");
                if(back[1] == current[1]) {
                    if(back[2] != current[2]) {
                        return true;
                    }
                }
            }
            return false;
        },
        IS_FULL_CHANGE: function() {
            if(GBL.WINDOW_HISTORY_STATE.URL.length > 1) {
                let back = GBL.WINDOW_HISTORY_STATE.URL[1].replace(GBL.MANAGER_PREFIX, ``);
                let current = GBL.WINDOW_HISTORY_STATE.URL[0].replace(GBL.MANAGER_PREFIX, ``);
                if(back != current) {
                    return true;
                }
            }
            return false;
        },
        GET_NOW_CONTROLLER: function(pt = 0, urlParsing = false) {
            let checkUrl = url.getUrlByPoint(pt, urlParsing).replace(GBL.MANAGER_PREFIX, ``);
            if(checkUrl !== null) {
                let tempSplit = checkUrl.split("/");
                if(tempSplit.length > 1) {
                    return checkUrl.split("/")[1];
                }
                return GBL.DESIGN.DEFAULT_CONTROLLER;
            }
            return null;
        },
        GET_NOW_ACTION: function(pt = 0, urlParsing = false) {
            let checkUrl = url.getUrlByPoint(pt, urlParsing).replace(GBL.MANAGER_PREFIX, ``);
            if(checkUrl !== null) {
                let tempSplit = checkUrl.split("/");
                if(tempSplit.length > 2) {
                    return tempSplit[2].split("?")[0];
                }
                return "index";
            }
            return null;
        },
        GET_BACK_ACTION: function(pt = 1) {
            if(GBL.WINDOW_HISTORY_STATE.URL.length > pt) {
                let back = GBL.WINDOW_HISTORY_STATE.URL[pt].replace(GBL.MANAGER_PREFIX, ``);
                if(back !== null) {
                    let tempSplit = back.split("/");
                    if(tempSplit.length > 2) {
                        return tempSplit[2].split("?")[0];
                    }
                    return "index";
                }
            }
            return null;
        },
        GO_BACK: function(backPt = 0, forceAction = null) { // 뒤로 1,2,3,4(최대 뒤로 4개까지)
            if (GBL.WINDOW_HISTORY_STATE.URL.length > 1 && GBL.WINDOW_HISTORY_STATE.URL[backPt] !== "undefined") {
                etc.move(GBL.WINDOW_HISTORY_STATE.URL[backPt].replace(GBL.MANAGER_PREFIX, ``));
            }
            else {
                etc.move(forceAction.replace(GBL.MANAGER_PREFIX, ``));
            }
        }
    },
    ACCOUNT: {
        INFO: null,
        TOKEN: null,
        CHECK: {
            INTERVAL: {
                OBJ: null,
                TERM: 1000,
                COUNT: 0,
                INIT: function() {
                    if(GBL.ACCOUNT.CHECK.INTERVAL.OBJ != null) {
                        window.clearInterval(GBL.ACCOUNT.CHECK.INTERVAL.OBJ);
                        GBL.ACCOUNT.CHECK.INTERVAL.OBJ = null;
                        GBL.ACCOUNT.CHECK.INTERVAL.COUNT = 0;
                    }
                }
            },
            RUN: function() {}
        },
        AFTER_LOGIN_URL: "/patient/index",
        COOKIE: {
            TERM: {
                REMEMBER_ID: 30, // days
                AUTO_LOGIN: 365
            }
        },
        LOGIN_FAIL: {
            TYPE: "normal", // normal(실패만 알려줌), detail(자세히 알려줌)
            CODE: { // 아래 문구가 포함되는 걸 찾는다.
                NULL: "Account is null",
                INCORRECT: "The password is incorrect",
                BOTH: ["Account is null", "The password is incorrect"]
            },
            MESSAGE: {
                NULL: "계정이 존재하지 않습니다. 아이디와 비밀번호를 정확하게 입력하세요.",
                INCORRECT: "비밀번호가 정확하지 않습니다. 비밀번호를 정확하게 입력하세요.",
                BOTH: "로그인에 실패하였습니다. 아이디와 비밀번호를 정확하게 입력하세요."
            },
            GET_MESSAGE: function(code) {
                let msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.BOTH;
                if(GBL.ACCOUNT.CHECK.LOGIN_FAIL.TYPE === "detail") {
                    if(code.indexOf(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.NULL) !== -1) {
                        msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.NULL;
                    }
                    else if(code.indexOf(GBL.ACCOUNT.CHECK.LOGIN_FAIL.CODE.INCORRECT) !== -1) {
                        msg = GBL.ACCOUNT.CHECK.LOGIN_FAIL.MESSAGE.INCORRECT;
                    }
                }
                return msg;
            }
        },
        IS_AUTH: function() {},
        SET: function() {},
        REFRESH_SET: function() {},
        IS_RUN_ACTION: function(name, nowAction, ignoreAction = []) {
            let ignoreAuth = false;
            let checkAuth = false;
            for(let i = 0; i < ignoreAction.length; i++) {
                if(ignoreAction[i] == nowAction) {
                    ignoreAuth = true;
                }
            }

            if(ignoreAuth === false) {
                checkAuth = GBL.ACCOUNT.IS_AUTH(true);
            }

            if(ignoreAuth === true || (ignoreAuth === false && checkAuth === true)) {
                return true;
            }
            return false;
        }
    },
    API: {
        SERVICE_TYPE: `DEVELOPMENT`, // RELEASE, STAGING, DEVELOPMENT
        BASE_URL: null,
        FAKE: {}, // true/false, false일 경우 실제 호출을 하지 않고, 임의로 등록한 json으로 가상 api 처리를 한다. 단! api 주소 자체를 키값으로 지정한다. example 확인 필요
        URL: {},
        RESPONSE: {
            CODE: {}
        },
        SET_BASE_URL: function() {
            if((location.hostname.indexOf('seers') != -1 || location.hostname.indexOf('13.209.51.114') != -1) && location.hostname.indexOf('test') == -1) {
                console.log('############################## base - 운영 서버');
                GBL.API.BASE_URL = "https://www.apirelease.seers-pet.com/mobiCAREPet/API";   // release
            }
            else {
                console.log('############################## base - 테스트 서버');
                GBL.API.BASE_URL = "https://www.apirelease.seers-pet.com/mobiCAREPet/API";   // test
            }
        }
    },
    PAGING: {
        DATA: {
            PAGE: {
                PER_COUNT: 10,
                PER_PAGE: 10
            }
        }
    },
    KEYBOARD_KEY: {
        CODE: {
            ENTER: 13
        }
    },
    CONSTANTS: null,
    GET_CONSTANTS: function(initInfo) {
        const runGlobal = (function(initInfo) {
            const globalKeyPreFix = ['APP', 'GLOBAL', 'LANGUAGE'];
            const globalMergeKey = ['CONSTANTS', 'LANGUAGE'];
            const _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV = {};
            const init = function() {
                let checkKeyName = null;
                for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                    checkKeyName = key.split(`.`)[0];
                    if (globalKeyPreFix.indexOf(checkKeyName) === -1) {
                        del(key);
                    }
                }
                // 특별 처리 LANGUAGE 하위의 base/layout 만 남기고, 나머지는 모두 지우기
                let _l = get('LANGUAGE');
                let _k = ['BASE', 'LAYOUT'];
                for (let key in _l) {
                    if (_k.indexOf(key) === -1) {
                        delete _l[key];
                    }
                }
            };
            const allData = function() {
                for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                    console.log("key, value:::::", key, _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[key]);
                }
            };
            const allDeleteIgnoreApp = function() {
                for (let key in _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV) {
                    let checkKeyName = null;
                    let checkGlobalKeyPreFix = globalKeyPreFix[0];
                    checkKeyName = key.split(`.`)[0];
                    if (checkGlobalKeyPreFix.indexOf(checkKeyName) === -1) {
                        del(key);
                    }
                }
            };
            const has = function(name) {
                return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV.hasOwnProperty(name);
            };
            const getAllData = function() {
                return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV;
            }
            const get = function(name) {
                if(_TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV.hasOwnProperty(name) === true) {
                    return _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
                }
                else {
                    return null;
                }
            };
            const set = function(name, value, force = false) {
                const _set = function(val) {
                    _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name] = val;
                }
                if(force === true) {
                    if (globalMergeKey.indexOf(name) !== -1) {
                        let _check = {};
                        if(has(name) === true) {
                            _check = get(name);
                            $.extend(true, _check, value);
                            _set(_check);
                        }
                        else {
                            _set(value);
                        }
                    }
                    else {
                        _set(value);
                    }
                }
                else {
                    if(has(name) === false) {
                        _set(value);
                    }
                }
            };
            const multiSet = function(prefix = null, datas = null) {
                if (prefix === null || datas === null) {
                    return;
                }
                for (let key in datas) {
                    _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[`${prefix}.${key}`] = datas[key];
                }
            }
            const del = function(name) {
                if(has(name) === true) {
                    delete _TqsrbxbzdTBAZtGWVfPLzGkfIEWqXV[name];
                }
            };
            if (initInfo !== null) {
                for (let key in initInfo) {
                    set(key, initInfo[key], true);
                }
            }
            return {
                getAllData: getAllData,
                get: get,
                set: set,
                multiSet: multiSet,
                del: del,
                has: has,
                init: init,
                allData: allData,
                allDeleteIgnoreApp: allDeleteIgnoreApp
            }
        }(initInfo));
        return runGlobal;
    },
};

// 사이트별 전역 변수 정의
let CUSTOM = {
    MODULE: {}, // 모듈별 전역변수는 따로 설정. 모듈 내에서 사이트 전역 변수를 설정 할 수 없기때문에.
    EVENT: {
        HTML: [] // HTML 특정 DOM 에 이벤트 정의된 selector 명을 사용시 추가한다. controller 로딩시 초기화 하기 위해
    }
};