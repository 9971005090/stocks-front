"use strict";

/**
 * @file 전체 메뉴에서 사용되는 custom 이벤트 정의 파일
 * @version 0.0.1
 * @description 전체 메뉴에서 사용되는 custom 이벤트 정의 파일
 * @author ella
 */


export const UTIL = {
    DELETE_ALERT: function(callbackFunction= null, param=null, callbackFunctionSearch = null, pathName=null, search='search', text="삭제"){
        const modalId = "customAlertPushDelete";
        const okBtnCallback = function () {
            const response = callbackFunction(param);
            if (response.result === true) {
                custom.etc.customToastForColor(`정상적으로 ${text}됐습니다.`);
            }
            else {
                custom.etc.customToastForColor(`${text}에 실패했습니다. 잠시 후 다시 시도하세요.`, `bgRed`);
            }
            modal.globalClose(modalId);
            callbackFunctionSearch(search, pathName);
        }

        const cancelBtnCallback = function () {
            modal.globalClose(modalId);
        }
        let initParameter = {
            msg: `<p class="customAlertText">정말 ${text} 하시겠습니까?</p>`,
            id: modalId,
            isBackgroundClickForClose: false,
            button: {
                cancel: {
                    callback :[{ name: cancelBtnCallback, params: [] }]
                },
                ok : {
                    callback :[{ name: okBtnCallback, params: [] }]
                },
                del: {
                    isUse: false
                }
            }
        }
        Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
    },
    MOVE_LIST: function(parms = null){
        const menuName = parms;
        CUSTOM.EVENT.HTML.push(".btn-go-list");
        $(".btn-go-list").off("click").on("click", function(){
            let modalId = "customAlert";
            const okBtnCallback = function (param) {
                etc.move(`/${menuName}/index`);
                modal.globalClose(param);
            }
            const cancelBtnCallback = function (param) {
                modal.globalClose(param);
            }
            let msg = ``;
            if(GBL.CONSTANTS.get(`NOW_ACTION`).indexOf(`add`) !== -1) {
                msg =`등록을 멈추고 목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
            }
            else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "update") {
                msg =`정보 수정을 멈추고 목록 화면으로 이동하시겠습니까?<br>수정된 내용은 모두 삭제됩니다.`;
            }
            else if(GBL.CONSTANTS.get(`NOW_ACTION`) === "dynamic") {
                msg =`목록 화면으로 이동하시겠습니까?<br>입력 하신 내용은 모두 삭제됩니다.`;
            }
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
        });
    },
}

export const EVENT = {
    ALL_CHECK : function(allCheckId = `#listAllCheck`, tableId = `#contents-by-data-table`){
        CUSTOM.EVENT.HTML.push(allCheckId);
        $(allCheckId).off("click").on("click", function() {
            if($(allCheckId).is(":checked")) $(`${tableId} .input[type="checkbox"]`).prop("checked", true);
            else $(`${tableId} .input[type="checkbox"]`).prop("checked", false);
        });

        CUSTOM.EVENT.HTML.push(`${tableId} .input[type="checkbox"]`)
        $(`${tableId} .input[type="checkbox"]`).click(function() {
            let total = $(`${tableId} .input[type="checkbox"]`).length;
            let checked = $(`${tableId} .input[type="checkbox"]:checked`).length;

            if(total !== checked) $(allCheckId).prop("checked", false);
            else $(allCheckId).prop("checked", true);
        });
    },
    BUTTON_ADD: function(apiName, buttonClass= `.btn-add`, organizationCode = null) {
        let url = `/${apiName}/add`;
        if (organizationCode !== null) {
            url = `${url}?organizationCode=${organizationCode}`;
        }
        CUSTOM.EVENT.HTML.push(buttonClass);
        $(buttonClass).off("click").on("click", function() {
            etc.move(url);
        })
    },
    BUTTON_UPDATE: function(apiName, dataAttr, buttonClass=`.button-update`){
        CUSTOM.EVENT.HTML.push(buttonClass);
        $(buttonClass).off("click").on("click", function (e) {
            etc.stopBubbling(e);
            etc.move(`/${apiName}/update?code=${$(this).closest('.cm-tr').attr(dataAttr)}`);
        });
    },
    SUBMIT_EVENT: function(apiCurrentPage = null, callbackFunction, callbackFunctionParam, parameter= null, currentPageValue=1, formClass=`.form-common-search`){
        CUSTOM.EVENT.HTML.push(formClass);
        $(formClass).off("submit").on("submit", function (e) {
            etc.stopBubbling(e);
            if (apiCurrentPage !== null) {
                $(apiCurrentPage).val(currentPageValue);
            }
            callbackFunction(callbackFunctionParam, parameter);
        });
    },
}
