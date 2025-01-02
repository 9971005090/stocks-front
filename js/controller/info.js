"use strict";

const promise = async () => {
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/info.js${ver_string}`);
    const ignoreAuthAction = ["index", "prepare"]; // urlProcess 페이지는 인증 체크 테스트 페이지

    const setPageTitle = function() {
        $(`${GBL.DESIGN.HEADER_NAME}`).html("");
        // $(`${GBL.DESIGN.PAGE_PARENT_DIV_NAME}`).removeClass("setting").addClass("setting");
        etc.setHtmlParsing($(`${GBL.DESIGN.HEADER_NAME}`), html.titleSourceTree);
    };

    const index = function() {
        // let response = custom.request.api("https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/hospital", {});
        // console.log("response::::::::::::", response);
        // response = custom.request.api("https://07619642-3076-4c0d-9333-4bc8f4d94f8b.mock.pstmn.io/login", {});
        // console.log("response::::::::::::", response);
        // let worker = new Worker( '/workerInterval.js' );
        // worker.postMessage( "1" );    // 워커에 메시지를 보낸다.
        // worker.onmessage = function( e ) {
        //     console.log("111111");
        //     alert("11111");
        // };
        setPageTitle();
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.infoSourceTree);
    };

    const prepare = function() {
        setPageTitle();
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.infoPrepare);
    };

    const urlProcess = function() {
        setPageTitle();
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.infoUrlProcess);
    };

    return {
        ignoreAuthAction: ignoreAuthAction,
        index: index,
        prepare: prepare,
        urlProcess: urlProcess
    };
};

export { promise }
