"use strict";

const promise = async () => {
    const {CONST: CONST} = await import(`/js/module/login/constant.js${ver_string}`);
    const model = await import(`/js/module/login/model.js${ver_string}${String.generateRandom(6)}`);
    const html = await import(`/js/module/login/template/${CONST.DESIGN.THEME}/design.js${ver_string}`);
    // 캐쉬때문에 문제가 발생(재로딩시)
    const {CONST: LANGUAGE} = await import(`/js/module/login/language/${GBL.CONSTANTS.get(`APP.LOCALE`)}/index.js${ver_string}${String.generateRandom(6)}`);
    GBL.CONSTANTS.set(`LANGUAGE`, {'LOGIN': LANGUAGE}, true);

    const pre = function() {
        return new Promise(function(resolve, reject) {

            let loadingEnd = function() {
                // 아래 영역에 코드 작성
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                resolve(true);
            }
            let options = {
                files: [
                    // 아래 영역에 코드 작성(필요한 js, css 로딩)
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                    `/js/module/login/assets/css/${CONST.DESIGN.THEME}/style.css${ver_string}`
                    //////////////////////////////////////////////////////////////////////////////////////////////////
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }


    const _setPostProcess = function(action) {
        if(CONST.POST_PROCESS.hasOwnProperty(action) === true) {
            // 레이아웃 생성 후 레이아웃 관련 event 처리가 있을 경우, 필요한 html 에 추가하여, 사용하기
            CONST.POST_PROCESS[action]();
        }
        _setAddEvent();
    }

    const _setAddEvent = function(contentName = null, response = null) {
        let action = GBL.WINDOW_HISTORY_STATE.GET_NOW_ACTION();
        if(action === "index" || action === undefined) {
            if(contentName === null) {
                _setCookieUserId();

                // 버튼 클릭
                CUSTOM.EVENT.HTML.push(CONST.DESIGN.DOM.BUTTON.LOGIN);
                $(CONST.DESIGN.DOM.BUTTON.LOGIN).off("click").click(function (e) {
                    etc.stopBubbling(e);
                    _login();
                });

                $(CONST.DESIGN.DOM.INPUT.PASS).off("keypress").keypress(function(e) {
                    etc.stopBubbling(e, "none");
                    let keycode = (e.keyCode ? e.keyCode : e.which);
                    if(keycode == '13') {
                        if($(CONST.DESIGN.DOM.INPUT.ID).val() !== "" || $(CONST.DESIGN.DOM.INPUT.ID).val().trim() !== "") {
                            _login();
                        }
                    }
                }).focus();

                CUSTOM.EVENT.HTML.push(CONST.DESIGN.DOM.INPUT.ID);
                $(CONST.DESIGN.DOM.INPUT.ID).off("keypress").keypress(function(e) {
                    etc.stopBubbling(e, "none");
                    let keycode = (e.keyCode ? e.keyCode : e.which);
                    if(keycode == '13') {
                        if($(CONST.DESIGN.DOM.INPUT.PASS).val() !== "" || $(CONST.DESIGN.DOM.INPUT.PASS).val().trim() !== "") {
                            _login();
                        }
                        else {
                            $(CONST.DESIGN.DOM.INPUT.PASS).focus();
                        }
                    }
                }).focus();

                CUSTOM.EVENT.HTML.push(CONST.DESIGN.DOM.FORM.DATA);
                $(CONST.DESIGN.DOM.FORM.DATA).off("submit").on("submit", function(e) {
                    etc.stopBubbling(e, "none");
                    _login();
                });

                // 자동 로그인 설정 체크하면, 아이디기억을 자동 체크 함
                CUSTOM.EVENT.HTML.push(CONST.DESIGN.DOM.INPUT.CHECK.AUTO);
                $(CONST.DESIGN.DOM.INPUT.CHECK.AUTO).off("click").click(function(e) {
                    etc.stopBubbling(e, "none");
                    if($(`input:checkbox[id="${CONST.DESIGN.DOM.INPUT.CHECK.AUTO.replace("#", "")}"]`).is(":checked") === true) {
                        if(CONST.USE.AUTO_LOGON_CHECK.SAVE_ID_CHECK === true) {
                            $(`input:checkbox[id="${CONST.DESIGN.DOM.INPUT.CHECK.ID_SAVE.replace("#", "")}"]`).prop("checked", true);
                        }
                    }
                });
            }
        }
    }

    const index = function() {

        GBL.ACCOUNT.SET();

        // layout 이 없는 디자인이라. 전체 디자인을 초기화
        $(`${CONST.DESIGN.DIV_NAME}`).html('');
        etc.setHtmlParsing($(`${CONST.DESIGN.DIV_NAME}`), html.index, {LOGO: CONST.DESIGN.LOGO});
        _setPostProcess("index");
        Seers.Loader.moduleLoad("version", "index");
    }

    const _loginFail = function(data) {
        let formId = CONST.DESIGN.DOM.FORM.DATA.replace("#", "");
        let modalId = "customAlertForLogin";
        let okCallback = [];
        const _okCommonCallback = function() {
            etc.isFormSubmit(formId, "end");
            modal.globalClose(modalId);
            setTimeout(function() {
                $(`#id_input`).focus();
            }, 20);
        }
        const _modalEventCallback = [{
            name: function() {
                $(`#${modalId}`).attr("tabindex", -1).focus();
                $(`#${modalId}`).off("keydown").on("keydown", function (e) {
                    if (e.keyCode === 13) {
                        etc.stopBubbling(e);
                        etc.isFormSubmit(formId, "end");
                        $(`.customAlertButtonForOk`).trigger(`click`); // custom modal ok 버튼 클릭시 모달창 닫기
                        // 디자인 페이지의 아이디 입력항목 focus
                        setTimeout(function() {
                            $(`#id_input`).focus();
                        }, 20);
                    }
                });
            },
            params: []
        }]
        // okCallback.push({
        //     name: etc.isFormSubmit,
        //     params: [formId, "end"]
        // })
        // okCallback.push({
        //     name: modal.globalClose,
        //     params: [modalId]
        // })
        okCallback.push({
            name: _okCommonCallback,
            params: []
        })
        let initParameter = {
            msg: CONST.LOGIN_FAIL.GET_MESSAGE(data.message),
            id: modalId,
            isBackgroundClickForClose: false,
            button: {
                ok: {
                    callback: okCallback
                },
                del: {isUse: false},
                cancel: {isUse: false}
            },
            modalEventCallback: _modalEventCallback
        }
        Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
    }
    const _login = function() {
        let formId = CONST.DESIGN.DOM.FORM.DATA.replace("#", "");
        let form = etc.formParser(formId);
        if(etc.formCheck(formId) === true) {
            if(etc.isFormSubmit(formId, "check") === true) {
                return false;
            }
            let parameter = {
                id: form[CONST.DESIGN.DOM.INPUT.ID.replace("#", "")],
                password: form[CONST.DESIGN.DOM.INPUT.PASS.replace("#", "")]
            }
            GBL.CONSTANTS.set(`LOGIN.FAIL.FUNCTION`, _loginFail, true);
            custom.request.api(CONST.API.LOGIN, CONST.UTIL.SET_ADD_PARAMS(parameter, form), model.successLogin, {formId: formId});
            etc.isFormSubmit(formId, "end");
        }
        else {
            etc.isFormSubmit(formId, "end");
        }
    }

    const _setCookieUserId = function() {
        let userIdCookieStr = CookieHelper.get("seers_id");
        if(userIdCookieStr != undefined) {
            $(CONST.DESIGN.DOM.INPUT.ID).val(userIdCookieStr);
            $(CONST.DESIGN.DOM.INPUT.CHECK.ID_SAVE).prop("checked", true);
        } else {
            $(CONST.DESIGN.DOM.INPUT.ID).val("");
            $(CONST.DESIGN.DOM.INPUT.PASS).val("");
            $(CONST.DESIGN.DOM.INPUT.CHECK.ID_SAVE).prop("checked", false);
        }
    };

    return {
        pre: pre,
        index: index,
    };
};

export { promise }