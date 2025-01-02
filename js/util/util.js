"use strict";
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 일반 함수 모음
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * console 사용 여부 처리
 */
let debug = {
    bool: false,
    // console 객체를 임시로 저장 하는 변수
    consoleHolder: console,

    /**
     * debug 사용 여부 설정
     * @param {boolean} bool true / false
     * @returns {void} 없음
     */
    setUse: function(bool) {
        debug.bool = bool;
        if (!bool) {
            console = {};
            Object.keys(debug.consoleHolder).forEach(function (key) {
                console[key] = function () {
                    return null;
                };
            })
        } else {
            console = debug.consoleHolder;
        }
    },

    getUse: function() {
        return debug.bool;
    }
}

/**
 * url 처리 관련 함수 모음
 */
let url = {
    setWindowHistoryStateUrl: function() {
        let pathname = document.location.pathname;
        let search = document.location.search;
        if (search !== "") {
            pathname += search;
        }
        GBL.WINDOW_HISTORY_STATE.URL.unshift(pathname);
        if (GBL.WINDOW_HISTORY_STATE.URL.length > GBL.WINDOW_HISTORY_STATE.DEPTH) {
            GBL.WINDOW_HISTORY_STATE.URL.splice(5, (GBL.WINDOW_HISTORY_STATE.URL.length - GBL.WINDOW_HISTORY_STATE.DEPTH));
        }
    },

    getNowController: function() {
        if (GBL.WINDOW_HISTORY_STATE.URL.length > 0) {
            return GBL.WINDOW_HISTORY_STATE.URL[0].split("/")[1];
        }
        return null;
    },

    getNowAction: function() {
        if (GBL.WINDOW_HISTORY_STATE.URL.length > 0) {
            const splitUrl = GBL.WINDOW_HISTORY_STATE.URL[0].split("/");
            if (splitUrl.length > 2) {
                return GBL.WINDOW_HISTORY_STATE.URL[0].split("/")[2].split("?")[0];
            }
            else {
                return `index`;
            }
        }
        return null;
    },

    getUrlByPoint: function(pt = 0, urlParsing = false) {
        if (urlParsing === true) {
            return document.location.pathname;
        }
        else {
            let checkUrl = "";
            if (GBL.WINDOW_HISTORY_STATE.URL !== null && GBL.WINDOW_HISTORY_STATE.URL !== "") {
                if (Array.isArray(GBL.WINDOW_HISTORY_STATE.URL) === true && GBL.WINDOW_HISTORY_STATE.URL.length > 0) {
                    checkUrl = GBL.WINDOW_HISTORY_STATE.URL[pt];
                }
            }
            return checkUrl === "" ? document.location.pathname : checkUrl;
        }
    }
}

/**
 * 초기화, 선행, 후행 처리 관련 함수 모음(구현체는 custom.process 에서 직접 추가해서 사용)
 */
let process = {
    init: async function() {
        showSiteLoadingLog(`util > process - init`, `#029cb8`, `#d9e6f1`);
        // GBL.API.SET_BASE_URL();
        Handlebars.registerHelper('customIf', function(arg1, sign, arg2, options) {
            if (sign === "===") {
                if (arg1 === arg2) {
                    return options.fn(this);
                }
            }
            if (sign === "==") {
                if (arg1 == arg2) {
                    return options.fn(this);
                }
            }
            if (sign === "!==") {
                if (arg1 !== arg2) {
                    return options.fn(this);
                }
            }
            if (sign === ">") {
                if (arg1 > arg2) {
                    return options.fn(this);
                }
            }
            if (sign === ">=") {
                if (arg1 >= arg2) {
                    return options.fn(this);
                }
            }
            if (sign === "<") {
                if (arg1 < arg2) {
                    return options.fn(this);
                }
            }
            if (sign === "<=") {
                if (arg1 <= arg2) {
                    return options.fn(this);
                }
            }
            return options.inverse(this);
        });
        Handlebars.registerHelper('nl2br', function(text, isXhtml) {
            // const breakTag = isXhtml ? '<br />' : '<br>'
            // const withBr = Handlebars.escapeExpression(text).replace(
            //     /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
            //     '$1' + breakTag + '$2'
            // )
            return new Handlebars.SafeString(etc.nl2br(text, isXhtml));
        })
        Handlebars.registerHelper('math', function(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        })
        // 새로고침을 하면 기존 session 스토리지 값을 모두 초기화한다.
        process.sessionStorageInit();
        const result = await custom.process.init();
        if (result !== `OK`) {
            return result;
        }
        return `OK`;
    },
    preForOutOfControllerScope: async function(domId = null, parameters = null) {
        showSiteLoadingLog(`util > process - preForOutOfControllerScope`, `#029cb8`, `#d9e6f1`);
        return await custom.process.preForOutOfControllerScope(domId, parameters);
    },
    postForOutOfControllerScope: async function() {
        showSiteLoadingLog(`util > process - postForOutOfControllerScope`, `#029cb8`, `#d9e6f1`);
        return await custom.process.postForOutOfControllerScope();
    },
    pre: async function() {
        showSiteLoadingLog(`util > process - pre`, `#029cb8`, `#d9e6f1`);
        return custom.process.pre();
    },
    post: async function() {
        showSiteLoadingLog(`util > process - post`, `#029cb8`, `#d9e6f1`);
        return await custom.process.post();
    },
    reset: function() {
        console.log("process - reset");
        custom.process.reset();
    },
    afterLogin: async function(parameters = null) {
        console.log("process - afterLogin");
        await custom.process.afterLogin(parameters);
    },
    afterLogout: function() {
        console.log("process - afterLogout");
        custom.process.afterLogout();
    },
    error: function() {
        console.log(`error - ${sessionStorage.getItem("error")}`);
        custom.process.error();
    },
    sessionStorageInit: function() {
        showSiteLoadingLog(`util > process - sessionStorageInit`, `#029cb8`, `#d9e6f1`);
        custom.process.sessionStorageInit();
    },
    localStorageInit: function() {
        console.log("process - localStorageInit");
        custom.process.localStorageInit();
    }
}

/**
 * 기타 유틸 함수 모음(형식을 따로 묶기가 어려워 합침)
 */
