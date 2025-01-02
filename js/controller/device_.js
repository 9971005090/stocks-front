"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: DEVICE_CONST} = await import(`/js/custom/constant/device_/constant.js${ver_string}`);
    const {UTIL: DEVICE_UTIL} = await import(`/js/custom/constant/device_/util.js${ver_string}`);
    const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/device_.js${ver_string}`);
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
        $(`#listAllCheck`).prop("checked", false);
        $(`${DEVICE_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        let currentPage = $(`#device_currentPage`).length > 0 ? Number($(`#device_currentPage`).val()) : 1;
        const params = etc.formSearchParser(`.form-common-search`);
        params.pageNumber = currentPage;
        params.count = DEFAULT_CONST.PAGING.DATA_COUNT;
        params.includeUseInfo = true;
        let _t = DEVICE_UTIL.PAGE(params);
        if(_t.deviceRegisterList === null && currentPage > 1){
            currentPage = currentPage - 1;
            params.pageNumber = currentPage;
            _t = DEVICE_UTIL.PAGE(params);
            $("#device_currentPage").val(currentPage);
        }
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.deviceRegisterList !== null && _t.deviceRegisterList.length > 0) {
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.deviceRegisterList.length; i++) {
                    _t.deviceRegisterList[i] = DEVICE_UTIL.DATA_PARSING(_t.deviceRegisterList[i]);
                    _t.deviceRegisterList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${DEVICE_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${DEVICE_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.deviceRegisterList});
                setAddEvent(`datas`);
            }
            else {
                $(`${DEVICE_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }

            // 페이징 처리 파라미터 셋팅 및 호출
            let pagingParameter = {
                prefix: `device`,
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
            if(_t.deviceRegisterList === null && pagingParameter.totalData === 0){
                pagingParameter.totalData = 0;
            }
            Seers.Loader.moduleLoad("paging", "index", pagingParameter);
        }
        else {
            $(`${DEVICE_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }

    // const selectBoxCallback = function (choiceBox) {
    //     let selectObj = $(choiceBox).parents(".cm-select-box");
    //     selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
    //     if ($(choiceBox).attr(`data-type`) === `organ`) {
    //         selectBoxWard($(choiceBox).attr(`data-code`), `wardSelectBox`, {code: `all`, title: `병동선택`});
    //         if ($(choiceBox).attr(`data-code`) !== `all`) {
    //             $(`.btn-all-delete`).css(`display`, `block`);
    //         }
    //         else {
    //             $(`.btn-all-delete`).css(`display`, `none`);
    //         }
    //     }
    // }
    const selectBoxCallback2 = function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger(`keyup`);
        if ($(choiceBox).attr(`data-type`) === `organ`) {
            let _t =  GBL.CONSTANTS.get(`WARDS_${$(choiceBox).attr(`data-code`)}`);
            if (_t === null && $(choiceBox).attr(`data-code`) !== `all`) {
                _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': $(choiceBox).attr(`data-code`)});
                GBL.CONSTANTS.set(`WARDS_${$(choiceBox).attr(`data-code`)}`, _t);
            }
            let _d = [];
            if (_t !== null) {
                for (let i = 0; i < _t.length; i++) {
                    _d.push({
                        code: _t[i].wardCode,
                        title: _t[i].ward,
                    });
                }
            }
            if ($(choiceBox).attr(`data-code`) !== `all`) {
                $(`.btn-all-delete`).css(`display`, `block`);
            }
            else {
                $(`.btn-all-delete`).css(`display`, `none`);
            }
            const data = {
                type: `ward`,
                datas: _d,
                all: {code: `all`, title: `병동선택`, isUse: false},
                default: null,
            };
            SELECT_BOX_UTIL.OPTION_MAKE(data, {
                'parent': `.select-box-parent-for-ward`,
                'box': `.select-box-for-ward`,
                'option-list': `.select-box-option-list-for-ward`,
                'option-item': `.select-box-option-item-for-ward`,
                'label': `.select-box-label-for-ward`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-ward'
            }, selectBoxCallback2);
        }
    }

    // const selectBoxOrgan = function(selectBoxId = null, searchAllInfo = null) {
    //     const _t = GBL.CONSTANTS.get(`ORGANIZATIONS`);
    //     let selectBoxHTML = "";
    //     if (searchAllInfo !== null) {
    //         selectBoxHTML += `<li class="option-item" data-type="organ" data-code="${searchAllInfo.code}">${searchAllInfo.title}</li>`;
    //         $(`#${selectBoxId}`).find(`.select-item`).val(searchAllInfo.code);
    //         $(`#${selectBoxId}`).find(`.select-item`).attr(`data-not-parsing-value`, searchAllInfo.code);
    //         $(`#${selectBoxId}`).find(`.label`).text(searchAllInfo.title);
    //         selectBoxWard(searchAllInfo.code, `wardSelectBox`, {code: `all`, title: `병동선택`});
    //     }
    //     if (_t.result === true) {
    //         for (let i = 0; i < _t.organizationList.length; i++) {
    //             selectBoxHTML += `<li class="option-item" data-type="organ" data-code="${_t.organizationList[i].organizationCode}">${_t.organizationList[i].organizationName}</li>`;
    //         }
    //         if (searchAllInfo === null) {
    //             $(`#${selectBoxId}`).find(`.select-item`).val(_t.organizationList[0].organizationCode);
    //             $(`#${selectBoxId}`).find(`.label`).text(_t.organizationList[0].organizationName);
    //             selectBoxWard(_t.organizationList[0].organizationCode, `wardSelectBox`, {code: `all`, title: `병동선택`});
    //         }
    //     }
    //     $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    // }
    // const selectBoxWard = function(organizationCode = null, selectBoxId = null,  searchAllInfo = null) {
    //     let _t =  GBL.CONSTANTS.get(`WARDS_${organizationCode}`);
    //     if (_t === null && organizationCode !== `all`) {
    //         _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': organizationCode});
    //         GBL.CONSTANTS.set(`WARDS_${organizationCode}`, _t);
    //     }
    //     let selectBoxHTML = "";
    //     if (searchAllInfo !== null) {
    //         selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${searchAllInfo.code}">${searchAllInfo.title}</li>`;
    //         $(`#${selectBoxId}`).find(`.select-item`).val(searchAllInfo.code);
    //         $(`#${selectBoxId}`).find(`.select-item`).attr(`data-not-parsing-value`, searchAllInfo.code);
    //         $(`#${selectBoxId}`).find(`.label`).text(searchAllInfo.title);
    //     }
    //     if (_t !== null && _t !== undefined) {
    //         if (Object.keys(_t).length > 0) {
    //             for (let i = 0; i < Object.keys(_t).length; i++) {
    //                 selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
    //             }
    //         }
    //     }
    //     $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    //     setTimeout(function() {
    //         SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);
    //     }, 10);
    // }
    const _checkInsertInfo = function(params = null) {
        if(params === false){
            return false;
        }
        let msg = null;
        let searchParams = {
            search: params.serialNumber,
            pageNumber: 1,
            count: 999
        }
        let _t = DEVICE_UTIL.PAGE(searchParams);
        if (_t.result === true && _t.deviceRegisterList !== null && _t.deviceRegisterList.length > 0) {
            msg = `${GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`)[_t.deviceRegisterList[0].organizationCode]} 기관에 등록된 시리얼번호입니다.`;
        }
        if(msg === null){
            return true;
        }
        else {
            custom.etc.customToastForError(msg);
            etc.isFormSubmit("form-data", "end");
            return false;
        }
    }
    const _serialBulkAdd = function(serialNumber, selector = `.device-bulk-serial-number-text`, parentSelector = `.device-bulk-info-parent`) {
        const _serialCheckResult = DEVICE_UTIL.DEVICE_SERIAL_CHECK(serialNumber);
        if (_serialCheckResult.result === false) {
            custom.etc.customToastForError(_serialCheckResult.msg);
        }
        else {
            if (_checkInsertInfo(_serialCheckResult) === true) {
                etc.setHtmlParsing($(parentSelector), html.addForBulkUnit, {..._serialCheckResult});
                $(selector).val(``);
                CUSTOM.EVENT.HTML.push(`.device-bulk-del-btn`);
                $(`.device-bulk-del-btn`).off(`click`).on(`click`, function (e) {
                    etc.stopBubbling(e);
                    $(this).parent().remove();
                });
            }
        }
        $(selector).focus();
    }
    const setAddEvent = function(content = `index`) {
        // SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);

        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`device`);

            // 대량 등록 버튼 클릭
            CUSTOM.EVENT.HTML.push(`.btn-add-for-bulk`);
            $(`.btn-add-for-bulk`).off("click").on("click", function() {
                etc.move(`/device/add-bulk`);
            })

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#device_currentPage`, _search, 'search');

            CUSTOM.EVENT.HTML.push(`.btn-all-delete`);
            $(".btn-all-delete").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const parameter = {
                    'targetOrganizationCode': $(`#select-box-for-organization .select-item`).val(),
                    'serialNumberList': []
                }
                $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked") === true) {
                        parameter.serialNumberList.push($(items).parents(".cm-tr").attr(`data-serial-number`));
                    }
                });
                if (parameter.serialNumberList.length <= 0) {
                    custom.etc.customToastForError(`삭제하려는 디바이스를 선택하세요!`);
                    return;
                }
                CUSTOM_UTIL.DELETE_ALERT(DEVICE_UTIL.DELETE_ALL, parameter, _search);
            });

            CUSTOM.EVENT.HTML.push(`.btn-move-for-choice`);
            $(".btn-move-for-choice").off("click").on("click", function (e) {
                etc.stopBubbling(e);

                const _selectBoxCallbackForMove = function (choiceBox) {
                    let selectObj = $(choiceBox).parents(".cm-select-box");
                    selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
                    if ($(choiceBox).attr(`data-type`) === `organ`) {
                        _selectBoxWardForMove($(choiceBox).attr(`data-code`));
                    }
                }
                const _selectBoxCallbackForMove2 = function (choiceBox) {
                    let selectObj = $(choiceBox).parents(".cm-select-box");
                    selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
                    if ($(choiceBox).attr(`data-type`) === `organ`) {
                        let _t =  GBL.CONSTANTS.get(`WARDS_${$(choiceBox).attr(`data-code`)}`);
                        if (_t === null && $(choiceBox).attr(`data-code`) !== `all`) {
                            _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': $(choiceBox).attr(`data-code`)});
                            GBL.CONSTANTS.set(`WARDS_${$(choiceBox).attr(`data-code`)}`, _t);
                        }
                        let _d = [];
                        for (let i = 0; i < _t.length; i++) {
                            _d.push({
                                code: _t[i].wardCode,
                                title: _t[i].ward,
                            });
                        }
                        $(`.select-box-parent-for-ward-on-move`).html(``);
                        SELECT_BOX_UTIL.MAKE({
                            type: `ward`,
                            datas: _d,
                            all: {code: `all`, title: `병동선택`, isUse: false},
                            default: null,
                            attr: {
                                name: `wardCode`,
                                'add-class': [`use-option`]
                            }
                        }, {
                            'parent': `.select-box-parent-for-ward-on-move`,
                            'box': `.select-box-for-ward-on-move`,
                            'option-list': `.select-box-option-list-for-ward-on-move`,
                            'option-item': `.select-box-option-item-for-ward-on-move`,
                            'label': `.select-box-label-for-ward-on-move`,
                            'selected-class': `selected`,
                            'box-id': 'select-box-for-ward-on-move'
                        }, {
                            'width': `width: 216px;`,
                            'height': `height: 32px;`,
                            'margin-left': `margin-left: 0px;`,
                        }, selectBoxCallback2);
                    }
                }
                const _selectBoxOrganForMove = function() {
                    const _t = GBL.CONSTANTS.get(`ORGANIZATIONS`);
                    const selectBoxId = `move-for-organ-select-box`;
                    const searchAllInfo = {
                        code: `all`,
                        title: `기관선택`
                    };
                    let selectBoxHTML = "";
                    if (searchAllInfo !== null) {
                        selectBoxHTML += `<li class="option-item" data-type="organ" data-code="${searchAllInfo.code}">${searchAllInfo.title}</li>`;
                        $(`#${selectBoxId}`).find(`.select-item`).val(searchAllInfo.code);
                        $(`#${selectBoxId}`).find(`.select-item`).attr(`data-not-parsing-value`, searchAllInfo.code);
                        $(`#${selectBoxId}`).find(`.label`).text(searchAllInfo.title);
                        _selectBoxWardForMove(searchAllInfo.code);
                    }
                    if (_t.result === true) {
                        for (let i = 0; i < _t.organizationList.length; i++) {
                            selectBoxHTML += `<li class="option-item" data-type="organ" data-code="${_t.organizationList[i].organizationCode}">${_t.organizationList[i].organizationName}</li>`;
                        }
                        if (searchAllInfo === null) {
                            $(`#${selectBoxId}`).find(`.select-item`).val(_t.organizationList[0].organizationCode);
                            $(`#${selectBoxId}`).find(`.label`).text(_t.organizationList[0].organizationName);
                            _selectBoxWardForMove(_t.organizationList[0].organizationCode);
                        }
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                }
                const _selectBoxWardForMove = function(organizationCode = null) {
                    const selectBoxId = `move-for-ward-select-box`;
                    const searchAllInfo = {
                        code: `all`,
                        title: `병동선택`
                    };
                    let _t =  GBL.CONSTANTS.get(`WARDS_${organizationCode}`);
                    if (_t === null && organizationCode !== `all`) {
                        _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': organizationCode});
                        GBL.CONSTANTS.set(`WARDS_${organizationCode}`, _t);
                    }
                    let selectBoxHTML = "";
                    if (searchAllInfo !== null) {
                        selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${searchAllInfo.code}">${searchAllInfo.title}</li>`;
                        $(`#${selectBoxId}`).find(`.select-item`).val(searchAllInfo.code);
                        $(`#${selectBoxId}`).find(`.select-item`).attr(`data-not-parsing-value`, searchAllInfo.code);
                        $(`#${selectBoxId}`).find(`.label`).text(searchAllInfo.title);
                    }
                    if (_t !== null && _t !== undefined) {
                        if (Object.keys(_t).length > 0) {
                            for (let i = 0; i < Object.keys(_t).length; i++) {
                                selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                            }
                        }
                    }
                    $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                    setTimeout(function() {
                        SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box.move`, `.cm-select-box.move .option-list`, `.cm-select-box.move .option-item`, `.label`, `selected`, _selectBoxCallbackForMove);
                    }, 10);
                }

                const parameter = {
                    'targetOrganizationCode': null,
                    'wardCode': null,
                    'serialNumberList': []
                }
                $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked") === true) {
                        parameter.serialNumberList.push($(items).parents(".cm-tr").attr(`data-serial-number`));
                    }
                });
                if (parameter.serialNumberList.length <= 0) {
                    custom.etc.customToastForError(`이동하려는 디바이스를 선택하세요!`);
                    return;
                }


                const modalId = "customAlertForDeviceMove";
                const postProcessForOpen = function () {
                    // _selectBoxOrganForMove();
                    SELECT_BOX_UTIL.MAKE({
                        type: `organ`,
                        datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                        all: {code: `all`, title: `기관선택`, isUse: false},
                        default: null,
                        attr: {
                            name: `targetOrganizationCode`,
                            'add-class': [`use-option`]
                        }
                    }, {
                        'parent': `.select-box-parent-for-organization-on-move`,
                        'box': `.select-box-for-organization-on-move`,
                        'option-list': `.select-box-option-list-for-organization-on-move`,
                        'option-item': `.select-box-option-item-for-organization-on-move`,
                        'label': `.select-box-label-for-organization-on-move`,
                        'selected-class': `selected`,
                        'box-id': 'select-box-for-organization-on-move'
                    }, {
                        'width': `width: 216px;`,
                        'height': `height: 32px;`,
                        'margin-left': `margin-left: 0px;`,
                    }, _selectBoxCallbackForMove2);

                    SELECT_BOX_UTIL.MAKE({
                        type: `ward`,
                        datas: null,
                        all: {code: `all`, title: `병동선택`, isUse: false},
                        default: null,
                        attr: {
                            name: `wardCode`,
                            'add-class': [`use-option`]
                        }
                    }, {
                        'parent': `.select-box-parent-for-ward-on-move`,
                        'box': `.select-box-for-ward-on-move`,
                        'option-list': `.select-box-option-list-for-ward-on-move`,
                        'option-item': `.select-box-option-item-for-ward-on-move`,
                        'label': `.select-box-label-for-ward-on-move`,
                        'selected-class': `selected`,
                        'box-id': 'select-box-for-ward-on-move'
                    }, {
                        'width': `width: 216px;`,
                        'height': `height: 32px;`,
                        'margin-left': `margin-left: 0px;`,
                    }, _selectBoxCallbackForMove2);
                }
                const okBtnCallback = function () {
                    if (String.isNullOrWhitespace($(`#select-box-for-organization-on-move`).find(`.select-item`).val()) === true || $(`#select-box-for-organization-on-move`).find(`.select-item`).val() === `all`) {
                        custom.etc.customToastForError(`이동하려는 기관을 선택하세요!`);
                        return false;
                    }
                    if (String.isNullOrWhitespace($(`#select-box-for-ward-on-move`).find(`.select-item`).val()) === true || $(`#select-box-for-ward-on-move`).find(`.select-item`).val() === `all`) {
                        custom.etc.customToastForError(`이동하려는 기관의 병동을 선택하세요!`);
                        return false;
                    }
                    parameter.targetOrganizationCode = $(`#select-box-for-organization-on-move .select-item`).val();
                    parameter.wardCode = $(`#select-box-for-ward-on-move .select-item`).val();
                    const _r = DEVICE_UTIL.UPDATE_ALL(parameter);
                    if (_r.result === true) {
                        custom.etc.customToastForColor(`정상적으로 이동왰습니다.`)
                    }
                    else {
                        custom.etc.customToastForError(`이동에 실패했습니다. 잠시 후 다시 시도하세요.`)
                    }
                    _search();
                    modal.globalClose(modalId);
                }

                const cancelBtnCallback = function () {
                    modal.globalClose(modalId);
                }

                let initParameter = {
                    msg: html.moveForSelectBox,
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
                    },
                    modalEventCallback: [{
                        name: postProcessForOpen,
                        params: []
                    }]
                }
                Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
            });
        }
        else if (content === `datas`) {
            // 수정버튼 클릭이동
            CUSTOM_EVENT.BUTTON_UPDATE(`device`,`data-id`);

            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            CUSTOM.EVENT.HTML.push(`.btn-delete`);
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = $(this).parents('.cm-tr').attr(`data-serial-number`);
                CUSTOM_UTIL.DELETE_ALERT(DEVICE_UTIL.DELETE, selectedCode, _search);
            });
        }
        else if (content === `add`) {
            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let _serialCheckResult = null;
                const _validCheckForSerialNumber = function() {
                    _serialCheckResult = DEVICE_UTIL.DEVICE_SERIAL_CHECK(form['serialNumber']);
                    if (_serialCheckResult.result === false) {
                        custom.etc.customToastForError(_serialCheckResult.msg);
                    }
                    return _serialCheckResult.result;
                }
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, _validCheckForSerialNumber, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    const params = {
                        "targetOrganizationCode": form[`targetOrganizationCode`],
                        "deviceCode": form[`deviceCode`],
                        "wardCode": form[`wardCode`],
                        "serialNumber": form[`serialNumber`],
                        "deviceType": _serialCheckResult.deviceType,
                        "macAddress": _serialCheckResult.macAddress,
                        "etc" : form[`etc`],
                    }
                    if (_checkInsertInfo(params) === true) {
                        const _t = DEVICE_UTIL.INSERT(params);
                        if (_t.result === true) {
                            let processEnd = function(mode = `list`) { //list, add
                                if (mode === `list`) {
                                    etc.move(`/device/index`);
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
            });
        }
        else if (content === `addForBulk`) {
            CUSTOM.EVENT.HTML.push(`.form-data-table`);
            $(`.form-data-table`).off("submit").on("submit", function (e) {
                etc.stopBubbling(e);
                return false;
            });
            CUSTOM.EVENT.HTML.push(`.device-bulk-serial-number-text`);
            $(`.device-bulk-serial-number-text`).off(`keyup`).on(`keyup`, function (e) {
                etc.stopBubbling(e);
                if(e.keyCode === 13) {
                    _serialBulkAdd($(`.device-bulk-serial-number-text`).val());
                }
            });

            CUSTOM.EVENT.HTML.push(`.device-bulk-serial-number-add-button`);
            $(`.device-bulk-serial-number-add-button`).off(`click`).on(`click`, function (e) {
                etc.stopBubbling(e);
                _serialBulkAdd($(`.device-bulk-serial-number-text`).val());
            });

            CUSTOM.EVENT.HTML.push(`.device-bulk-excel-add-button`);
            $(`.device-bulk-excel-add-button`).off(`click`).on(`click`, function (e) {
                etc.stopBubbling(e);
                $('#excel-file-upload').click();
            });
            CUSTOM.EVENT.HTML.push(`.excel-file-upload`);
            $('#excel-file-upload').off(`change`).on(`change`, async function (e) {
                const file = e.target.files[0];
                if (etc.whatIsFileType(file) !== `excel`) {
                    custom.etc.customToastForError(`엑셀 파일이 아닙니다.(2007이후 버전만 허용)`);
                    return;
                }
                else {
                    $(`.device-bulk-excel-add-button`).find(`span`).text(`처리중....`);
                    custom.etc.excelImport(file, function(datas) {
                        for (let i = 0; i < datas.length; i++) {
                            _serialBulkAdd(datas[i].column1);
                        }
                        $(`.device-bulk-excel-add-button`).find(`span`).text(`엑셀파일`);
                    });
                }
            });
            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let _serialCheckResult = null;
                const _validCheckForSerialNumber = function() {
                    if ($(`.device-bulk-info-list`).length <= 0) {
                        custom.etc.customToastForError(`시리얼번호를 입력하세요!`);
                        etc.isFormSubmit("form-data", "end");
                        return false;
                    }
                    else {
                        return true;
                    }
                    return _serialCheckResult.result;
                }
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, _validCheckForSerialNumber, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    let _l = new Array();
                    $(`.device-bulk-info-list`).each(function(index, item) {
                        _l.push({
                            "deviceCode": String.isNullOrWhitespace($(item).attr(`data-device-code`)) === true ? null : $(item).attr(`data-device-code`),
                            "serialNumber": $(item).attr(`data-serial-number`),
                            "deviceType": $(item).attr(`data-device-type`),
                            "macAddress": $(item).attr(`data-mac-address`)
                        })
                    });
                    const params = {
                        "targetOrganizationCode": form[`UPDATE_ALLtargetOrganizationCode`],
                        "wardCode": form[`wardCode`],
                        "deviceInfoList": _l,
                    }
                    const _t = DEVICE_UTIL.INSERT_BULK(params);
                    if (_t.result === true) {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/device/index`);
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
            });
        }



        CUSTOM_UTIL.MOVE_LIST(`device`);
    }
    const index = function() {
        const _c = {
            TYPE: Array.deepCopy(DEVICE_CONST.TYPE.TITLE),
            USE: Array.from(DEVICE_CONST.USE.TITLE2, ([key, value]) => ({ key, value })),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);

        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `targetOrganizationCode`,
                'add-class': [`use-option`]
            }
        }, {
            'parent': `.select-box-parent-for-organization`,
            'box': `.select-box-for-organization`,
            'option-list': `.select-box-option-list-for-organization`,
            'option-item': `.select-box-option-item-for-organization`,
            'label': `.select-box-label-for-organization`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-organization'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);

        SELECT_BOX_UTIL.MAKE({
            type: `ward`,
            datas: null,
            all: {code: `all`, title: `병동선택`, isUse: false},
            default: null,
            attr: {
                name: `wardCode`,
                'add-class': [`use-option`]
            }
        }, {
            'parent': `.select-box-parent-for-ward`,
            'box': `.select-box-for-ward`,
            'option-list': `.select-box-option-list-for-ward`,
            'option-item': `.select-box-option-item-for-ward`,
            'label': `.select-box-label-for-ward`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-ward'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);

        // selectBoxOrgan(`organSelectBox`, {code: `all`, title: `기관선택`});
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    const add = function(){
        const _t = Array.deepCopy(DEVICE_CONST.TYPE.TITLE);
        delete _t[DEVICE_CONST.TYPE.CODE.ALL];
        const _c = {
            TYPE: _t
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`});
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `targetOrganizationCode`,
                'add-class': ['check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-organization`,
            'box': `.select-box-for-organization`,
            'option-list': `.select-box-option-list-for-organization`,
            'option-item': `.select-box-option-item-for-organization`,
            'label': `.select-box-label-for-organization`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-organization'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);

        SELECT_BOX_UTIL.MAKE({
            type: `ward`,
            datas: null,
            all: {code: `all`, title: `병동선택`, isUse: false},
            default: null,
            attr: {
                name: `wardCode`,
                'add-class': ['check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-ward`,
            'box': `.select-box-for-ward`,
            'option-list': `.select-box-option-list-for-ward`,
            'option-item': `.select-box-option-item-for-ward`,
            'label': `.select-box-label-for-ward`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-ward'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);
        // selectBoxOrgan(`organSelectBox`, {code: `all`, title: `기관선택`});
        setAddEvent("add");
        custom.etc.removeLoading();
    }
    const addForBulk = function(){
        const _t = Array.deepCopy(DEVICE_CONST.TYPE.TITLE);
        delete _t[DEVICE_CONST.TYPE.CODE.ALL];
        const _c = {
            TYPE: _t
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.addForBulk, {title: `대량 등록`});
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `targetOrganizationCode`,
                'add-class': ['check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-organization`,
            'box': `.select-box-for-organization`,
            'option-list': `.select-box-option-list-for-organization`,
            'option-item': `.select-box-option-item-for-organization`,
            'label': `.select-box-label-for-organization`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-organization'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);

        SELECT_BOX_UTIL.MAKE({
            type: `ward`,
            datas: null,
            all: {code: `all`, title: `병동선택`, isUse: false},
            default: null,
            attr: {
                name: `wardCode`,
                'add-class': ['check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-ward`,
            'box': `.select-box-for-ward`,
            'option-list': `.select-box-option-list-for-ward`,
            'option-item': `.select-box-option-item-for-ward`,
            'label': `.select-box-label-for-ward`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-ward'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback2);
        // selectBoxOrgan(`organSelectBox`, {code: `all`, title: `기관선택`});
        setAddEvent("addForBulk");
        custom.etc.removeLoading();
    }

    const update = function(params = null){
        const _c = {
            LEVEL: Array.deepCopy(DEVICE_CONST.LEVEL.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        const _t = DEVICE_UTIL.SELECT(params.code);
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
            etc.moveBack(1, `/device/index`);
        }
    }

    return {
        preAction: preAction,
        index: index,
        add: add,
        'add-bulk': addForBulk,
        update: update,
    };
};

export { promise }