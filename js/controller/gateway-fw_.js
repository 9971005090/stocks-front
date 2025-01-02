"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: GATEWAY_FW_CONST} = await import(`/js/custom/constant/gateway/constant-firmware.js${ver_string}`);
    const {UTIL: GATEWAY_FW_UTIL} = await import(`/js/custom/constant/gateway/util-firmware.js${ver_string}`);
    const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/gateway-fw_.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);

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
                    `/js/util/crypto/asmcrypto-0.22.0.min.js${ver_string}`
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

    const _search = function(type = `search`) { //first, search
        let colspan = 6;
        $(`${GATEWAY_FW_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        const currentPage = $(`#gateway_fw_currentPage`).length > 0 ? Number($(`#gateway_fw_currentPage`).val()) : 1;
        const params = etc.formSearchParser(`.form-common-search`);
        params.pageNumber = currentPage;
        params.count = 9999;
        const _t = GATEWAY_FW_UTIL.PAGE(params);
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.gatewayFwInfoList !== null && _t.gatewayFwInfoList.length > 0) {
                GBL.CONSTANTS.set(`GATEWAY_FW_DATAS`, _t.gatewayFwInfoList, true);
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.gatewayFwInfoList.length; i++) {
                    _t.gatewayFwInfoList[i] = GATEWAY_FW_UTIL.DATA_PARSING(_t.gatewayFwInfoList[i]);
                    _t.gatewayFwInfoList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${GATEWAY_FW_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${GATEWAY_FW_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.gatewayFwInfoList});
                setAddEvent(`datas`);
            }
            else {
                $(`${GATEWAY_FW_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }

            // // 페이징 처리 파라미터 셋팅 및 호출
            // let pagingParameter = {
            //     prefix: "gateway_fw",
            //     divName: ".pagination",
            //     totalData: _t.totalCount,
            //     callback: _search,
            //     callbackRun: false,
            //     dataPerPage: DEFAULT_CONST.PAGING.DATA_COUNT
            // }
            // if($(`#${pagingParameter.prefix}_currentPage`).length > 0) {
            //     pagingParameter.currentPage = Number($(`#${pagingParameter.prefix}_currentPage`).val());
            //     pagingParameter.dataPerPage = Number($(`#${pagingParameter.prefix}_dataPerPage`).val());
            //     pagingParameter.pageCount = Number($(`#${pagingParameter.prefix}_pageCount`).val());
            // }
            // Seers.Loader.moduleLoad("paging", "index", pagingParameter);
        }
        else {
            $(`${GATEWAY_FW_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }
    const selectBoxCallback2 = function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
    }

    // const selectBoxOrgan = function(selectBoxId = null , searchAll = false, defaultCode = null) {
    //     const _setDefault = function (code = `all`, name = `전체`) {
    //         $(`#${selectBoxId}`).find(`.selectItem`).val(code);
    //         $(`#${selectBoxId}`).find(`.label`).text(name);
    //     }
    //     const _t = ORGAN_UTIL.LIST();
    //     let selectBoxHTML = "";
    //     _setDefault();
    //     if (_t.result === true) {
    //         if(searchAll === true){
    //             selectBoxHTML +=   `<li class="option-item" data-type="organ" data-code="all">전체</li>`;
    //         }
    //         else {
    //             _setDefault(_t.organizationList[0].organizationCode, _t.organizationList[0].organizationName);
    //         }
    //         for (let i = 0; i < _t.organizationList.length; i++) {
    //             selectBoxHTML += `<li class="option-item" data-code="${_t.organizationList[i].organizationCode}">${_t.organizationList[i].organizationName}</li>`;
    //             if (defaultCode !== null) {
    //                 if (_t.organizationList[i].organizationCode === defaultCode) {
    //                     _setDefault(_t.organizationList[i].organizationCode, _t.organizationList[i].organizationName);
    //                 }
    //             }
    //         }
    //         $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
    //     }
    //     else {
    //         $(`#${selectBoxId}`).children(".option-list").html("");
    //     }
    // }

    const setAddEvent = function(content = `index`){
        // const selectBoxCallback = function (choiceBox) {
        //     let selectObj = $(choiceBox).parents(".cm-select-box");
        //     selectObj.children(".selectItem").val($(choiceBox).data("code"));
        // }
        // SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, selectBoxCallback);

        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`gateway-fw`, `.btn-add`, $(`#searchOrganSelectBox`).find(`.selectItem`).val() !== `all` ? $(`#searchOrganSelectBox`).find(`.selectItem`).val() : null);

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#gateway_fw_currentPage`, _search, 'search');
        }
        else if (content === `datas`) {
            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            CUSTOM.EVENT.HTML.push(`.btn-delete`)
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const param = {
                    fwVersion: $(this).parents('.cm-tr').attr('data-fw-version'),
                    targetOrganizationCode: $(this).parents('.cm-tr').attr('data-organization-code')
                }
                CUSTOM_UTIL.DELETE_ALERT(GATEWAY_FW_UTIL.DELETE, param, _search);
            });
        }
        else if (content === `add`){
            const checkInsertGatewayFwInfo = function(form = null) {
                // let gatewayFwInfoList = GBL.CONSTANTS.get(`GATEWAY_FW_DATAS`);
                const params = {
                    pageNumber: 1,
                    count: 9999,
                    targetOrganizationCode: form['organizationCode']
                }
                const _t = GATEWAY_FW_UTIL.PAGE(params);
                const gatewayFwInfoList = _t.gatewayFwInfoList;
                if(form.fwVersion === null){
                    return false;
                }
                let msg = "";
                let duplicate = false;
                if (gatewayFwInfoList !== null) {
                    for (let i = 0; i < gatewayFwInfoList.length; i++) {
                        if (gatewayFwInfoList[i].fwVersion === form.fwVersion) {
                            duplicate = true;
                            break;
                        }
                    }
                }

                if(duplicate === true){
                    msg = `버전이 중복됩니다. 버전을 확인해주세요.`;
                }

                if(msg === "") {
                    return true;
                }
                else {
                    custom.etc.customToastForColor(msg, `bgRed`);
                    etc.isFormSubmit("form-data", "end");
                    return false;
                }
                return true;
            }

            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                let on_hash_done = function(hash, time_elapsed_seconds) {
                    console.log("progress done");
                    // document.getElementById('progress').innerText = '';
                    console.log('sha256: ' + hash + ' took: ' + time_elapsed_seconds + 's');
                    // document.getElementById('result').innerText = 'sha256: ' + hash + ' took: ' + time_elapsed_seconds + 's';
                    // document.getElementById('file_input').disabled = false;


                    const params = {
                        'targetOrganizationCode': form[`organizationCode`],
                        'fwVersion': form[`fwVersion`],
                        'checkSum': hash,
                        'level': Number(form[`level`]),
                        'etc': form[`etc`] === null ? "" : form[`etc`],
                        'file': $('#firmware_file')[0].files[0],
                        'fileName': $('#firmware_file')[0].files[0].name
                    }
                    const _t = GATEWAY_FW_UTIL.INSERT(params);
                    if (_t.result === true) {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/gateway-fw/index`);
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
                    else {
                        let passingParameter = {
                            time : 3000,
                            text : "등록에 실패하였습니다.",
                            icon : "error"
                        }
                        Seers.Loader.moduleLoad("toast-message", "index", passingParameter);
                    }
                }
                let on_hash_progress = function(progress, time_elapsed_seconds) {
                    // document.getElementById('progress').innerText = Math.round(progress * 1000)/10 + '% ' + time_elapsed_seconds + 's';
                    console.log(Math.round(progress * 1000)/10 + '% ' + time_elapsed_seconds + 's');
                }
                let on_hash_error = function on_hash_error(error) {
                    document.getElementById('progress').innerText = '';
                    document.getElementById('error').innerText = error;
                    document.getElementById('file_input').disabled = false;
                }
                function hash_file(file, on_hash_done, on_hash_progress, on_hash_error) {
                    let file_size = file.size;
                    let chunk_size = 1 * 1024 * 1024;
                    let offset = 0;
                    let time_started = Date.now();

                    let hasher = new asmCrypto.SHA256();
                    let file_reader = new FileReader();

                    file_reader.onload = function(e) {
                        if (e.target.error === null) {
                            offset += e.loaded;

                            const uint8_data = new Uint8Array(e.target.result)

                            hasher.process(uint8_data);
                        } else {
                            on_hash_error(e.target.error);
                            return;
                        }

                        let time_elapsed_seconds = Math.floor((Date.now() - time_started) / 100) / 10;

                        on_hash_progress(offset / file_size, time_elapsed_seconds);

                        if (offset < file_size) {
                            file_reader.readAsArrayBuffer(file.slice(offset, chunk_size + offset));
                        }
                        else {
                            hasher.finish();

                            on_hash_done(asmCrypto.bytes_to_hex(hasher.result), time_elapsed_seconds);

                            return;
                        }
                    }

                    file_reader.readAsArrayBuffer(file.slice(offset, chunk_size + offset));
                }

                etc.stopBubbling(e);
                let dataFormId = "form-data";
                let form = etc.formParser(dataFormId);
                if(etc.formCheck(dataFormId, null, `error`) === true) {
                    if(etc.isFormSubmit(dataFormId, "check") === true) {
                        return false;
                    }
                    if(checkInsertGatewayFwInfo(form) === true) {
                        hash_file($('#firmware_file')[0].files[0], on_hash_done, on_hash_progress, on_hash_error);
                    }
                }
            });
        }
        CUSTOM_UTIL.MOVE_LIST("gateway-fw");
    }

    const index = function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        // selectBoxOrgan(`searchOrganSelectBox`);
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
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    const add = function(params = null) {
        const _c = {
            LEVEL_TYPE: Array.deepCopy(GATEWAY_FW_CONST.LEVEL_TYPE.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.add, {title: `등록`});
        // selectBoxOrgan(`searchOrganSelectBox`, true, params.hasOwnProperty(`organizationCode`) === true ? params.organizationCode : null);
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `organizationCode`,
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
        setAddEvent("add");
        custom.etc.removeLoading();
    }

    return {
        preAction: preAction,
        pre: pre,
        index: index,
        add: add
    };
};

export { promise }