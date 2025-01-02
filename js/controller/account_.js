"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/account.js${ver_string}`);
    const {CONST: ACCOUNT_CONST} = await import(`/js/custom/constant/account/constant.js${ver_string}`);
    const {UTIL: ACCOUNT_UTIL} = await import(`/js/custom/constant/account/util.js${ver_string}`);
    const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);
    let modUserCode = null;

    const preAction = function() {
        const _t = ORGAN_UTIL.LIST();
        let _p = {};
        let _d = [];
        for (let i = 0; i < _t.organizationList.length; i++) {
            _p[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
            _d.push({
                code: _t.organizationList[i].organizationCode,
                title: _t.organizationList[i].organizationName,
            });
        }
        GBL.CONSTANTS.set(`ORGANIZATIONS`, _t, true);
        GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
        GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);
    }

    const _search = function(type = `search`) { //first, search_managerUse
        let colspan = 9;
        $(`${ACCOUNT_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        let currentPage = $(`#account_currentPage`).length > 0 ? Number($(`#account_currentPage`).val()) : 1;

        const params = {
            'search': $(`.form-common-search-keyword`).val(),
            'searchOrganizationCode': $("#searchOrganSelectBox .selectItem").val(),
            // 'levelList' : [1,2,5,8,14,20],
            'pageNumber': currentPage,
            'count': DEFAULT_CONST.PAGING.DATA_COUNT,
        }
        if($("#searchOrganSelectBox .selectItem").val() === "all"){
            delete params.searchOrganizationCode;
        }
        let _t = ACCOUNT_UTIL.PAGE_ALL(params);
        if(_t.userAccountSimpleList === null && currentPage>1){
            currentPage = currentPage-1;
            params.pageNumber = currentPage;
            _t = ACCOUNT_UTIL.PAGE_ALL(params);
            $("#account_currentPage").val(currentPage);
        }
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.userAccountSimpleList !== null && _t.userAccountSimpleList.length > 0) {
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.userAccountSimpleList.length; i++) {
                    _t.userAccountSimpleList[i] = ACCOUNT_UTIL.DATA_PARSING(_t.userAccountSimpleList[i]);
                    _t.userAccountSimpleList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${ACCOUNT_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${ACCOUNT_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.userAccountSimpleList});
                setAddEvent(`datas`);
            }
            else {
                $(`${ACCOUNT_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
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
            if(_t.userAccountSimpleList === null && pagingParameter.totalData === 0){
                pagingParameter.totalData = 0;
            }
            Seers.Loader.moduleLoad("paging", "index", pagingParameter);
        }
        else {
            $(`${ACCOUNT_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }

    const selectBoxOrgan = function(selectBoxId = null, searchAll = false){
        // const _t = ORGAN_UTIL.LIST();
        const _t = GBL.CONSTANTS.get(`ORGANIZATION_DATAS`);
        let selectBoxHTML = "";
        if (_t !== null) {
            if(searchAll === true){
                selectBoxHTML +=   `<li class="option-item" data-type="organ" data-code="all">전체</li>`;
            }
            // for (let i = 0; i < _t.organizationList.length; i++) {
            //     selectBoxHTML += `<li class="option-item" data-code="${_t.organizationList[i].organizationCode}">${_t.organizationList[i].organizationName}</li>`;
            // }
            for (let i = 0; i < _t.length; i++) {
                selectBoxHTML += `<li class="option-item" data-code="${_t[i].code}">${_t[i].title}</li>`;
            }
            $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
        } else {
            $(`#${selectBoxId}`).children(".option-list").html("");
        }
    }

    const selectBoxWard = function(selectBoxId = null,  searchAll = false){
        let _t;
        if($("#organizationCode").val()){
            _t = WARD_UTIL.LIST(false, false, `list`, true,true, {'organizationCode': $("#organizationCode").val()});
        }
        let selectBoxHTML = "";
        if(!$("#organizationCode").is(':disabled')){
            if (_t !== null && _t !== undefined) {
                if (Object.keys(_t).length > 0) {
                    $(`#${selectBoxId}`).find(".label").text("소속병동");
                    $(`#${selectBoxId}`).find(".check").val("");
                    for (let i = 0; i < Object.keys(_t).length; i++) {
                        selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                    $(".ward-select-box .option-item").off("click").on('click', function(e){
                        etc.stopBubbling(e);
                        $(".ward-select-box .option-item").removeClass("selected");
                        $(this).parent().parent(".ward-select-box").removeClass("selected").children(".selectItem").val($(this).data("code"));
                        $(this).parent(".option-list").toggle();
                        $(this).parent().parent(".ward-select-box").find(".label").text($(this).text());
                        $(this).addClass("selected");
                    });
                }
            }
            else{
                $(`#${selectBoxId}`).children(".option-list").html("");
                $(`#${selectBoxId}`).find(".label").text("소속병동");
                $(`#${selectBoxId}`).find(".check").val("");
            }
        }
        else {
            if (_t !== null && _t !== undefined) {
                if (Object.keys(_t).length > 0) {
                    for (let i = 0; i < Object.keys(_t).length; i++) {
                        selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                }
            }
            else{
                $(`#${selectBoxId}`).children(".option-list").html("");s
            }
        }
    }

    const setAddEvent = function(content = `index`){
        const selectBoxCallback = function (choiceBox) {
            let selectObj = $(choiceBox).parents(".cm-select-box");
            selectObj.children(".selectItem").val($(choiceBox).data("code"));
            selectBoxWard(`wardSelectBox`);
        }
        SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);

        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`account`);

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#account_currentPage`, _search, 'search');
        }
        else if (content === `datas`) {
            // 수정버튼 클릭이동
            CUSTOM_EVENT.BUTTON_UPDATE(`account`,`data-id`);

            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            CUSTOM.EVENT.HTML.push(`.btn-all-delete`);
            $(".btn-all-delete").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let deleteList = [];
                $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked")){
                        deleteList.push($(items).parents(".cm-tr").data("user-code"));
                    }
                });
                CUSTOM_UTIL.DELETE_ALERT(ACCOUNT_UTIL.DELETE_ALL, deleteList, _search);
                $(`#listAllCheck`).prop("checked", false)
            });

            CUSTOM.EVENT.HTML.push(`.btn-delete`);
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = $(this).parents('.cm-tr').data('user-code');
                CUSTOM_UTIL.DELETE_ALERT(ACCOUNT_UTIL.DELETE, selectedCode, _search);
            });
        }
        else if (content === `add`){
            const passwordCheck = function (password = null) {
                let passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
                return password.match(passwordCheck);
            }

            const checkInsertInfo = function(param = null){
                if(!param){
                    return false;
                }
                let msg = "";
                const _checkValidId = ACCOUNT_UTIL.LIST_ALL({'search': param.id});
                let emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if(_checkValidId.userAccountSimpleList !== null){
                    msg = "계정명(ID)가 중복됩니다. 다른 계정명을 사용해주세요.";
                }
                else if(!param.email.match(emailCheck)){
                    msg = "이메일을 확인해주세요.";
                }
                else if(!passwordCheck(param.password)){
                    msg = "비밀번호를 다시 입력해주세요.(최소 8자리, 숫자+알파벳)";
                }
                else if(param.password !== $(".cm-input-text[name='passwordCheck']").val()){
                    msg = "비밀번호 확인 값이 다릅니다.";
                }
                else if(param.level === undefined){
                    msg = "계정권한을 선택해주세요.";
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
                    if(form[`organizationCode`] !== null && form[`id`] !== null && form[`password`] !== null && form[`name`] !== null && form[`level`] !== null && form[`email`] !== null && form[`passwordCheck`] !== null){
                        const params = {
                            "organizationCode" : form[`organizationCode`],
                            "id" : form[`accountId`],
                            "name" : form[`accountName`],
                            "password" : form[`password`],
                            "wardCode" : form[`wardCode`],
                            "email" : form[`accountEmail`],
                            "level" : form[`level`],
                        }

                        if(checkInsertInfo(params)){
                            const _t = ACCOUNT_UTIL.INSERT(params);
                            if (_t.result === true) {
                                let processEnd = function(mode = `list`) { //list, add
                                    if (mode === `list`) {
                                        etc.move(`/account/index`);
                                    }
                                    else {
                                        location.reload();
                                    }
                                }
                                let modalId = "customAlertForPushAdd";
                                let initParameter = {
                                    msg: `<p class="customAlertText">계정 등록이 완료됐습니다.</p>`,
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
                                custom.etc.customToastForColor(`계정 등록에 실패하였습니다.`, `bgRed`);
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
                    let updateResult, updateResultAccount, passingParameter;
                    if(form[`password`] !== null){
                        if (String.isNullOrWhitespace(form[`password`].trim()) === false) {
                            if (custom.etc.processMemberPassword() !== form[`password`].trim()) {
                                custom.etc.customToastForError("'현재 비밀번호'가 일치하지 않습니다.");
                                return false;
                            }
                            if(form[`modPassword`].trim() !== form[`passwordCheck`].trim()){
                                custom.etc.customToastForError("'새로운 비밀번호'와 '새로운 비밀번호 재입력'이 다릅니다.");
                                return false;
                            }
                            else{
                                passingParameter = {
                                    "userCode" : modUserCode,
                                    "password" : form[`password`].trim(),
                                    "newPassword" : form[`passwordCheck`].trim(),
                                };
                                updateResult = ACCOUNT_UTIL.UPDATE_PASSWORD(passingParameter);
                            }
                        }
                    }
                    const params = {
                        "organizationCode" : form[`organizationCode`],
                        "userCode" : modUserCode,
                        "name" : form[`accountName`],
                        "wardCode" : form[`wardCode`],
                        "email" : form[`accountEmail`],
                        "level" : parseInt($("input[name=level]:checked").val()),
                    }
                    updateResultAccount = ACCOUNT_UTIL.UPDATE(params);
                    if (updateResult === undefined && updateResultAccount === undefined) {
                        custom.etc.customToastForError("계정 정보 수정에 실패하였습니다.");
                    }
                    else {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/account/index`);
                            }
                            else {
                                location.reload();
                            }
                        }
                        let modalId = "customAlertForPatientAdd";
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
                        if(form[`passwordCheck`] !== null){
                            custom.etc.processMemberPassword(`set`, form[`passwordCheck`].trim());
                        }
                        Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
                    }
                }
            });
        }
        CUSTOM_UTIL.MOVE_LIST("account");
    }

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        selectBoxOrgan(`searchOrganSelectBox`, true);
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    const add = function(){
        const _c = {
            LEVEL: Array.deepCopy(ACCOUNT_CONST.LEVEL.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`});
        custom.etc.removeLoading();
        selectBoxOrgan(`searchOrganSelectBox`);
        selectBoxWard(`wardSelectBox`);
        setAddEvent("add");
    }

    const update = function(params = null){
        const _c = {
            LEVEL: Array.deepCopy(ACCOUNT_CONST.LEVEL.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        const _t = ACCOUNT_UTIL.SELECT(params.code);
        if (_t.result === true) {
            $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
            etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.update, {title: `수정`, datas: _t.userAccountSimple});
            if(_t.userAccountSimple){
                modUserCode = _t.userAccountSimple.userCode;
            }
            selectBoxWard(`wardSelectBox`);
            custom.etc.removeLoading();
            setAddEvent(`update`);
        }
        else {
            custom.etc.customToastForColor(`네트웍 오류입니다. 잠시 후 다시 시도하세요.`, `bgRed`);
            etc.moveBack(1, `/account/index`);
        }
    }

    return {
        preAction: preAction,
        index: index,
        add: add,
        update: update,
    };
};

export { promise }