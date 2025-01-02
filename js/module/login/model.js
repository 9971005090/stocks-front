"use strict";
const {CONST: CONST} = await import(`/js/module/login/constant.js${ver_string}${String.generateRandom(6)}`);

export const successLogin = async function(response, obj) {
    // 비밀번호 확인 api 가 생길때까지 sessionStorage 에 추가
    custom.etc.processMemberPassword(`set`, obj.password);

    // api 성공 응답후 추가 확인 처리가 있을 경우
    const __checkPostAuth = async function(userLevel) {
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let response = await custom.etc.checkPostAuth(userLevel, {isUse: true, msg: null});
        if (response === `AUTH_FAIL`) {
            $(`#id_input`).val(``);
            $(`#password_input`).val(``);
            $(`#id_input`).focus();
            return response;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    const _process = async function() {
        let isChecked = $(`input:checkbox[id="${CONST.DESIGN.DOM.INPUT.CHECK.ID_SAVE.replace("#", "")}"]`).is(":checked");
        let isLoginAutoChecked = $(`input:checkbox[id="${CONST.DESIGN.DOM.INPUT.CHECK.AUTO.replace("#", "")}"]`).is(":checked");
        let id_val = $(CONST.DESIGN.DOM.INPUT.ID).val();
        GBL.ACCOUNT.SET(response);

        if (isChecked === true) {
            CookieHelper.set(CONST.COOKIE.NAME.ID, id_val, CONST.COOKIE.TERM.REMEMBER_ID);
        }
        else {
            CookieHelper.remove(CONST.COOKIE.NAME.ID);
        }

        if (isLoginAutoChecked === true) {
            CookieHelper.set(CONST.COOKIE.NAME.AUTO_LOGIN, response.accessToken, CONST.COOKIE.TERM.AUTO_LOGIN);
        }
        else {
            CookieHelper.remove(CONST.COOKIE.NAME.AUTO_LOGIN);
        }

        GBL.ACCOUNT.CHECK.RUN();

        let afterPassingParameter = {
            loginResponse: response,
            designParameter: {
                isChecked: isChecked,
                isLoginAutoChecked: isLoginAutoChecked
            }
        }
        await process.afterLogin(afterPassingParameter);

        CONST.UTIL.AFTER_LOGIN();
    }

    // api 성공 응답후 추가 확인 처리가 있을 경우
    let _r = await __checkPostAuth(response.userAccount.level);
    if (_r !== `AUTH_FAIL`) {
        if (CONST.WELCOME.USE === true) {
            custom.etc.customToastForColor(CONST.WELCOME.MESSAGE.replaceAll(`{{name}}`, response.userAccount.name), `bgBlue`, `top-center`);
            setTimeout(function() {
                _process();
            }, 500);
        }
        else {
            _process();
        }
    }
}