let etc = {

    /**
     * 템플릿에 사용된 a 태그의 href 내용을 onclick으로 변경 후 href 삭제 처리
     * @returns {void} 없음
     */
    hrefToSeersLink: function() {
        $('a').each(function () {
            let link = $(this);
            let href = link.attr('href');
            if (href !== null && href !== "") {
                link.removeAttr('href');
                link.on("click", function(){ etc.move(href); });
                link.css("cursor", "pointer");
            }
        });
    },

    /**
     * / 구분자로 한 링크값을 seers 이동 함수로 변환 처리
     * @param {string} linkValue 링크값(예: test/index)
     * @returns {void} 없음
     */
    move: function(linkValue = null, force = false) {
        // 같은 주소가 다시 로딩되지 않게
        if (GBL.WINDOW_HISTORY_STATE.URL[0] !== linkValue || force === true) {
            let e = window.event;
            if (typeof e != "undefined") {
                etc.stopBubbling(e);
                // e.stopPropagation();
            }
            let title = "seers";
            let controller = "test";
            let action = null;
            let id = null;
            if (linkValue != null) {
                if (typeof linkValue == "string") {
                    if (linkValue != "/") {
                        let tempPath = linkValue.split("/");
                        controller = tempPath[1];
                        if (typeof tempPath[2] != "undefined") {
                            action = tempPath[2];
                        }
                        if (typeof tempPath[3] != "undefined") {
                            id = tempPath[3];
                        }
                    }
                }
            }
            Seers.Loader.goMove(title, controller, action, id, String.getUrlParam(linkValue), linkValue, force);
            return;
        }
    },
    moveBack: function(backPt = 0, forceAction = null) {
        GBL.WINDOW_HISTORY_STATE.GO_BACK(backPt, forceAction);
    },
    move2: function(controller, action) {
        etc.move(`/${controller}/${action}`);
    },

    setHtmlParsing: function(domObj, html, parsingValue = {}, append = true, callback = null, mode = `append`) {
        if (html === undefined) {
            throw new Error('디자인 파일이 정의 되지 않았습니다. controller에서 사용하는 디자인이 정의됐는지 확인 하세요!');
        }
        let template_html = html;
        let template = Handlebars.compile(template_html);
        parsingValue['THEME'] = GBL.DESIGN.THEME;
        parsingValue['ACCOUNT'] = GBL.ACCOUNT.INFO;
        parsingValue['NOW_ACTION'] = GBL.CONSTANTS.get(`NOW_ACTION`);
        parsingValue['NOW_CONTROLLER'] = GBL.CONSTANTS.get(`NOW_CONTROLLER`);
        parsingValue['CONSTANTS'] = GBL.CONSTANTS.get(`CONSTANTS`);
        parsingValue['LANGUAGE'] = GBL.CONSTANTS.get(`LANGUAGE`);
        parsingValue['APP_LOCALE'] = GBL.CONSTANTS.get(`APP.LOCALE`);
        parsingValue['GLOBAL_CONSTANTS'] = GBL.CONSTANTS.get(`GLOBAL.CONSTANTS`);
        // 반드시 sync로 처리 하는 정보만 가능, async 처리는 불가능
        parsingValue = custom.etc.setHtmlParsing(parsingValue);
        if(append === true) {
            if (mode === `html`) {
                domObj.html(template(parsingValue));
            }
            else {
                domObj[mode](template(parsingValue));
                if (callback !== null) {
                    callback();
                }
            }
            return null;
        }
        return template(parsingValue);
    },

    interval: {
        start: function(immediately = false, callback, MilliSeconds) {
            if (immediately === true) {
                callback();
            }
            return window.setInterval(callback, MilliSeconds)
        },
        end: function(intervalObj, MilliSeconds = null) {
            if (MilliSeconds == null) {
                clearInterval(intervalObj);
            }
            else {
                setTimeout(function() {
                    clearInterval(intervalObj);
                }, MilliSeconds);
            }
        }
    },

    intervalUseWorker: {
        start: function(worker, immediately = false, callback, milliSeconds = 1000) {
            if (immediately === true) {
                callback();
            }
            worker.postMessage( milliSeconds );    // 워커에 메시지를 보낸다.
            worker.onmessage = function( e ) {
                callback();
            };
            return;
        },
        end: function(worker, milliSeconds = null) {
            if (milliSeconds == null) {
                worker.terminate();
                worker = null;
            }
            else {
                setTimeout(function() {
                    worker.terminate();
                    worker = null;
                }, milliSeconds);
            }
            return;
        }
    },
    isFormSubmit: function(dataFormId = null, type = "check") { // type: check/end
        if (dataFormId === null) {
            return true;
        }
        if (type === "check") {
            if ($(`#${dataFormId}`).find("#isFormSubmit").length > 0) {
                let modalId = "customAlertForCheckFormSubmit";
                let initParameter = {
                    msg: `처리중입니다. 잠시만 기다려 주세요!`,
                    id: modalId,
                    isBackgroundClickForClose: false,
                    button: {
                        cancel: {
                            isUse: false
                        },
                        del: {
                            isUse: false
                        }
                    }
                }
                Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
                return true;
            }
            else {
                $(`#${dataFormId}`).append("<input type='hidden' id='isFormSubmit'>");
                return false;
            }
        }
        else {
            if ($(`#${dataFormId}`).find("#isFormSubmit").length > 0) {
                $(`#${dataFormId}`).find("#isFormSubmit").remove();
            }
            return true;
        }
    },
    formParser: function(formId) {
        const form = {};

        $(`#${formId}`)
            .find("input, select, textarea")
            .each(function (i) {
                const name = $(this).attr("name");
                form[name] = String.getValidValue($(`#${formId}`).find('[name="' + name + '"]').val());
                if ($(`#${formId}`).find('[name="' + name + '"]').attr('type') === "radio" || $(`#${formId}`).find('[name="' + name + '"]').attr('type')=== `checkbox`) {
                    form[name] = $(`#${formId}`).find('[name="' + name + '"]:checked').val();
                }
                // if ($(`#${formId}`).find('[name="' + name + '"]').val() == 0) form[name] = null;
            });

        return form;
    },
    formSearchParser: function(selector, useColumnSelector = `.use-option`) {
        const _notParsingValueCheck = function(choiceObject) {
            return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val())
        }
        const form = {};

        $(selector)
            .find(useColumnSelector)
            .each(function (i) {
                const name = $(this).attr(`name`)

                form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]`).val());
                if ($(selector).find(`[name="${name}"]`).attr(`type`) === `radio` || $(selector).find(`[name="${name}"]`).attr(`type`) === `checkbox`) {
                    form[name] = _notParsingValueCheck($(selector).find(`[name="${name}"]:checked`)) === true ? null : String.getValidValue($(selector).find(`[name="${name}"]:checked`).val());
                }
            });

        return form;
    },

    formCheck: function (id, addCheckFunc = null, classType = 'default') { // defalut, error(새롭게 만듦)
        let invalidFeedbackClass = `invalid-feedback`;
        let invalidClass = `is-invalid`;
        let validClass = `is-valid`;
        if (classType === `error`) {
            invalidFeedbackClass = `error-text`;
            invalidClass = `error`;
            validClass = ``;
        }
        const _notParsingValueCheck = function(choiceObject) {
            return choiceObject.attr(`data-not-parsing-value`) === String.getValidValue(choiceObject.val())
        }
        const setMessage = function(msg) {
            let result = `
                <div class="${invalidFeedbackClass}">
                    ${msg}
                </div>
            `;
            if (classType === `error`) {
                result = `
                    <p class="${invalidFeedbackClass}">
                        ${msg}
                    </p>
                `;
            }
            return result
        }
        const typeColumnValidate = function(dataType, input_value) {
            let patternCheck = false;
            let alertMsg = null;
            if (dataType === "birthday") {
                [patternCheck, alertMsg] = etc.validate.birthday(input_value);
            }
            else if (dataType === "cellPhone") {
                [patternCheck, alertMsg] = etc.validate.cellPhone(input_value);
            }
            else if(dataType === "email") {
                [patternCheck, alertMsg] = etc.validate.email(input_value);
            }
            else if (dataType === "telPhone") {
                [patternCheck, alertMsg] = etc.validate.telPhone(input_value);
            }
            return [patternCheck, alertMsg];
        }
        const valueChange = function() {
            const self = $(this);
            const dataType = self.data("type");
            const input_value = self.val();
            let isValidate = false;
            if (input_value != "" && input_value != null) {
                isValidate = true;
            }
            if (dataType !== undefined) {
                if (isValidate === true) {
                    let patternCheck = false;
                    let alertMsg = null;
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if (patternCheck === true) {
                        isValidate = false;
                    }
                }
            }
            if (isValidate === true) {
                if (classType === `default`) {
                    self.removeClass(invalidClass);
                }
                else if (classType === `error`) {
                    self.parent().removeClass(invalidClass);
                }
                // self.parent().find(".invalid-feedback").remove();
            }
        }
        const ifCheckValueChange = function() {
            const self = $(this);
            const input_value = self.val();
            let isValidate = false;
            if (input_value === "" || input_value === null) {
                isValidate = true;
            }
            if (isValidate === true) {
                self.removeClass(invalidClass);
                // self.parent().find(".invalid-feedback").remove();
            }
        }
        let isValidate = true;
        const check = $(`#${id}`).find(".check");
        const ifCheck = $(`#${id}`).find(".ifCheck");

        check.on("keyup", valueChange);
        ifCheck.on("keyup", ifCheckValueChange);

        check.each(function(index, item) {
            const setValidate = function(obj, msg) {
                if (classType === `default`) {
                    input.removeClass(validClass).addClass(invalidClass);
                    if(obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                        obj.parent().append(setMessage(msg));
                    }
                    else {
                        obj.parent().find(`.${invalidFeedbackClass}`).text(msg)
                    }
                }
                else if (classType === `error`) {
                    input.parent().removeClass(validClass).addClass(invalidClass);
                    if(obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                        obj.parent().append(setMessage(msg));
                    }
                    else {
                        obj.parent().find(`.${invalidFeedbackClass}`).text(msg)
                    }
                }
            }
            let input = $(item);
            const input_name = input.attr("name");
            let  input_value = _notParsingValueCheck(input) === true ? null : String.getValidValue(input.val());
            if ($(`#${id}`).find(`[name="${input_name}"]`).attr(`type`) === `radio` || $(`#${id}`).find(`[name="${input_name}"]`).attr(`type`)=== `checkbox`) {
                input_value = null;
                if ($(`#${id}`).find(`[name="${input_name}"]:checked`).val() !== undefined) {
                    input_value = _notParsingValueCheck($(`#${id}`).find(`[name="${input_name}"]:checked`)) === true ? null : String.getValidValue($(`#${id}`).find(`[name="${input_name}"]:checked`).val());
                }
                input =  $(`#${id}`).find(`[name="${input_name}"]`).eq(0);
            }
            if (String.isNullOrWhitespace(input_value) === true) {
                isValidate = false;
                setValidate(input, "필수입력 항목 입니다.");
            }
            else {
                input.removeClass(invalidClass);
                // input.parent().find(".invalid-feedback").remove();
                let dataType = input.data("type");
                let patternCheck = false;
                let alertMsg = null;
                if (dataType !== undefined) {
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if (patternCheck === true) {
                        isValidate = false;
                        setValidate(input, alertMsg);
                    }
                }
            }
        });

        ifCheck.each(function(index, item) {
            const setValidate = function(obj, msg) {
                if (classType === `default`) {
                    input.removeClass(validClass).addClass(invalidClass);
                    if(obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                        obj.parent().append(setMessage(msg));
                    }
                    else {
                        obj.parent().find(`.${invalidFeedbackClass}`).text(msg)
                    }
                }
                else if (classType === `error`) {
                    input.parent().removeClass(validClass).addClass(invalidClass);
                    if(obj.parent().find(`.${invalidFeedbackClass}`).length <= 0) {
                        obj.parent().append(setMessage(msg));
                    }
                    else {
                        obj.parent().find(`.${invalidFeedbackClass}`).text(msg)
                    }
                }
            }
            const input = $(item);
            const input_value = input.val();
            if (input_value !== "" && input_value !== null) {
                let dataType = input.attr(`data-type`);
                let patternCheck = false;
                let alertMsg = null;
                if(dataType !== undefined) {
                    [patternCheck, alertMsg] = typeColumnValidate(dataType, input_value);
                    if(patternCheck === true) {
                        isValidate = false;
                        setValidate(input, alertMsg);
                    }
                }
            }
        });

        if (addCheckFunc !== null && isValidate !== false) {
            isValidate = addCheckFunc();
        }

        return isValidate;
    },

    allCheck: function (data, dataId) {
        let obj = $(data);
        let checkbox = $(`[id="${dataId}"]`);
        checkbox.prop('checked', obj.is(":checked"));
    },

    afterRender: function(findObject, template = {searching: null}) {
        let searching = `  
            <tr>
                <td colspan="{{colspan}}">
                    데이터 조회 중입니다.
                </td>
            </tr>
        `;
        if (template.searching !== null) {
            searching = template.searching;
        }

        $(findObject).each(
            function() {
                if ($(this).data("info") != undefined) {
                    if ($(this).data("info") != "") {
                        let data = $(this).data("info");
                        let uniqueId = $(this).data("uniqueId");
                        if (data.callback.name != "") {
                            $(`[data-content-name="${data.contentName}"]`).html("");
                            let parsingValue = {
                                colspan: data.hasOwnProperty("colspan") === true ? data.colspan: 100
                            }
                            etc.setHtmlParsing($(`[data-content-name="${data.contentName}"]`), searching, parsingValue);
                            let parameterString = "data";
                            if (uniqueId !== undefined) {
                                parameterString = "data, uniqueId"
                            }
                            eval(`GBL.CONTROLLER['${data.callback.controller}']['${data.callback.name}'](${parameterString})`);
                        }
                    }
                }
            }
        );
    },

    appendSelectOption: function (obj, datas, current) {
        for (const key in datas) {
            let item = `<option value="${key}">${datas[key]}</option>`;
            if (current == datas[key]) {
                item = `<option value="${key}" selected>${datas[key]}</option>`;
            }
            obj.append(item);
        }
    },

    validate: {
        birthday: function(value) {
            // 시리얼 번호
            let alertMsg = null;
            let _pattern = /^(19[0-9]{2}|2[0-9]{3})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
            let patternCheck = _pattern.test(value) === false;
            if (patternCheck === true) {
                alertMsg = "XXXX-XX-XX 형식으로 입력해주세요!";
            }
            return [patternCheck, alertMsg];
        },
        cellPhone: function(value) {
            let alertMsg = null;
            let _pattern = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
            let patternCheck = _pattern.test(value) === false;
            if (patternCheck === true) {
                alertMsg = "XXX-XXXX-XXXX 형식으로 입력해주세요.";
            }
            return [patternCheck, alertMsg];
        },
        term: function(from, to) {
            if (from > to) {
                return false;
            }
        },
        email: function(value) {
            // 시리얼 번호
            let alertMsg = null;
            let _pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            let patternCheck = _pattern.test(value) === false;
            if(patternCheck === true) {
                alertMsg = "이메일을 정확하게 입력해주세요";
            }
            return [patternCheck, alertMsg];
        },
        telPhone: function(value) {
            let alertMsg = null;
            let _pattern = /^(070|02|0[3-9]{1}[0-9]{1})-([0-9]{3,4})-([0-9]{4})$/;
            let patternCheck = _pattern.test(value) === false;
            if (patternCheck === true) {
                alertMsg = "XX(X)-XXXX-XXXX 형식으로 입력해주세요.";
            }
            return [patternCheck, alertMsg];
        },
        password: function(value) {
            let alertMsg = null;
            let _pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
            let patternCheck = _pattern.test(value) === false;
            if (patternCheck === true) {
                alertMsg = "비밀번호를 다시 입력해주세요.(최소 8자리 , 숫자+알파벳)";
            }
            return [patternCheck, alertMsg];
        },
        password_confirm: function(value) {
            let alertMsg = null;
            let _pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
            let patternCheck = _pattern.test(value) === false;
            if (patternCheck === true) {
                alertMsg = "비밀번호를 다시 입력해주세요.(최소 8자리 , 숫자+알파벳)";
            }
            else {
                if($("input[name=password]")){
                    if($("input[name=password]").val() !== value){
                        alertMsg = "비밀번호가 다릅니다. 다시 입력해주세요.";
                        patternCheck = true;
                    }
                }
            }
            return [patternCheck, alertMsg];
        }
    },

    formSubmitCheckDisabled: function(formSelectorName = `#form-data`, submitButtonSelectorName = {submit: `.button-submit`,cancel: `.button-cancel`}, type = 'add', submitButtonChangeCallback = null) { // add, update
        const defaultValue = {}; // 등록시 초기값, 초기값을 바꾸지 않는 경우가 있어서.
        const backupValue = {};
        const changeValue = {};
        let inputActiveCount = 0;
        const submitButtonChangeDisabled = function(disabled = true) {
            $(`${submitButtonSelectorName.submit}`).prop(`disabled`, disabled);
            if (submitButtonChangeCallback !== null) {
                submitButtonChangeCallback(disabled);
            }
        }
        const checkDisabled = function() {
            let isDisabled = false;
            if (type === `add`) {
                inputActiveCount = 0;
                for (let key in backupValue) {
                    // if (changeValue.hasOwnProperty(key) === true && (String.isNullOrWhitespace(defaultValue[key]) === true && backupValue[key] === changeValue[key] || (String.isNullOrWhitespace(defaultValue[key]) === false && defaultValue[key] !== changeValue[key]))) {
                    //     isDisabled = true;
                    //     break;
                    // }
                    if (String.isNullOrWhitespace(changeValue[key]) === true) {
                        isDisabled = true;
                        break;
                    }
                    else {
                        inputActiveCount++;
                    }
                }
            }
            else if (type === `update`) {
                isDisabled = true;
                inputActiveCount = 0;
                for (let key in backupValue) {
                    if (changeValue.hasOwnProperty(key) === true && backupValue[key] !== changeValue[key] && String.isNullOrWhitespace(changeValue[key]) === false) {
                        inputActiveCount++;
                        isDisabled = false;
                        break;
                    }
                }
            }
            submitButtonChangeDisabled(isDisabled);
        }
        const valueChange = function(e) {
            const self = $(this);
            const inputName = self.attr("name");
            changeValue[inputName] = self.val();
            if ($(`${formSelectorName}`).find(`[name="${inputName}"]`).attr(`type`) === `radio` || $(`${formSelectorName}`).find(`[name="${inputName}"]`).attr(`type`) === "checkbox") {
                changeValue[inputName] = null;
                if($(`${formSelectorName}`).find(`[name="${inputName}"]:checked`).val() !== undefined) {
                    changeValue[inputName] = $(`${formSelectorName}`).find(`[name="${inputName}"]:checked`).val();
                }
            }
            checkDisabled();
        }
        const setCancelEvent = function() {
            CUSTOM.EVENT.HTML.push(`${submitButtonSelectorName.cancel}`);
            $(`${submitButtonSelectorName.cancel}`).off("click").on("click", function(){
                if (inputActiveCount > 0) {
                    let modalId = "customAlertForCancel";
                    const okBtnCallback = function (param) {
                        etc.moveBack(1, `/${GBL.CONSTANTS.get(`NOW_CONTROLLER`)}/index`);
                        modal.globalClose(param);
                    }
                    const cancelBtnCallback = function (param) {
                        modal.globalClose(param);
                    }
                    let type = `등록`;
                    if (GBL.CONSTANTS.get(`NOW_ACTION`) === `update` || GBL.CONSTANTS.get(`NOW_ACTION`) === 'edit') {
                        type = `수정`;
                    }
                    let msg = `${type}을 멈추고 목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
                    let initParameter = {
                        msg: `<p class="customAlertText">${msg}</p>`,
                        id: modalId,
                        isBackgroundClickForClose: false,
                        button: {
                            cancel: {
                                isUse: true,
                                callback: [{name: cancelBtnCallback, params: [modalId]}]
                            },
                            ok: {
                                callback: [{
                                    name: okBtnCallback, params: [modalId]
                                }]
                            },
                            del: {
                                isUse: false
                            }
                        }
                    }
                    Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
                }
                else {
                    etc.moveBack(1, `/${GBL.CONSTANTS.get(`NOW_CONTROLLER`)}/index`);
                }
            });
        }

        const activeCheck = $(`${formSelectorName}`).find(".active-check");
        // 초기값 모두 세팅
        activeCheck.each(function(index, item) {
            const input = $(item);
            const inputName = input.attr("name");
            backupValue[inputName] = input.val();
            changeValue[inputName] = input.val();
            defaultValue[inputName] = input.val();
            if ($(`${formSelectorName}`).find(`[name="${inputName}"]`).attr(`type`) === `radio` || $(`${formSelectorName}`).find(`[name="${inputName}"]`).attr(`type`) === "checkbox") {
                backupValue[inputName] = null;
                if($(`${formSelectorName}`).find(`[name="${inputName}"]:checked`).val() !== undefined) {
                    backupValue[inputName] = $(`${formSelectorName}`).find(`[name="${inputName}"]:checked`).val();
                }
            }
        });
        console.log("backupValue:::", backupValue);
        activeCheck.on("keyup", valueChange);
        activeCheck.on("change", valueChange);
        if (activeCheck.length > 0) {
            submitButtonChangeDisabled();
        }
        setCancelEvent();
    },

    stopBubbling: function(e, type = "self_all") { // action(고유 동작만 중단), bubble(버블링만 중단), self_all(자신에 등록된 핸들만 중단), all(모두 중단)
        etc.commonDivHide();
        if (type === "action" || type === "bubble" || type === "self_all" || type === "all") {
            e.preventDefault();             // 고유 동작(속성) 중단 예) href
        }
        if (type === "bubble" || type === "self_all" || type === "all") {
            e.stopPropagation();            // bubbling 중단 (해당 핸들만 모두 중단)
        }
        if (type === "all") {
            e.stopImmediatePropagation();   // bubbling 중단 (다른 곳에서도 등록한 핸들까지 모두 중단)
        }
        return null;
    },
    commonDivHide: function() {
        if(GBL.DESIGN.hasOwnProperty("COMMON_DIV_HIDE") === true) {
            if(GBL.DESIGN.COMMON_DIV_HIDE !== null) {
                for(let i = 0; i < GBL.DESIGN.COMMON_DIV_HIDE.length; i++) {
                    if($(GBL.DESIGN.COMMON_DIV_HIDE[i]).css("display") === "block") {
                        $(GBL.DESIGN.COMMON_DIV_HIDE[i]).toggle();
                    }
                }
            }
        }
    },
    windowClose: function() {
        window.close();
    },
    windowFullScreen: function(selector, exit = false) {
        if (!document.fullscreenElement) {
            if (document.querySelector(selector).requestFullscreen) {
                console.log("requestFullscreen");
                return document.querySelector(selector).requestFullscreen()
            }
            if (document.querySelector(selector).webkitRequestFullscreen) {
                console.log("webkitRequestFullscreen");
                return document.querySelector(selector).webkitRequestFullscreen()
            }
            if (document.querySelector(selector).mozRequestFullScreen) {
                console.log("mozRequestFullScreen");
                return document.querySelector(selector).mozRequestFullScreen()
            }
            if (document.querySelector(selector).msRequestFullscreen) {
                console.log("msRequestFullscreen");
                return document.querySelector(selector).msRequestFullscreen()
            }
        }
        else {
            if (document.exitFullscreen) {
                return document.exitFullscreen()
            }
            if (document.webkitCancelFullscreen) {
                return document.webkitCancelFullscreen()
            }
            if (document.mozCancelFullScreen) {
                return document.mozCancelFullScreen()
            }
            if (document.msExitFullscreen) {
                return document.msExitFullscreen()
            }
        }
    },

    nl2br: function(text, isXhtml = true) {
        const breakTag = isXhtml ? '<br />' : '<br>'
        const withBr = Handlebars.escapeExpression(text).replace(
            /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
            '$1' + breakTag + '$2'
        )
        return withBr;
    },
    // 현재 엑셀만
    whatIsFileType: function(file) {
        const _isExcelFile = function(file) {
            const excelMimeTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ];
            return excelMimeTypes.includes(file.type);
        }
        return _isExcelFile(file) === true ? `excel` : `none`;
    },
    // isExcelFile: async function(file, callback) {
    //     if (!file) {
    //         callback(false);
    //         return;
    //     }
    //
    //     const reader = new FileReader();
    //     reader.onload = async function(e) {
    //         const uint8Array = new Uint8Array(e.target.result);
    //         let isValidExcel = false;
    //
    //         // 첫 4바이트를 확인하여 Excel 파일 여부를 판단합니다.
    //         if (uint8Array && uint8Array.length > 4) {
    //             if (uint8Array[0] === 80 && uint8Array[1] === 75 && uint8Array[2] === 3 && uint8Array[3] === 4) {
    //                 isValidExcel = true; // ZIP 헤더를 기반으로 하는 Excel 2007 이후 파일 형식
    //             }
    //         }
    //         callback(isValidExcel);
    //     };
    //
    //     reader.readAsArrayBuffer(file);
    // }
}

/**
 * ajax 처리 함수
 */
let requestAPI = function() {
    this.headers = {
        "Content-Type": "application/json;charset=UTF-8"
    };
    this.dataType = "json";
    this.parameters = null;
    this.async = true;
    this.url = null;
    this.type = "POST";
    this.timeout = 30000;
    this.cache = false;
    this.successParameters = null;
    this.errorFunction = null;

    this.setHeader = function(headers) {
        this.headers = headers;
    };
    this.setDataType = function(dataType) {
        this.dataType = dataType;
    };
    this.setParameter = function(parameters) {
        this.parameters = parameters;
    };
    this.setAsync = function(async) {
        this.async = async;
    };
    this.setUrl = function(url) {
        this.url = url;
    };
    this.setType = function(type) {
        this.type = type;
    };
    this.setTimeout = function(timeout) {
        this.timeout = timeout;
    };
    this.setCache = function(cache) {
        this.cache = cache;
    };
    this.setSuccessParameters = function(parameters) {
        this.successParameters = parameters;
    };
    this.setErrorFunction = function(callback) {
        this.errorFunction = callback;
    };

    this.API = function(onSuccessFunc = null, etcParams = {isFormData: false}) {
        let isFormData = false;
        if (etcParams.hasOwnProperty("isFormData") === true) {
            isFormData = etcParams.isFormData;
        }
        let _self = this;
        let cloneObj = {
            url: this.url,
            parameters: this.parameters,
            async: this.async,
            successParameters: this.successParameters
        }
        let res = null;
        let options = {
            url: this.url,
            type: this.type,
            async: this.async,
            cache: this.cache,
            timeout: this.timeout,
            headers: this.headers,
            dataType: this.dataType,
            data: isFormData === false ? JSON.stringify(this.parameters) : this.parameters,
            success: function (data) {

                // let log = `
                //         =============== API log ===============
                //         url:::::::::::::, ${cloneObj.url}
                //         parameter::::::::, ${JSON.stringify(cloneObj.parameters)}
                //         =======================================
                // `;
                // console.log(log);

                if (data.result == false) {
                    res = data;
                    if ((data.hasOwnProperty(`error`) === true && (data.error === GBL.API.RESPONSE.CODE.SESSION_CLOSED || data.error === GBL.API.RESPONSE.CODE.ACCOUNT_INFO_FAIL)) || GBL.SITE_MENU.CHOICE_CONTROLLER === `login`) {
                        _self.errorFunction(data);
                        return;
                    }
                }
                else {
                    if (cloneObj.async === false) {
                        res = data;
                    }
                    else if (onSuccessFunc != null) {
                        res = data;
                        onSuccessFunc(data, cloneObj.parameters, cloneObj.successParameters);
                        return;
                    }
                }
            },
            error : function(xhr, ajaxOptions, thrownError) {
                console.log( xhr.status );
                console.log( xhr.statusText );
                console.log( xhr.responseText );
                console.log( xhr.readyState );
                console.log("xhr.status::::::::::", xhr.status);
                console.log("xhr.statusText::::::::::", xhr.statusText);
                console.log("xhr.responseText::::::::::", xhr.responseText);
                console.log("xhr.readyState::::::::::", xhr.readyState);
                _self.errorFunction(xhr);
                return;
            },
        };
        if (isFormData === true) {
            options['processData'] = false;
            options['contentType'] = false;
            // options['mimeType'] = "multipart/form-data";
            options['enctype'] = "multipart/form-data";
        }
        $.ajax(options);
        return res;
    };
};

/**
 * cookie 함수 모음
 */
let CookieHelper = {

    /**
     * cookie 값 할당
     * @param {string} key 쿠키 이름
     * @param {all} value 쿠키 값
     * @param {integer} days 만료기간(일단위)
     * @returns {void} 없음
     */
    set: function (key, value, days= 365 * 3) {
        // if ( days == undefined ) {
        //     days = 365 * 3;
        // }
        $.cookie(key, value, {expires: days, path: '/'});
    },

    /**
     * cookie 값 반환
     * @param {string} key 쿠키 이름
     * @returns {all} 쿠키 값
     */
    get: function (key) {
        return $.cookie(key);
    },

    /**
     * cookie 삭제
     * @param {string} key 쿠키 이름
     * @returns {void} 없음
     */
    remove: function (key) {
        $.removeCookie(key, {path: '/'});
    }
};

/**
 * modal 처리 클래스(부트스트랩 사용은 아직 문제 있음. 사용 못함. 배경이 맨 앞으로와서 클릭이 안됨)
 */
class modal {
    parentBodyClass = `custom-modal-frame`;
    backgroundClass = "layer_popup";
    contentsClass = "layer_popup_container";
    defaultZIndex = 100000;
    zIndex = 99990;
    id = null;
    draggable = false;
    child = false;
    mainContents = null;
    closeCallBackFunction = null;
    closeCallBackFunctionParams = null;
    isBackgroundClickForClose = true;
    button = null;
    modalEventCallback = null;
    styleParams = null;
    constructor(initParameter = null) {
        if (initParameter == null) {
            return;
        }
        if (initParameter.hasOwnProperty("id") === true) {
            this.id = initParameter.id;
        }
        if (initParameter.hasOwnProperty("backgroundClass") === true) {
            this.backgroundClass = `.${initParameter.backgroundClass}`;
        }
        if (initParameter.hasOwnProperty("contentsClass") === true) {
            this.contentsClass = `.${initParameter.contentsClass}`;
        }
        if (initParameter.hasOwnProperty("draggable") === true) {
            this.draggable = initParameter.draggable;
        }
        if (initParameter.hasOwnProperty("mainContents") === true) {
            this.mainContents = initParameter.mainContents;
        }
        if (initParameter.hasOwnProperty("closeCallBackFunction") === true) {
            this.closeCallBackFunction = initParameter.closeCallBackFunction;
        }
        if (initParameter.hasOwnProperty("closeCallBackFunctionParams") === true) {
            this.closeCallBackFunctionParams = initParameter.closeCallBackFunctionParams;
        }
        if (initParameter.hasOwnProperty("isBackgroundClickForClose") === true) {
            this.isBackgroundClickForClose = initParameter.isBackgroundClickForClose;
        }
        if (initParameter.hasOwnProperty("button") === true) {
            this.button = initParameter.button;
        }
        if (initParameter.hasOwnProperty("modalEventCallback") === true) {
            this.modalEventCallback = initParameter.modalEventCallback;
        }
        if (initParameter.hasOwnProperty("zIndex") === true) {
            this.zIndex = initParameter.zIndex;
        }
        else {
            let tempZindex = this.zIndex;
            $(`.${this.backgroundClass}`).each(function() {
                if (tempZindex < Number($(this).css('z-index'))) {
                    tempZindex = Number($(this).css('z-index'));
                }
            });
            this.zIndex = tempZindex + 10;
        }
        if (initParameter.hasOwnProperty("styleParams") === true) {
            this.styleParams = initParameter.styleParams;
        }
    };
    createBackground() {
        etc.setHtmlParsing($('body'), `<div class="${this.parentBodyClass}"><div class="${this.backgroundClass}" id="${this.id}_background" style="z-index: ${this.zIndex}"></div></div>`, {});
        if (this.defaultZIndex < this.zIndex) {
            $(`#${this.id}_background`).css('opacity', 0);
        }
        if (this.isBackgroundClickForClose === true) {
            $(`#${this.id}_background`).on('click', function() {
                if (this.closeCallBackFunction !== null) {
                    this.closeCallBackFunction(...this.closeCallBackFunctionParams);
                }
                this.close();
            }.bind(this));
        }
    };
    open(html, templateValue, endCallback = null) {
        if (this.id == null) {
            alert("모달 생성자 변수가 정상적이지 않습니다. 생성자 파라미터를 확인하세요");
            return;
        }
        if ($(`#${this.id}`).length <= 0) {
            this.createBackground();
            etc.setHtmlParsing($(`#${this.id}_background`).closest(`.${this.parentBodyClass}`), html, templateValue);
            if(this.defaultZIndex < this.zIndex) {
                $(`#${this.id}`).css('border', "1px solid #d2d4d6");
            }
            if (this.mainContents === null) {
                $(`#${this.id}`).css('z-index', this.zIndex + 1);
            }
            else {
                $(`#${this.mainContents}`).css('z-index', this.zIndex + 1);
            }
            if (this.draggable === true) {
                $(`#${this.id}`).draggable();
            }

            // 스크롤 높이/가로를 확인하여 더해준다.
            // custom style을 추가한다.
            if (this.styleParams !== null) {
                for(let className in this.styleParams) {
                    for(let styleKey in this.styleParams[className]) {
                        $(`${className}`).css(styleKey, this.styleParams[className][styleKey]);
                    }
                }
            }
            let height = $(document).scrollTop();
            $(`#${this.id}`).css("top", Number($(`#${this.id}`).css("top").replace("px", "")) + height);
            let left = $(document).scrollLeft();
            $(`#${this.id}`).css("left", Number($(`#${this.id}`).css("left").replace("px", "")) + left);

            if (endCallback !== null) {
                if (Array.isArray(endCallback) === true) {
                    for(let i = 0; i < endCallback.length; i++) {
                        endCallback[i].name(...endCallback[i].params);
                    }
                }
                else {
                    endCallback();
                }
            }
            this.setAddEvent();
        }
        else {
            console.log(`이미 같은 모달이 뜬 상태입니다 - ${this.id}`);
        }
    };
    close() {
        $(`#${this.id}`).closest(`.${this.parentBodyClass}`).remove();
        // $(`#${this.id}`).remove();
        // $(`#${this.id}_background`).remove();
    };
    setAddEvent() {
        let modalEventCallback = this.modalEventCallback;
        if (modalEventCallback !== null) {
            if (Array.isArray(modalEventCallback) === true) {
                for(let i = 0; i < modalEventCallback.length; i++) {
                    modalEventCallback[i].name(...modalEventCallback[i].params);
                }
            }
        }

        CUSTOM.EVENT.HTML.push(`#${this.id} .customAlertButtonForCancel`);
        let buttonInfo = this.button;
        $(`#${this.id} .customAlertButtonForCancel`).off("click").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (buttonInfo !== null) {
                if (Array.isArray(buttonInfo.cancel.callback) === true) {
                    for(let i = 0; i < buttonInfo.cancel.callback.length; i++) {
                        buttonInfo.cancel.callback[i].name(...buttonInfo.cancel.callback[i].params);
                    }
                }
            }
        });

        CUSTOM.EVENT.HTML.push(`#${this.id} .customAlertButtonForOk`);
        $(`#${this.id} .customAlertButtonForOk`).off("click").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (buttonInfo !== null) {
                if (Array.isArray(buttonInfo.ok.callback) === true) {
                    for(let i = 0; i < buttonInfo.ok.callback.length; i++) {
                        buttonInfo.ok.callback[i].name(...buttonInfo.ok.callback[i].params);
                    }
                }
            }
        });

        CUSTOM.EVENT.HTML.push(`#${this.id} .customAlertButtonForDelete`);
        $(`#${this.id} .customAlertButtonForDelete`).off("click").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (buttonInfo !== null) {
                if (Array.isArray(buttonInfo.del.callback) === true) {
                    for(let i = 0; i < buttonInfo.del.callback.length; i++) {
                        buttonInfo.del.callback[i].name(...buttonInfo.del.callback[i].params);
                    }
                }
            }
        });
    };
    static globalClose(id, parentBodyClass = null) {
        if (parentBodyClass !== null) {
            $(`#${id}`).closest(`.${parentBodyClass}`).remove();
        }
        else {
            if($(`#${id}`).parent().hasClass("custom-modal-frame")) {
                $(`#${id}`).parent().remove();
            }
            $(`#${id}`).remove();
            $(`#${id}_background`).remove();
        }
    };
}
// 사용에 문제가 아직 있다..
const bootStrapModal = {

    init: function(id, html, callback = null) {
        const modalId = '#' + id;
        bootStrapModal.open(modalId);
        if (callback !== null) {
            callback(modalId);
        }
        $(modalId).find('[type="button"]').click(function (e) {
            e.preventDefault();
            let buttonObj = $(this);
            if (buttonObj.attr('name') == "formInit") {
                return;
            }
            bootStrapModal.close(modalId);

            const removeModal = setTimeout(function () {
                clearTimeout(removeModal);
                $(modalId).remove();
            }, 300);
        });
    },

    open: function (modalId, options = null) {
        $(modalId).modal('show');
    },

    close: function (modalId) {
        $(modalId).modal('hide');
    }
};

