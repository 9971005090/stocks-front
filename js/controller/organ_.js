"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: ORGAN_CONST} = await import(`/js/custom/constant/organ/constant.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    const {EVENT: SEARCH_TERM_EVENT, UTIL: SEARCH_TERM_UTIL} = await import(`/js/custom/constant/event/search-term.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/organ.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);
    let modUserCode = null;

    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    // `/js/util/jquery/jquery-ui-1.12.1.css${ver_string}`,
                    `/js/util/jquery/jquery-ui.css${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    // `/js/util/jquery/jquery-ui-timepicker-addon.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/jquery-ui-timepicker-addon.css${ver_string}`,
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    const _search = function(type = `search`) { //first, search_managerUse
        let colspan = 9;
        $(`${ORGAN_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        const currentPage = $(`#account_currentPage`).length > 0 ? Number($(`#account_currentPage`).val()) : 1;
        const params = {
            'search': $(`.form-common-search-keyword`).val(),
            'pageNumber': currentPage,
            'count': DEFAULT_CONST.PAGING.DATA_COUNT,
            'expiration': $(`.radio-input[name="expiration"]:checked`).val(),
        }
        if($("#searchOrganSelectBox .check").val() === "all"){
            delete params.searchOrganizationCode;
        }
        const _t = ORGAN_UTIL.PAGE(params);
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.organizationList !== null && _t.organizationList.length > 0) {
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.organizationList.length; i++) {
                    _t.organizationList[i] = ORGAN_UTIL.DATA_PARSING(_t.organizationList[i]);
                    _t.organizationList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${ORGAN_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${ORGAN_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.organizationList});
                setAddEvent(`datas`);
            }
            else {
                $(`${ORGAN_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }

            // 페이징 처리 파라미터 셋팅 및 호출
            let pagingParameter = {
                prefix: "account",
                divName: ".pagination",
                totalData: _t.totalCount,
                callback: _search,
                callbackRun: false,
                dataPerPage: DEFAULT_CONST.PAGING.DATA_COUNT
            }
            if($(`#${pagingParameter.prefix}_currentPage`).length > 0) {
                pagingParameter.currentPage = Number($(`#${pagingParameter.prefix}_currentPage`).val());
                pagingParameter.dataPerPage = Number($(`#${pagingParameter.prefix}_dataPerPage`).val());
                pagingParameter.pageCount = Number($(`#${pagingParameter.prefix}_pageCount`).val());
            }

            if(_t.userAccountSimpleList === null){
                pagingParameter.totalData = 0;
            }
            Seers.Loader.moduleLoad("paging", "index", pagingParameter);

            if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
                $(".btn-delete").text("비활성화").removeClass("btn-restore");
                $(".btn-all-delete").text("선택 비활성화").removeClass("btn-all-restore");
            } else{
                $(".btn-delete").text("활성화").addClass("btn-restore");
                $(".btn-all-delete").text("선택 활성화").addClass("btn-all-restore");
            }
        }
        else {
            $(`${ORGAN_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }

    const selectBoxSyncHis = function(selectBoxId = null, searchAll = false){
        let selectBoxHTML = "";
        if(searchAll === true){
            selectBoxHTML += `<li class="option-item" data-type="syncHis" data-code="all">전체</li>`;
        }
        for (let key in ORGAN_CONST.SYNC_HIS.CODE) {
            selectBoxHTML += `<li class="option-item" data-type="syncHis" data-code="${ORGAN_CONST.SYNC_HIS.CODE[key]}">${ORGAN_CONST.SYNC_HIS.TITLE[`${ORGAN_CONST.SYNC_HIS.CODE[key]}`]}</li>`;
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    }

    const selectBoxDeviceManager = function(selectBoxId = null,  searchAll = false){
        let selectBoxHTML = "";
        if(searchAll === true){
            selectBoxHTML += `<li class="option-item" data-type="device" data-code="all">전체</li>`;
        }
        for (let key in ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE) {
            selectBoxHTML += `<li class="option-item" data-type="device" data-code="${ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE[key]}">${ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE[`${ORGAN_CONST.DEVICE_MANAGER_TYPE.CODE[key]}`]}</li>`;
        }
        $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    }

    const setAddEvent = function(content = `index`){
        const selectBoxCallback = function (choiceBox) {
            let selectObj = $(choiceBox).parents(".cm-select-box");
            selectObj.children(".check").val($(choiceBox).data("code"));
        }
        SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);

        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`organ`);

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#organ_currentPage`, _search, 'search');
        }
        else if (content === `datas`) {
            // 수정버튼 클릭이동
            CUSTOM_EVENT.BUTTON_UPDATE(`organ`,`data-code`);

            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            CUSTOM.EVENT.HTML.push(`.btn-all-delete`);
            $(".btn-all-delete").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let deleteList = [];
                $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked")){
                        deleteList.push($(items).parents(".cm-tr").data("code"));
                    }
                });
                let parameter={
                    'organizationCodeList': deleteList,
                }
                let text;
                if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
                    parameter["expiration"] = 1
                    text = "비활성화";
                }
                else {
                    parameter['expiration'] = 0
                    text = "활성화";
                }
                CUSTOM_UTIL.DELETE_ALERT(ORGAN_UTIL.UPDATE_EXPIRATION_LIST, parameter, _search, null, null, text);
                $(`#listAllCheck`).prop("checked", false)
            });

            CUSTOM.EVENT.HTML.push(`.btn-delete`);
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let deleteList = [];
                deleteList.push($(this).parents('.cm-tr').data('code'));
                let parameter={
                    'organizationCodeList': deleteList,
                }
                let text;
                if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
                    parameter["expiration"] = 1
                    text = "비활성화";
                }
                else {
                    parameter['expiration'] = 0
                    text = "활성화";
                }
                CUSTOM_UTIL.DELETE_ALERT(ORGAN_UTIL.UPDATE_EXPIRATION_LIST, parameter, _search, null, null, text);

            });
        }
        else if (content === `add`){
            const checkInsertInfo = function(param = null){
                if(!param){
                    return false;
                }
                let msg = "";
                const _checkValidCode = ORGAN_UTIL.SELECT(param.organizationCode);
                let emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if(param.systemManager){
                    if(!param.systemManager.match(emailCheck)){
                        msg = "이메일을 확인해주세요.";
                    }
                }
                else if(_checkValidCode.organization !== null){
                    msg = "코드가 중복됩니다. 다른 코드를 사용해주세요.";
                }
                if(msg === ""){
                    return true;
                }
                else {
                    custom.etc.customToastForColor(msg, `bgRed`);
                    etc.isFormSubmit("form-data", "end");
                    return false;
                }
            }

            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, null, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    if(form[`organizationCode`] !== null && form[`organizationName`] !== null && form[`syncHis`] !== null && form[`deviceManagerType`]){
                        const params = {
                            "organizationCode" : form[`organizationCode`],
                            "organizationName" : form[`organizationName`],
                            "syncHis" : form[`syncHis`],
                            "deviceManagerType" : form[`deviceManagerType`],
                            "systemManager" : form[`systemManager`],
                            "etc" : form[`etc`],
                            // "expirationDateTime": `${form[`expirationDateTime`]} 23:59:59`,
                        }

                        if(checkInsertInfo(params)){
                            const _t = ORGAN_UTIL.INSERT(params);
                            etc.isFormSubmit("form-data", "end");
                            if (_t.result === true) {
                                let processEnd = function(mode = `list`) { //list, add
                                    if (mode === `list`) {
                                        etc.move(`/organ/index`);
                                    }
                                    else {
                                        location.reload();
                                    }
                                }
                                let modalId = "customAlertForPushAdd";
                                let initParameter = {
                                    msg: `<p class="customAlertText">등록이 완료됐습니다.</p>`,
                                    id: modalId,
                                    isBackgroundClickForClose: false,
                                    button: {
                                        ok: {
                                            callback: [
                                                {
                                                    name: processEnd,
                                                    params: ['list']
                                                },
                                                {
                                                    name: modal.globalClose,
                                                    params: [modalId]
                                                }
                                            ]
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
                            else{
                                custom.etc.customToastForColor(`등록에 실패하였습니다.`, `bgRed`);
                                etc.isFormSubmit("form-data", "end");
                            }
                        }
                    }
                }
            });

        }
        else if (content === `update`) {
            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, null, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    const params = {
                        "organizationCode" : form[`organizationCode`],
                        "organizationName" : form[`organizationName`],
                        "syncHis" : form[`syncHis`],
                        "deviceManagerType" : form[`deviceManagerType`],
                        "systemManager" : form[`systemManager`],
                        "etc" : form[`etc`],
                        "expirationDateTime": `${form[`expirationDateTime`]} 23:59:59`,
                        "targetOrganizationCode": form[`organizationCode`],
                    }
                    const _t = ORGAN_UTIL.UPDATE(params);
                    if (_t === undefined) {
                        custom.etc.customToastForError("정보 수정에 실패하였습니다.");
                    }
                    else {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/organ/index`);
                            }
                            else {
                                location.reload();
                            }
                        }
                        let modalId = "customAlert";
                        let initParameter = {
                            msg: `수정됐습니다.`,
                            id: modalId,
                            isBackgroundClickForClose: false,
                            button: {
                                ok: {
                                    callback: [
                                        {
                                            name: processEnd,
                                            params: ['list']
                                        },
                                        {
                                            name: modal.globalClose,
                                            params: [modalId]
                                        }
                                    ]
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
            });
        }
        CUSTOM_UTIL.MOVE_LIST("organ");
    }

    const index = function() {
        const _c = {
            SYNC_HIS: Array.deepCopy(ORGAN_CONST.SYNC_HIS.TITLE),
            DEVICE_MANAGER_TYPE: Array.deepCopy(ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE),
            EXPIRATION_TYPE: Array.deepCopy(ORGAN_CONST.EXPIRATION_TYPE.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        selectBoxSyncHis(`searchSyncHisSelectBox`, true);
        selectBoxDeviceManager(`searchDeviceManagerSelectBox`, true);
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    const add = function(){
        const _c = {
            SYNC_HIS: Array.deepCopy(ORGAN_CONST.SYNC_HIS.TITLE),
            DEVICE_MANAGER_TYPE: Array.deepCopy(ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE),
            EXPIRATION_TYPE: Array.deepCopy(ORGAN_CONST.EXPIRATION_TYPE.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`});
        // 등록시에는 기본값으로, 수정시에만 종료일 변경 가능
        // SEARCH_TERM_UTIL.SET_UNIT_INIT(`#expiration-date-time`, {paramMaxDate: new Date().addYears(500).toString(`yyyy-MM-dd`), showTimepicker: false});
        setAddEvent("add");
        custom.etc.removeLoading();
    }

    const update = function(params = null){
        const _c = {
            SYNC_HIS: Array.deepCopy(ORGAN_CONST.SYNC_HIS.TITLE),
            DEVICE_MANAGER_TYPE: Array.deepCopy(ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE),
            EXPIRATION_TYPE: Array.deepCopy(ORGAN_CONST.EXPIRATION_TYPE.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        const _t = ORGAN_UTIL.SELECT(params.code);
        if (_t.result === true) {
            $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
            etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.update, {title: `수정`, datas: _t.organization});
            if(_t.organization){
                modUserCode = _t.organization.userCode;
            }
            // SEARCH_TERM_UTIL.SET_UNIT_INIT(`#expiration-date-time`, {paramMaxDate: new Date().addYears(500).toString(`yyyy-MM-dd`), showTimepicker: false});

            SEARCH_TERM_UTIL.SET_UNIT_INIT({
                'PARENT': {
                    'CLASS': `expiration-date-for-parent`,
                },
                'DATE': {
                    'CLASS': [`expiration-date`, `ifCheck`],
                    'ID': `expiration-date-time`,
                    'NAME': `expirationDateTime`,
                    'ATTR': [
                        {'maxlength': 16, 'autocomplete': `off`, 'data-type': `birthday`},
                    ],
                    'SIZE': {
                        'WIDTH': `72px`
                    }
                },
                'CALENDAR_ICON': {
                    'CLASS': `expiration-date-for-calendar-icon`,
                }
            }, {
                MAX_DATE: {
                    USE: true,
                    VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
                },
                INIT_DATE: {
                    USE: true,
                    VALUE: (_t.organization.expirationDateTime !== null && _t.organization.expirationDateTime !== '') ? _t.organization.expirationDateTime.substr(0, 10): ``
                }
            });

            setAddEvent(`update`);
            custom.etc.removeLoading();
        }
        else {
            custom.etc.customToastForColor(`네트웍 오류입니다. 잠시 후 다시 시도하세요.`, `bgRed`);
            etc.moveBack(1, `/organ/index`);
        }
    }

    return {
        pre: pre,
        index: index,
        add: add,
        update: update,
    };
};

export { promise }