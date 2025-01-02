"use strict";

// 원래는 아래와 같이 하나 자바스크립트 캐싱 처리 문제로 인해서 async 버전으로 아래 처럼 사용
// import * as model from "/js/model/login.js";
// import * as html from "/template/content/login.js";
//
// export const index = function() {
//     $('#container').html(html.login);
//     setCookieUserId();
//
//     let jContainer = $('.login_container');
//     jContainer.find('#login_btn').on('click', function() {
//         login();
//     });
//
//     jContainer.find('#id_input').keypress(function(e) {
//         let keycode = (e.keyCode ? e.keyCode : e.which);
//         if(keycode == '13')
//         {
//             jContainer.find('#password_input').focus();
//         }
//     }).focus();
//
//     jContainer.find('#password_input').keypress(function(e) {
//         let keycode = (e.keyCode ? e.keyCode : e.which);
//         if(keycode == '13') {
//             login();
//         }
//     });
//
//     console.log("12345");
//     jQuery.Seers.Loader.moduleLoad("app_ver", "index");
//     console.log("loading:::::::::::::::::1");
// }
//
// let login = function() {
//     if($("#id_input").val() == "" || $("#id_input").val() == null) {
//         alert("아이디를 입력하세요!");
//         $('#id_input').focus();
//         return;
//     }
//     if($("#password_input").val() == "" || $("#password_input").val() == null) {
//         alert("비밀번호를 입력하세요!");
//         $('#password_input').focus();
//         return;
//     }
//     let parameter = {
//         "id": $("#id_input").val(),
//         "password": $("#password_input").val(),
//     }
//     jQuery.Seers.CustomUtil.requestAPI(true, GBL.API.URL.ACCOUNT.LOGIN, parameter, model.successLogin);
// }



const promise = async() => {

    // const model = await import(`/js/model/login.js${ver_string}`);
    // const html = await import(`/template/${GBL.DESIGN.THEME}/content/login.js${ver_string}`);
    const ignoreAuthAction = ["index"];
    // const _const = {};

    // const pre = function() {
    //     return new Promise(function(resolve, reject) {
    //         let loadingEnd = function() {
    //             resolve(true);
    //         }
    //         let options = {
    //             files: [
    //                 // `/assets/css/theme/${GBL.DESIGN.THEME}/login.css${ver_string}`
    //             ],
    //             errorAfterType: "stop",
    //             callback: loadingEnd
    //         }
    //         let fileLoading = new preFileLoading();
    //         fileLoading.setInit(options);
    //         fileLoading.run();
    //     });
    // }

    const index = function(params = null) {
        Seers.Loader.moduleLoad("login", "index");
        // if(params !== null) {
        //     if(params.hasOwnProperty("type") === true) {
        //         _const.accountType = params.type;
        //     }
        // }
        // GBL.ACCOUNT.SET();
        //
        // // layout 이 없는 디자인이라. 전체 디자인을 초기화
        // $(`${GBL.DESIGN.MAIN_DIV_NAME}`).html('');
        // etc.setHtmlParsing($(`${GBL.DESIGN.MAIN_DIV_NAME}`), html.login);
        // setCookieUserId();
        //
        // $('#login_btn').on('click', function() {
        //     login();
        // });
        //
        // $('#id_input').keypress(function(e) {
        //     let keycode = (e.keyCode ? e.keyCode : e.which);
        //     if(keycode == '13') {
        //         $('#password_input').focus();
        //     }
        // }).focus();
        //
        // $('#password_input').keypress(function(e) {
        //     let keycode = (e.keyCode ? e.keyCode : e.which);
        //     if(keycode == '13') {
        //         login();
        //     }
        // });
        // Seers.Loader.moduleLoad("version", "index");
        // // Seers.Loader.moduleLoad("test_modal", "index");
        //
        // // 자동 로그인 설정 체크하면, 아이디기억을 자동 체크 함
        // $("#login_auto").click(function() {
        //     if($("input:checkbox[id='login_auto']").is(":checked") === true) {
        //         $("input:checkbox[id='login_userId']").prop("checked", true);
        //     }
        // });
    }

    // const login = function() {
    //     let dataFormId = "dataForm";
    //     if(etc.formCheck(dataFormId) === true) {
    //         // if($("#id_input").val() == "" || $("#id_input").val() == null) {
    //         //     alert("아이디를 입력하세요!");
    //         //     $('#id_input').focus();
    //         //     return;
    //         // }
    //         // if($("#password_input").val() == "" || $("#password_input").val() == null) {
    //         //     alert("비밀번호를 입력하세요!");
    //         //     $('#password_input').focus();
    //         //     return;
    //         // }
    //         let parameter = {
    //             id: $("#id_input").val(),
    //             password: $("#password_input").val(),
    //             accountType: _const.accountType
    //         }
    //         custom.request.api(GBL.API.URL.ACCOUNT.LOGIN_HIS, parameter, model.successLogin);
    //     }
    // }
    //
    // const setCookieUserId = function() {
    //     let userIdCookieStr = CookieHelper.get("seers_id");
    //     if(userIdCookieStr != undefined) {
    //         $("#id_input").val(userIdCookieStr);
    //         $("#login_userId").prop("checked", true);
    //     } else {
    //         $("#login_userIdBtn").val("");
    //         $("#password_input").val("");
    //         $("#login_userId").prop("checked", false);
    //     }
    // };

    return {
        ignoreAuthAction: ignoreAuthAction,
        index: index,
        // pre: pre
    };
};

export { promise }