const webSocket = function() {
    const streamServer = {};
    const streamServerConnected = {};
    const subScribeUrl = {};
    const receivedFunc = {};
    const unsubscribedFunc = {};
    const ignoreKey = [
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        `MEASUREMENT-EVENT` // 어쩔수 없이 하드코딩, const 파일 로딩을 할 수 없다. sync 로 처리되어야 한다.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ];
    // 채팅서버처럼 query string을 전달시 소켓이 연결이 안되는 문제 해결을 위해서
    const _exceptionHandling = function(url) {
        // 아래 영역에 코드 작성(아래 주석은 예시)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // if (url === `https://chat-api.seers-visual-system.link/seers`) {
        //     return `STREAM-SERVER-CHATTING`
        // }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        return null;
    }
    const stompOnConnected = function() {
        const tempParameter = String.getUrlParam(this.ws.url);
        let checkKey = null;
        if (tempParameter.hasOwnProperty(`key`) === true) {
            checkKey = tempParameter.key;
        }
        if (checkKey === null) {
            checkKey = _exceptionHandling(this.ws.url);
        }
        if (checkKey !== null) {
            streamServerConnected[checkKey] = true;
            showSiteLoadingLog(`소켓 / ${checkKey} / 연결`, `#111111`, `#a5a3a4`);
        }
    }
    const stompOnMessageReceived = function(response) {
        // for (let i = 0; i < receivedFunc.length; i++) {
        //     receivedFunc[i](JSON.parse(response.body));
        // }
        for (let key in  receivedFunc) {
            receivedFunc[key](JSON.parse(response.body));
        }
    }
    const stompOnError = function(error) {
        console.log("error::::::::::::", error);
        if(GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER(0, true) !== "login" && GBL.WINDOW_HISTORY_STATE.GET_NOW_CONTROLLER(0, true) !== "logout") {
            let modalId = "customAlert";
            let initParameter = {
                msg: `알 수 없는 문제로 네트웍이 끊겼습니다. 잠시 후 재시작을 합니다!11111`,
                id: modalId,
                isBackgroundClickForClose: false,
                modalEventCallback: [
                    {
                        name: custom.etc.reStart,
                        params: [undefined]
                    }
                ],
                button: {
                    ok: {
                        isUse: false,
                    },
                    del: {
                        isUse: false
                    },
                    cancel: {
                        isUse: false
                    }
                }
            }
            Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
        }
    }
    const loadingEnd = function() {
        // console.log("file loading end:::");
    }
    let fileLoading = new preFileLoading();
    fileLoading.setInit({
        files: [
            `/js/util/socket/sockjs-1.5.0.js${ver_string}`,
            `/js/util/socket/stomp-1.7.1.js${ver_string}`
        ],
        errorAfterType: "stop",
        callback: loadingEnd
    });
    fileLoading.run();

    return {
        runStreamServer: function(key, url, parameters = {}) {
            // 소켓 관련 파일 로딩이 늦어지는 경우가 있어서.
            try {
                if (streamServer.hasOwnProperty(key) === false) {
                    streamServerConnected[key] = false;
                    streamServer[key] = Stomp.over(new SockJS(url));
                    streamServer[key].debug = null;
                    streamServer[key].connect(parameters, stompOnConnected, stompOnError);
                }
                else {
                    return false;
                }
            }
            catch(e) {
                let _t = this;
                setTimeout(function() {
                    _t.runStreamServer(key, url, parameters);
                }, 100);
            }
        },
        runSubScribe: function(mainKey, key, url, receiveFunc, unsubscribeFunc = null, params = null) {
            if (streamServerConnected.hasOwnProperty(mainKey) === true && streamServerConnected[mainKey] === true) {
                const checkKey = key.indexOf(`::`) !== -1 ? key.split(`::`)[0] : key;
                if (receivedFunc.hasOwnProperty(checkKey) === false) {
                    receivedFunc[checkKey] = receiveFunc;
                    if (unsubscribeFunc !== null) {
                        unsubscribedFunc[checkKey] = unsubscribeFunc;
                    }
                }
                subScribeUrl[key] = streamServer[mainKey].subscribe(url, stompOnMessageReceived, params);
                showSiteLoadingLog(`구독 / ${mainKey} > ${key} / 연결`, `#111111`, `#a5a3a4`);
            }
            else {
                let _t = this;
                setTimeout(function() {
                    _t.runSubScribe(mainKey, key, url, receiveFunc, unsubscribeFunc);
                }, 100);
            }
        },
        runAllUnsubscribe: function() {
            for (let key in subScribeUrl) {
                let isIgnore = true;
                for (let i = 0; i < ignoreKey.length; i++) {
                    if (key.indexOf(ignoreKey[i]) !== -1) {
                        isIgnore = false;
                    }
                }
                if(isIgnore === true) {
                    let _k = key.split("::");
                    this.runUnsubscribe(key, {
                        measurementCode: _k[1] !== undefined ? _k[1] : null
                    });
                }
            }
            return null;
        },
        runUnsubscribe: function(key = null, addParams = null) {
            if (key === null) {
                return false;
            }
            const checkKey = key.indexOf(`::`) !== -1 ? key.split(`::`)[0] : key;
            subScribeUrl[key].unsubscribe();
            delete subScribeUrl[key];
            if (unsubscribedFunc.hasOwnProperty(checkKey) === true) {
                unsubscribedFunc[checkKey](addParams);
            }
            return null;
        },
        runAllStreamDisConnect: function() {
            for (let key in streamServer) {
                streamServer[key].disconnect();
            }
        },
        streamServer: streamServer,
        streamServerConnected: streamServerConnected,
        subScribeUrl: subScribeUrl
    }
}

/**
 * 하위 페이지에서 일정 시간마다 새로고침 처리하는 클래스
 * 하나의 페이이제서는 하나의 새로고침만 있을 확률이 크나, 여러개를 동시에 처리할 수 있게 한다.
 */
class Refresh {
    // 변수 앞에 `#`를 하면, private 변수로 선언이 되어, 외부에서 접근이 안된다.
    // 접근을 하려고 하면 에러가 난다.
    // Uncaught (in promise) SyntaxError: Private field '#type' must be declared in an enclosing class
    #type = `timeout`; // timeout, interval
    #mode = `test`; // test, real
    #term = 60 * 10 * 1000; // 10분
    #testTerm = 10 * 1000 // 10초
    #searchTerm = 60 * 10 * 1000; // 10분
    #object = null;
    #callback = {
        func: null,
        params: null
    }
    constructor(initParameter = null) {
        if (initParameter === null) {
            return;
        }
        // 아래 세팅하는 부분을 단순화해서 사용 가능할 것 같은데, 못찾음
        if (initParameter.hasOwnProperty(`#type`) === true) {
            this.#type = initParameter['#type'];
        }
        if (initParameter.hasOwnProperty(`#mode`) === true) {
            this.#mode = initParameter['#mode']
        }
        if (initParameter.hasOwnProperty(`#term`) === true) {
            this.#term = initParameter['#term']
        }
        if (initParameter.hasOwnProperty(`#testTerm`) === true) {
            this.#testTerm = initParameter['#testTerm']
        }
        if (initParameter.hasOwnProperty(`#callback`) === true) {
            this.#callback = initParameter['#callback']
        }
        this.#searchTerm = this.#mode === `real` ? this.#term : this.#testTerm;
    }
    #_run = function() {
        if (this.#callback.func !== null) {
            this.#callback.func(...this.#callback.params);
        }
    }
    clear() {
        if (this.#object !== null) {
            if (this.#type === `timeout`) {
                clearTimeout(this.#object);
            }
            else {
                clearInterval(this.#object)
            }
        }
    }
    run = function() {
        if (this.#object !== null) {
            this.clear();
        }
        const refreshThis = this;
        if (this.#type === `timeout`) {
            this.#object = setTimeout(function() {
                refreshThis.#_run();
            }, this.#searchTerm);
        }
        else {
            this.#object = setInterval(function() {
                refreshThis.#_run();
            }, this.#searchTerm);
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object 확장 함수 모음
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Array object 확장
 */
if (typeof Array.deepCopy !== "function") {
    /**
     * array의 주소 할당이 아닌, 값 복사 처리
     * @param {array} targetArray 복사를 하려는 array
     * @returns {array} 복사된 배열
     */
    Array.deepCopy = function(targetArray, type = null) {
        // 구조분해는 얕은 복사만 되서 사용할 수 없다.
        // if (targetArray.hasOwnProperty("length") === true) {
        //     return [...targetArray];
        // }
        // else {
        //     return {...targetArray};
        // }
        let processType = GBL.DEEP_COPY.TYPE;
        if (type !== null) {
            processType = type;
        }
        if (processType === "stringify") {
            return JSON.parse(JSON.stringify(targetArray));
        }
        else if (processType === "cloneDeep") {
            return _.cloneDeep(targetArray);
        }
        else if (processType  === "structuredClone") {
            try {
                return structuredClone(targetArray);
            }
            catch(e) {
                return JSON.parse(JSON.stringify(targetArray));
            }
        }
        else { // 기본 stringify
            return JSON.parse(JSON.stringify(targetArray));
        }
    }
}
if (typeof Array.average !== "function") {
    Array.average = function(array) {
        return array.reduce((sum, current) => sum + current, 0) / array.length;
    }
}
if (typeof Array.averageForColumn !== "function") {
    Array.averageForColumn = function(datas, column) {
        let array = [];
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].hasOwnProperty(column) === true) {
                array.push(datas[i][column]);
            }
        }
        return Array.average(array);
    }
}
if (typeof Array.random !== "function") {
    Array.random = function(type = `key`, array) {
        if (type === `key`) {
            return Math.floor(Math.random() * array.length);
        }
        else {
            return array[Math.floor(Math.random() * array.length)];
        }
    }
}

