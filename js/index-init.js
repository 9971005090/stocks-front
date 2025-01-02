//https://okayoon.tistory.com/entry/JSDoc를-사용해서-Javasript-문서화해보자
/**
 * 메뉴 항목을 추가한다.
 * @param {string} id 항목에 대한 고유 식별자
 * @param {string} url 항목 아이콘
 * @param {string} title 항목 타이틀
 * @param {function} callback 실행에 대한 호출 함수
 * @returns {boolean} 성공 여부
 */
"use strict";

const Seers = {
    Loader: {},
    // Controller: {},
    // Module: {},
};
const showSiteLoadingLog = function(msg, textColor = `#0088FF`, backgroundColor = `#CADFF1`) {
    console.log(`%c:::::::::::::${msg}:::::::::::`, `color:${textColor}; background:${backgroundColor}`);
}
const scriptQuery = function(src=null) {
    if (src != null) {
        let scripts = document.getElementsByTagName('script');
        let script = null;
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(src) != -1) {
                script = scripts[i].src
                    .replace(/^[^\?]+\?/, '')
                    .replace(/#.+$/, '')
                    .split('&');
                let queries = {};
                let query;
                while (script.length) {
                    query = script.shift().split('=');
                    queries[query[0]] = query[1];
                }
                return queries;
            }
        }
    }
}

let s = null;
let x = null;
let parameters = scriptQuery(`/js/index-init.js`);
let ver_string = `?V=${parameters.V}`;
let allDynamicScripts = [];
let preFileLoading = function() {
    // 규칙: .js, .css 로 끝나야 하며, .은 한개만 사용한다.
    this.runType = "program"; // install(최초 체크), program(사이트 설치 후 실행 시)
    this.files = [];
    this.fileCount = 0;
    this.errorAfterType = "ignore"; // stop(에러처리), ignore(무시하고 진행)
    this.callback = null;
    this.setInit = function(options = null) {
        if(options !== null) {
            if(options.hasOwnProperty("runType") === true) {
                this.runType = options.runType;
            }
            if(options.hasOwnProperty("files") === true) {
                for(let i = 0; i < options.files.length; i++) {
                    if(options.files[i] !== null && allDynamicScripts.indexOf(options.files[i]) === -1) {
                        this.files.push(options.files[i]);
                        allDynamicScripts.push(options.files[i]);
                    }
                }
            }
            if(options.hasOwnProperty("errorAfterType") === true) {
                this.errorAfterType = options.errorAfterType;
            }
            if(options.hasOwnProperty("callback") === true) {
                this.callback = options.callback;
            }
        }
        this.fileCount = this.files.length;
    }
    this.done = function(name) {
        // console.log(`loading ok ${name}`);
        if(--this.fileCount <= 0) {
            if(this.callback !== null) {
                this.callback();
            }
        }
    }
    this.run = function() {
        let _self = this;
        if(this.fileCount > 0) {
            for(let i = 0; i < this.files.length; i++) {
                let tagName = "script";
                let type = "text/javascript";
                if(this.files[i].indexOf(".css") !== -1) {
                    tagName = "link";
                    type = "text/css";
                }
                let file = document.createElement(tagName);
                file.type = type;
                if(this.files[i].indexOf(".js") !== -1) {
                    file.src = this.files[i];
                }
                else if(this.files[i].indexOf(".css") !== -1) {
                    file.href = this.files[i];
                    file.rel = "stylesheet";
                }
                file.async = false;
                file.defer = true;
                document.head.appendChild( file );
                file.onload = function () {
                    _self.done(this.src);
                }
                file.onerror = function() {
                    showSiteLoadingLog(`파일 로딩 실패!, 파일주소(${file})`, `#EF0232`, `#f8c1cd`);
                    if(_self.errorAfterType === "stop") {
                        if(_self.runType === "install") {
                            location.href = "/error.html"
                        }
                        else if(_self.runType === "program") {
                            let _fileSrc = file.src;
                            if(typeof file.src === "undefined") {
                                _fileSrc = file.href;
                            }
                            sessionStorage.setItem("error", `file ${tagName} : ${_fileSrc}`);
                            Seers.Loader.directControllerLoad("error", "viewForErrorPage");
                        }
                    }
                }
            }
        }
        else {
            this.done();
        }
    }
}

let appRun = async function() {
    let loadingCustom = async function () {
        showSiteLoadingLog(`사이트 공통 필수 파일 로딩 완료`);
        if(GBL.DESIGN.APP_EXPLAIN_CONFIRM === true) {
            debug.setUse(GBL.DEBUG.USE);
            const preFileLoadingResult = await custom.preFileLoading();
            if (preFileLoadingResult === true) {
                showSiteLoadingLog(`사이트 공통 필수 파일 로딩 완료`);
                let result = await process.init();
                if (result === "OK") {
                    const responseControllerLoad = await Seers.Loader.controllerLoad();
                    if (responseControllerLoad === `OUT_OF_CONTROLLER_PRE_PROCESS_FAIL`) {
                        showSiteLoadingLog(`컨트롤러 전처리 실패!`, `#EF0232`, `#f8c1cd`);
                    }
                    showSiteLoadingLog(`사이트 로딩 완료`);
                }
                else if (result.indexOf(`AUTH_FAIL`) !== -1) {
                    showSiteLoadingLog(`인증 확인 실패!`, `#EF0232`, `#f8c1cd`);
                    if (result === `AUTH_FAIL_AFTER`) {
                        setTimeout(function() {
                            etc.move("/logout");
                        }, 800);
                    }
                    else {
                        etc.move("/logout");
                    }
                }
                else if (result === "BACKEND_SERVER_DIE") {
                    showSiteLoadingLog(`백엔드 서버 동작 안함!`, `#EF0232`, `#f8c1cd`);
                }
                else {
                    showSiteLoadingLog(`사이트 기본 처리 실패!`, `#EF0232`, `#f8c1cd`);
                }
            }
            else {
                showSiteLoadingLog(`필수 파일 로딩 실패!`, `#EF0232`, `#f8c1cd`);
            }
            // custom.preFileLoading().then(function (response) {
            //     // process.preForOutOfControllerScope(GBL.DESIGN.MAIN_DIV_NAME);
            //     let result = process.init();
            //     if(result === true) {
            //         Seers.Loader.controllerLoad();
            //     }
            // });
        }
        else {
            location.href = "/complete.html";
        }
    }
    let options = {
        runType: "install",
        files: [
            `/assets/css/common/constant.css${ver_string}`,
            `/assets/css/common/reset.css${ver_string}`,
            `/assets/css/common/common.css${ver_string}`,
            `/js/common/constant.js${ver_string}`,
            `/js/util/jquery/jquery-3.5.1.min.js${ver_string}`,
            `/js/util/jquery/jquery.cookie-1.4.1.min.js${ver_string}`,
            `/js/util/jquery/jquery.ui-1.12.1.min.js${ver_string}`,
            `/js/util/bootstrap/bootstrap-3.3.2.min.js${ver_string}`,
            `/js/util/datejs/date-ko-KR.js${ver_string}`,
            `/js/util/handlebars/handlebars.min-4.7.7.js${ver_string}`,
            `/js/util/slimscroll/slimscroll-1.3.8.min.js${ver_string}`,
            `/js/util/util.js${ver_string}`,
            `/js/common/loader.js${ver_string}`,
            `/js/custom/constant.js${ver_string}`,
            `/js/custom/util.js${ver_string}`
        ],
        errorAfterType: "stop",
        callback: loadingCustom
    }

    let fileLoading = new preFileLoading();
    fileLoading.setInit(options);
    fileLoading.run();
}
appRun();