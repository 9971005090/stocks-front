"use strict";

const promise = async () => {
    const pathName = GBL.CONSTANTS.get(`NOW_CONTROLLER`);
    if (pathName === undefined) {
        throw new Error('디자인 파일이 정의 되지 않았습니다. controller에서 사용하는 디자인이 정의됐는지 확인 하세요!');
    }
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const html = await import(`/js/module/crud/template/thync-manager/design.js${ver_string}`);
    const {CONST: CONST} = await import(`/js/module/crud/constant.js${ver_string}`);
    const {CONST: CRUD_CONST} = await import(`/js/module/crud/init/thync-manager/${pathName}.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL, EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);

    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                // 아래 영역에 코드 작성
                Handlebars.registerHelper('_d', function(object, key, firstButton = null) {
                    let newObject = '';
                    if(key.indexOf(".") > -1){
                        let keys = key.split('.');
                        keys.forEach(function(v){
                            if(object[v] !== null){
                                object = object[v]
                                newObject = object;
                            }
                            else{
                                if(typeof newObject == 'object'){
                                    newObject = '';
                                }
                                else {
                                    newObject = firstButton
                                }
                            }
                        })
                    }
                    else {
                        newObject = object[key];
                    }
                    return newObject;
                });
                Handlebars.registerHelper('customIfChange', function(object, key, sign, arg2, options) {
                    if (sign === '===') {
                        if (object[key] === arg2) {
                            return options.fn(this);
                        }
                    }
                    return options.inverse(this);
                });
                resolve(true);
            }
            let options = {
                files: [
                    // 아래 영역에 코드 작성(필요한 js, css 로딩)
                    //////////////////////////////////////////////////////
                    `/js/util/jquery/jquery-ui.css${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    `/assets/css/theme/thync-manager/jquery-ui-timepicker-addon.css${ver_string}`,
                    /////////////////////////////////////////////////////
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    const _search = function(type = `search`, parameters=null) {
        let searchData;
        parameters.search === 'datas' ? searchData = '' : searchData = parameters.search;
        parameters.search = searchData;
        let colspan = CRUD_CONST[`${searchData}DATA_LIST`].HEAD.COLUMN.length;
        $("#contents-by-data-table td").attr("colspan", colspan);

        let currentPage = $(`#${pathName}_currentPage`).length > 0 ? Number($(`#${pathName}_currentPage`).val()) : 1;

        const params = etc.formSearchParser(`.form-common-search`);
        params.pageNumber = currentPage;
        params.count = DEFAULT_CONST.PAGING.DATA_COUNT;
        params.includeUseInfo = true;

        searchData.legnth === 0 ? CRUD_CONST.CALLBACK_FUNCTION("search_param", params) : CRUD_CONST.CALLBACK_FUNCTION(`${searchData.toLowerCase()}search_param`, params);

        if(CRUD_CONST.SEARCH_PARAM_OK_FUNCTION(params)){
            $(`${CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
            if (type === `search`) {
                custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
            }

            let _t = CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL[`${searchData}API_SELECT_PAGE`]](params);
            if(_t[CRUD_CONST.UTIL.SEARCH_LIST] === null && currentPage>1){
                currentPage = currentPage-1;
                params.pageNumber = currentPage;
                _t = CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL[`${searchData}API_SELECT_PAGE`]](params);
                $(`#${pathName}_currentPage`).val(currentPage);
            }
            custom.etc.removeLoading();
            if (_t.result === true) {
                if (_t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]] !== null && _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]].length > 0) {
                    let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                    for (let i = 0; i < _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]].length; i++) {
                        _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]][i] = CRUD_CONST.UTIL.API_UTIL.DATA_PARSING(_t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]][i]);
                        _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]][i].virtualNumber = startVirtualNumber - i;
                    }
                    if(CRUD_CONST.UTIL.CUSTOM_CONSTANT_SET){
                        GBL.CONSTANTS.set(CRUD_CONST.UTIL.CUSTOM_CONSTANT_SET_NAME, _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]], true);
                    }
                    $(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                    etc.setHtmlParsing($(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t[CRUD_CONST.UTIL[`${searchData}SEARCH_LIST`]], _c:CRUD_CONST[`${searchData}DATA_LIST`].BODY});
                    setAddEvent("datas", parameters);
                }
                else {
                    $(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                    $(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE} td`).attr("colspan", colspan);
                }
                // 페이징 처리 파라미터 셋팅 및 호출
                let pagingParameter = {
                    prefix: parameters.pathName,
                    divName: ".pagination",
                    totalData: _t.totalCount,
                    callback: _search,
                    callbackRun: false,
                    dataPerPage: DEFAULT_CONST.PAGING.DATA_COUNT,
                    baseParameter: [`search`, parameters],
                }
                if($(`#${pagingParameter.prefix}_currentPage`).length > 0) {
                    pagingParameter.currentPage = Number($(`#${pagingParameter.prefix}_currentPage`).val());
                    pagingParameter.dataPerPage = Number($(`#${pagingParameter.prefix}_dataPerPage`).val());
                    pagingParameter.pageCount = Number($(`#${pagingParameter.prefix}_pageCount`).val());
                }
                if(_t.userAccountSimpleList === null && pagingParameter.totalData === 0){
                    pagingParameter.totalData = 0;
                }
                if(pagingParameter.totalData === undefined){
                    $(".pagination").remove();
                }
                Seers.Loader.moduleLoad("paging", "index", pagingParameter);

                CRUD_CONST.SEARCH_ETC();
            }
            else {
                $(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
                $(`${CRUD_CONST.UTIL.API_CONST.DESIGN.CONTENTS_BY_DATA_TABLE} td`).attr("colspan", colspan);
            }
            CRUD_CONST.CALLBACK_FUNCTION("search", parameters);
        }
    }

    const setAddEvent = function(content = `index`, params = null, callbackFunction = null, addCheckFunc = null){
        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`${pathName}`);

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#${pathName}_currentPage`, _search, 'search', params);

            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
        }
        else if (content === `datas`) {
            // 수정버튼 클릭이동
            CUSTOM_EVENT.BUTTON_UPDATE(`${pathName}`, CRUD_CONST.MOVE_PAGE_CODE.PAGE_CODE);

            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            CUSTOM.EVENT.HTML.push(`.btn-all-delete`);
            $(".btn-all-delete").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let text;
                let parameter = CRUD_CONST.DELETE_ALL().parameter;
                CRUD_CONST.DELETE_ALL().text ? text = CRUD_CONST.DELETE_ALL().text : text = "삭제";
                CUSTOM_UTIL.DELETE_ALERT(CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL.DELETE_ALL_API], parameter, _search, params, 'search', text);
                $(`#listAllCheck`).prop("checked", false)
            });

            CUSTOM.EVENT.HTML.push(`.btn-delete`);
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let text;
                let parent = $(this).parents('.cm-tr');
                let parameter = CRUD_CONST.DELETE_ONE(parent).parameter;
                CRUD_CONST.DELETE_ONE(parent).text ? text = CRUD_CONST.DELETE_ONE(parent).text : text = "삭제";
                CUSTOM_UTIL.DELETE_ALERT(CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL.DELETE_API], parameter, _search, params, 'search', text);
            });
            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
        }
        else if (content === `add`){
            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, null, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    if(!CRUD_CONST.UTIL.CONFIRM_OTHER_FUNCTION){
                        form = CRUD_CONST.FORM_FORMAT_CHANGE(form);
                        if(CRUD_CONST.CHECK_INSERT_INFO(form)){
                            const _t = CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL.INSERT_API](form);
                            if (_t.result === true) {
                                let processEnd = function(mode = `list`) { //list, add
                                    if (mode === `list`) {
                                        etc.move(`/${pathName}/index`);
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
                    else{
                        CRUD_CONST.ADD_CONFIRM_INSERT_FUNCTION(form);
                    }
                }
            });
            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
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
                    if(CRUD_CONST.CHECK_UPDATE_INFO(form, params)){
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/${pathName}/index`);
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
                        Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
                    }
                }
            });
            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
        }
        else if (content === 'dynamic'){
            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, null, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    CRUD_CONST.ADD_CONFIRM_INSERT_FUNCTION(form, 'dynamic');
                }
            });
            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
        }
        else if(content === variablePageName){
            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#${pathName}_currentPage`, _search, 'search', params);
            if(callbackFunction !== null){
                CRUD_CONST.CALLBACK_FUNCTION(callbackFunction, params);
            }
        }
        CUSTOM_UTIL.MOVE_LIST(`${pathName}`);
    }

    const index = function(parameter = null) {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index, {_c: CRUD_CONST.DATA_LIST.HEAD.COLUMN, _s: CRUD_CONST.FORM_DATA.COLUMN, _b: CRUD_CONST.SEARCH_BUTTONS, moduleTheme: CONST.DESIGN.THEME});
        CRUD_CONST.USING_SELECT_BOX();
        let passingParams = {
            "pathName" : pathName,
            "searchFunction": _search,
            "search": "datas",
        }
        if (CRUD_CONST.ADD_PARAMETER !== null) {
            for (let key in CRUD_CONST.ADD_PARAMETER) {
                passingParams[key] = passingParams[key]
            }
        }
        setAddEvent(`index`, passingParams, "index");
        setTimeout(function() {
            _search(`first`, passingParams);
            CRUD_CONST.CALLBACK_FUNCTION("index_sub", passingParams);
        }, 200);
    }

    const add = function(parameter = null){
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`, _c: CRUD_CONST.FORM_DATA.COLUMN});
        custom.etc.removeLoading();
        CRUD_CONST.USING_SELECT_BOX('add');
        let passingParams = {
            "pathName" : pathName,
        }
        if (CRUD_CONST.ADD_PARAMETER !== null) {
            for (let key in CRUD_CONST.ADD_PARAMETER) {
                passingParams[key] = passingParams[key]
            }
        }
        setAddEvent("add", passingParams, "add");
    }

    const update = function(params = null){
        const _t = CRUD_CONST.UTIL.API_UTIL[CRUD_CONST.UTIL.SELECT_API](params.code);
        if (_t.result === true) {
            $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
            etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.update, {title: `수정`, datas: _t[CRUD_CONST.UTIL.API_SELECT_CONST], _c: CRUD_CONST.FORM_DATA.COLUMN});
            custom.etc.removeLoading();
            CRUD_CONST.USING_SELECT_BOX('update');
            let passingParams = {
                "pathName" : pathName,
                "code": params.code,
            }
            if (CRUD_CONST.ADD_PARAMETER !== null) {
                for (let key in CRUD_CONST.ADD_PARAMETER) {
                    passingParams[key] = passingParams[key]
                }
            }
            setAddEvent(`update`, passingParams, "update");
        }
        else {
            custom.etc.customToastForColor(`네트웍 오류입니다. 잠시 후 다시 시도하세요.`, `bgRed`);
            etc.moveBack(1, `/${pathName}/index`);
        }
    }

    const dynamic = function(parameter = null){
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.dynamic, {title: CRUD_CONST.UTIL.DYNAMIC_TITLE, _c: CRUD_CONST.FORM_DATA.COLUMN});
        custom.etc.removeLoading();
        CRUD_CONST.USING_SELECT_BOX('dynamic');
        let passingParams = {
            "pathName" : pathName,
        }
        if (CRUD_CONST.ADD_PARAMETER !== null) {
            for (let key in CRUD_CONST.ADD_PARAMETER) {
                passingParams[key] = CRUD_CONST.ADD_PARAMETER[key]
            }
        }
        setAddEvent(`dynamic`, passingParams, "dynamic");
    }

    // 다양한 페이지 명으로 진입을 원할때 사용
    let variablePageName;
    if(CRUD_CONST.UTIL.VARIABLE_PAGE){
        variablePageName = CRUD_CONST.UTIL.VARIABLE_PAGE_NAME;
    }
    let variableAction = function(parameter = null){
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index, {_c: CRUD_CONST.VARIABLE_DATA_LIST.HEAD.COLUMN, _s: CRUD_CONST.FORM_DATA.COLUMN, _b: CRUD_CONST.SEARCH_BUTTONS, moduleTheme: CONST.DESIGN.THEME});
        CRUD_CONST.USING_SELECT_BOX(variablePageName);
        custom.etc.removeLoading();
        let passingParams = {
            "pathName" : pathName,
            "searchFunction": _search,
            "search": 'VARIABLE_',
        }
        if (CRUD_CONST.ADD_PARAMETER !== null) {
            for (let key in CRUD_CONST.ADD_PARAMETER) {
                passingParams[key] = passingParams[key]
            }
        }
        setAddEvent(variablePageName, passingParams, 'variable_page');

        setTimeout(function() {
            _search(`first`, passingParams);
            CRUD_CONST.CALLBACK_FUNCTION("variable_sub", passingParams);
        }, 200);
    };

    return {
        pre: pre,
        index: index,
        add: add,
        update: update,
        dynamic: dynamic,
        [variablePageName]: variableAction,
    };
};

export { promise }