/**
 * String object 확장
 */
if (typeof String.isNullOrWhitespace !== "function") {
    /**
     * Whitespace 거나 NULL 이면 true 반환
     *
     * @param {string} text
     * @returns {boolean}
     */
    String.isNullOrWhitespace = function (text) {
        if (typeof(text) === `undefined`) {
            return true;
        }
        if (text === null || text === ``) {
            return true;
        }
        if (typeof text === `string` && text.trim().length === 0) {
            return true;
        }
        if (typeof text === `object` && Object.keys(text).length === 0) {
            return true;
        }
        return false;
    }
}
if (typeof String.getValidValue !== "function") {
    String.getValidValue = function (value) {
        return String.isNullOrWhitespace(value) ? null : (typeof value === "string" ? value.trim(): value);
    }
}
if (typeof String.getUrlParam !== "function") {
    String.getUrlParam = function (url) {
        if (url == null) {
            return null;
        }
        let params = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str,key,value) {
            params[key] = decodeURIComponent(value);
        });
        return params;
    }
}
if (typeof String.setFillString !== "function") {
    String.setFillString = function (value, length, fillString = "0", type = "start") {
        if (typeof value === "number") {
            value = String(value);
        }
        if (typeof value !== "string") {
            return value
        }
        if (type == "start") {
            return value.padStart(length, fillString);
        }
        else if (type == "end") {
            return value.padEnd(length, fillString);
        }
        return value;
    }
}
if (typeof String.phoneFormatter !== "function") {
    String.phoneFormatter = function (num, useStar = false) {
        let formatNum = "";
        if (num.length == 11) {
            if (useStar === true) {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
            }
            else {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        }
        return formatNum;
    }
}
if (typeof String.isJson !== "function") {
    String.isJson = function (str) {
        try {
            let jsonObject = JSON.parse(str);
            if (typeof jsonObject === 'object') {
                return jsonObject
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}
if (typeof String.generateRandom !== "function") {
    String.generateRandom = function (num) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}

/**
 * Number object 확장
 */
if (typeof Number.comma !== "function") {
    Number.comma = function (number, options = {maximumFractionDigits: 4, useZero: false}) {
        if (options.useZero === false) {
            if (number === 0 || number === "0" || number === null) {
                return "-";
            }
        }
        else {
            if (number === null) {
                return "-";
            }
        }
        return number.toLocaleString('ko-KR', options);
    }
}
if (typeof Number.lcm !== "function") {
    Number.lcm = function (num1, num2, scale = 1) {
        let tNum1 = num1 * scale;
        let tNum2 = num2 * scale;
        // 최대공약수
        let gcd = function(minNum, maxNum){
            return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
        }
        // 최소공배수
        let lcm = function(minNum, maxNum){
            return minNum * maxNum / gcd(minNum, maxNum);
        }

        let minNum = Math.min(tNum1, tNum2);
        let maxNum = Math.max(tNum1, tNum2);
        let tGcd = gcd(minNum, maxNum);
        let tLcm = lcm(minNum, maxNum);
        return tLcm / scale;
    }
}
if (typeof Number.getStartVirtualNumber !== "function") {
    Number.getStartVirtualNumber = function(totalDataCount = 0, dataPerCount = 10, page = 1) {
        if (totalDataCount === 0) {
            return 0;
        }
        return totalDataCount - (dataPerCount * (page - 1));
    }
}
if (typeof Number.formatBytes !== "function") {
    Number.formatBytes = function(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
if (typeof Number.getRandomInt !== "function") {
    Number.getRandomInt = function(max = 1, min = 0) {
        return Math.floor(Math.random() * max) + min;
    }
}
if (typeof Number.percent !== "function") {
    Number.percent = function(total, slice) {
        if (total == 0 && slice ==0){
            return 0;
        }
        return Math.round((slice / total) * 100);
    }
}
if (typeof Number.max !== "function") {
    Number.max = function(data, key) {
        let checkArray = data.map(row => row[key]);
        return Math.max(...checkArray);
    }
}
if (typeof Number.min !== "function") {
    Number.min = function(data, key) {
        let checkArray = data.map(row => row[key]);
        return Math.min(...checkArray);
    }
}
/**
 * Date object 확장
 */
if (typeof Date.getNowStamp !== "function") {
    Date.getNowStamp = function() {
        return new Date().getTime();
    }
}
if (typeof Date.getNow !== "function") {
    Date.getNow = function(format = "yyyy-MM-dd HH:mm:ss", setDateString = null, addSeconds = null) {
        if (setDateString === null) {
            if (addSeconds !== null) {
                let addDateObj = Date.addSeconds(new Date().toString("yyyy-MM-dd HH:mm:ss"), addSeconds);
                return addDateObj.toString(format);
            }
            else {

            }
            return new Date().toString(format);
        }
        else {
            return new Date(setDateString).toString(format);
        }
    }
}
if (typeof Date.elapsedSeconds !== "function") {
    Date.elapsedSeconds = function(baseDate = null, targetDate = new Date()) {
        if (baseDate === null) {
            return 0;
        }
        return (targetDate.getTime() - baseDate.getTime()) / 1000;
    }
}
if (typeof Date.elapsedTimeForDurationSeconds !== "function") {
    Date.elapsedTimeForDurationSeconds = function(type = "year", duration = null) {
        if (duration === null) {
            return "-";
        }

        // 지난 최종 초..
        let elapsedSeconds = Math.round(duration);
        if (type === "year") {
            return Math.ceil(elapsedSeconds / (86400 * 365));
        }
        if (type === "month") {
            return Math.ceil(elapsedSeconds / (86400 * 30));
        }
        if (type === "day") {
            return Math.ceil(elapsedSeconds / (86400 * 1));
        }
        if (type === "hour") {
            return Math.ceil(elapsedSeconds / (60 * 60));
        }
        if (type === "minute") {
            return Math.ceil(elapsedSeconds / (60 * 1));
        }
        if (type === "seconds") {
            return elapsedSeconds;
        }
        if (type === "d_h_m_s") {
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}h ${String.setFillString(m, 2)}m ${String.setFillString(s, 2)}s`;
            }
            else if (elapsedSeconds === 0) {
                return `00D 00h 00m 00s`;
            }
            else {
                return `00D 00h 00m ${String.setFillString(elapsedSeconds, 2)}s`;
            }
        }
        if(type ==="D_H_M"){
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}H ${String.setFillString(m, 2)}M`;
            }
        }
        if (type === "d_h_m") {
            if (elapsedSeconds > 60) {
                let d = Math.floor(elapsedSeconds / (3600*24));
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                return `${String.setFillString(d, 2)}D ${String.setFillString(h, 2)}h ${String.setFillString(m, 2)}m`;
            }
            else if (elapsedSeconds === 0) {
                return `00:00:00`;
            }
            else {
                return `00:00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
        if (type === "h_m_s") {
            if (elapsedSeconds > 60) {
                let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(h, 2)}:${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
            }
            else if (elapsedSeconds === 0) {
                return `00:00:00`;
            }
            else {
                return `00:00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
        if (type === "m_s") {
            if (elapsedSeconds > 60) {
                let m = Math.floor(elapsedSeconds % 3600 / 60);
                let s = Math.floor(elapsedSeconds % 60);
                return `${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
            }
            else {
                return `00:${String.setFillString(elapsedSeconds, 2)}`;
            }
        }
    }
}
if (typeof Date.elapsedTime !== "function") {
    // type: year(기준시간부터 비교시간까지의 흐른 년도), month(기준시간부터 비교시간까지의 흐른 월), day(기준시간부터 비교시간까지의 흐른 일),
    Date.elapsedTime = function(type = "year", baseDateString = null, targetDateString = null) {
        if (baseDateString === null) {
            return "-";
        }
        let baseDate = new Date(baseDateString);
        let targetDate = new Date();
        if (targetDateString !== null) {
            targetDate = new Date(targetDateString);
        }
        // 지난 최종 초..
        let elapsedSeconds = Date.elapsedSeconds(baseDate, targetDate);
        return Date.elapsedTimeForDurationSeconds(type, elapsedSeconds);
        // if (type === "year") {
        //     return Math.ceil(elapsedSeconds / (86400 * 365));
        // }
        // if (type === "month") {
        //     return Math.ceil(elapsedSeconds / (86400 * 30));
        // }
        // if (type === "day") {
        //     return Math.ceil(elapsedSeconds / (86400 * 1));
        // }
        // if (type === "hour") {
        //     return Math.ceil(elapsedSeconds / (60 * 60));
        // }
        // if (type === "minute") {
        //     return Math.ceil(elapsedSeconds / (60 * 1));
        // }
        // if (type === "seconds") {
        //     return elapsedSeconds;
        // }
        // if (type === "h_m_s") {
        //     if (elapsedSeconds > 60) {
        //         let h = Math.floor(elapsedSeconds % (3600*24) / 3600);
        //         let m = Math.floor(elapsedSeconds % 3600 / 60);
        //         let s = Math.floor(elapsedSeconds % 60);
        //         return `${String.setFillString(h, 2)}:${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
        //     }
        //     else {
        //         return `00:00:${String.setFillString(elapsedSeconds, 2)}`;
        //     }
        // }
        // if (type === "m_s") {
        //     if (elapsedSeconds > 60) {
        //         let m = Math.floor(elapsedSeconds % 3600 / 60);
        //         let s = Math.floor(elapsedSeconds % 60);
        //         return `${String.setFillString(m, 2)}:${String.setFillString(s, 2)}`;
        //     }
        //     else {
        //         return `00:${String.setFillString(elapsedSeconds, 2)}`;
        //     }
        // }
    }
}
if (typeof Date.addSeconds !== "function") {
    Date.addSeconds = function(date, units) {
        let ret = new Date(date); //don't change original date
        ret.setTime(ret.getTime() + units * 1000);
        return ret;
    }
}
if (typeof Date.sleep !== "function") {
    Date.sleep = function(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }
}
if (typeof Date.checkBefore !== "function") {
    Date.checkBefore = function(targetDateString = null) {
        if (targetDateString === null) {
            return false;
        }
        let now = new Date();
        let check = new Date(targetDateString);
        if (now < check) {
            return true;
        }
        return false;
    }
}
Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};