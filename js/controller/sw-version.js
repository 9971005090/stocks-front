"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: SW_VERSION_CONST} = await import(`/js/custom/constant/sw-version/constant.js${ver_string}`);
    const {UTIL: SW_VERSION_UTIL} = await import(`/js/custom/constant/sw-version/util.js${ver_string}`);
    const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    const {UTIL: CUSTOM_UTIL} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/sw-version.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);
    // await import(`/js/custom/constant/sw-version/data-init.js${ver_string}`);

    const preAction = function() {
        const _t = ORGAN_UTIL.LIST();
        let _po = {};
        let _p = [];
        for (let i = 0; i < _t.organizationList.length; i++) {
            _po[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
            _p.push({
                code: _t.organizationList[i].organizationCode,
                title: _t.organizationList[i].organizationName,
            });
        }
        GBL.CONSTANTS.set(`ORGANIZATIONS`, _t, true);
        GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _p, true);
        GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _po, true);

        Handlebars.registerHelper('parsingVersion', function(data) {
            if(data === null){
                return "-";
            }
            else{
                return "v"+data;
            }
        });

        Handlebars.registerHelper('parsingSwType', function(data) {
            if(data === 0){
                return "Backend";
            }
            else if(data === 1){
                return "FrontEnd";
            }
            else if(data === 2){
                return "Gateway";
            }
            else if(data === 3){
                return "AI";
            }
            else if(data === 4){
                return "Android";
            }
            else if(data === 5){
                return "Ios";
            }
        });

        Handlebars.registerHelper('parsingFileName', function(data) {
            if(data !== null){
                let dataSplit = data.split(`/`);
                return dataSplit[dataSplit.length -1];
            }
        });
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
        let colspan = $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).siblings(".cm-thead").find(".cm-tr .cm-th").length;
        $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        const currentPage = $(`#sw_version_currentPage`).length > 0 ? Number($(`#sw_version_currentPage`).val()) : 1;
        const params = etc.formSearchParser(`.form-common-search`);
        params.pageNumber = currentPage;
        params.count = DEFAULT_CONST.PAGING.DATA_COUNT;
        if(params.swTypeList) params.swTypeList = [params.swTypeList];

        let _t = SW_VERSION_UTIL.PAGE(params);
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.swVersionInfoList !== null && _t.swVersionInfoList.length > 0) {
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.swVersionInfoList.length; i++) {
                    _t.swVersionInfoList[i] = SW_VERSION_UTIL.DATA_PARSING(_t.swVersionInfoList[i]);
                    _t.swVersionInfoList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.swVersionInfoList});
                setAddEvent(`datas`);
            }
            else {
                $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }

            // 페이징 처리 파라미터 셋팅 및 호출
            let pagingParameter = {
                prefix: "sw_version",
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
            Seers.Loader.moduleLoad("paging", "index", pagingParameter);

            $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_INSTALLED_TABLE}`).html(``);
            etc.setHtmlParsing($(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_INSTALLED_TABLE}`), html.indexDataTable, {datas: getUsingSoftwareList(params)});
        }
        else {
            $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }

    const selectBoxCallback = function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger("keyup");

        let pageInfo = document.location.pathname.slice(document.location.pathname.indexOf("sw-version")).split("/")[1];
        if(pageInfo === "index"){
            $(`#sw_version_currentPage`).val("1")
            _search();
        }
    }

    const getUsingSoftwareList = function(params=null){
        let colspan = 3;

        if(params !== null){
            if(params.targetOrganizationCode !== null){
                params.activeStatusList = [1];
                if(params.targetOrganizationCode && params.swTypeList){
                    delete params.swTypeList
                }
                let _t = SW_VERSION_UTIL.SELECT_USING_LIST(params);
                if(_t.result === true){
                    if(_t.swVersionInfoList !== null){
                        return _t.swVersionInfoList;
                    }
                }
            }
        }
        $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_INSTALLED_TABLE}`).html(htmlForUnit.notFound);
        $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_INSTALLED_TABLE} td`).attr("colspan", colspan);
    }

    const setAddEvent = function(content = `index`, setParams=null){
        if (content === `index`) {
            // 등록버튼 클릭
            CUSTOM_EVENT.BUTTON_ADD(`sw-version`, `.btn-add`, $(`#searchOrganSelectBox`).find(`.selectItem`).val() !== `all` ? $(`#searchOrganSelectBox`).find(`.selectItem`).val() : null);

            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#sw_version_currentPage`, _search, 'search');
        }
        else if (content === `datas`) {
            CUSTOM.EVENT.HTML.push(".button-update");
            $(".button-update").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = {
                    targetOrganizationCode: $(this).parents('.cm-tr').attr('data-sw-organ'),
                    swVersionId: $(this).parents('.cm-tr').attr('data-sw-id')
                }
                etc.move(`/sw-version/update?targetOrganizationCode=${selectedCode.targetOrganizationCode}&swVersionId=${selectedCode.swVersionId}`);
            });

            // 전체 체크
            CUSTOM_EVENT.ALL_CHECK();

            // 소프트웨어 중복 check 안되게
            // let swTypeArr = [];
            // $("#contents-by-data-table .cm-checkbox-box .input").click(function(){
            //     let swType = $(this).parents(".cm-tr").attr("data-sw-type");
            //     if($(this).is(":checked")){
            //         if(!swTypeArr.includes(swType)){
            //             swTypeArr.push(swType);
            //         }
            //         else{
            //             return false;
            //         }
            //     }
            //     else{
            //         swTypeArr = swTypeArr.filter((e) => e !== swType);
            //     }
            // })

            // 삭제
            CUSTOM.EVENT.HTML.push(`.btn-delete`)
            $(`.btn-delete`).off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = {
                    swVersionId: $(this).parents('.cm-tr').attr('data-sw-id')
                }
                CUSTOM_UTIL.DELETE_ALERT(SW_VERSION_UTIL.DELETE, selectedCode, _search);
            });

            // 적용
            CUSTOM.EVENT.HTML.push(".button-sw-active");
            $(".button-sw-active").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                const selectedCode = {
                    swVersionIdList: [$(this).parents('.cm-tr').attr('data-sw-id')]
                };
                if($(this).parents(".cm-tr").attr("data-sw-activeStatus") === "1"){
                    selectedCode["activeStatus"] = 0;
                }
                else {
                    selectedCode["activeStatus"] = 1;
                }
                const modalId = "customAlertPushActive";
                const okBtnCallback = function () {
                    const response = SW_VERSION_UTIL.UPDATE_ACTIVE(selectedCode);
                    if (response.result === true) {
                        custom.etc.customToastForColor(`정상적으로 적용됐습니다.`);
                    }
                    else {
                        custom.etc.customToastForColor(`적용에 실패했습니다. 잠시 후 다시 시도하세요.`, `bgRed`);
                    }
                    modal.globalClose(modalId);
                    _search();
                }
                const cancelBtnCallback = function () {
                    modal.globalClose(modalId);
                }
                let initParameter = {
                    msg: `<p class="customAlertText">정말 적용 하시겠습니까?</p>`,
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
            });

            // 선택 적용
            CUSTOM.EVENT.HTML.push(`.btn-apply`);
            $(".btn-apply").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let selectedSwIdList = [];
                let selectedSwType = [];
                let selectedSwActive = [];
                $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked")){
                        selectedSwIdList.push($(items).parents(".cm-tr").attr("data-sw-id"));
                        selectedSwType.push($(items).parents(".cm-tr").attr("data-sw-type"));
                        selectedSwActive.push($(items).parents(".cm-tr").attr("data-sw-activestatus"));
                    }
                });

                const setSwType = selectedSwType.filter((e, index) => selectedSwType.indexOf(e) === index);
                if(selectedSwActive.indexOf("1") >= 0 ){
                    custom.etc.customToastForError("적용되어있는 소프트웨어가 있습니다. 확인해주세요.");
                    return false;
                }
                if(selectedSwType.length !== setSwType.length){
                    custom.etc.customToastForError("같은 종류의 소프트웨어가 선택되어있습니다. 확인해주세요.");
                    return false;
                }
                else{
                    const selectedCode = {
                        swVersionIdList: selectedSwIdList,
                        activeStatus : 1
                    };
                    const modalId = "customAlertPushActive";
                    const okBtnCallback = function () {
                        const response = SW_VERSION_UTIL.UPDATE_ACTIVE(selectedCode);
                        if (response.result === true) {
                            custom.etc.customToastForColor(`정상적으로 적용됐습니다.`);
                        }
                        else {
                            custom.etc.customToastForColor(`적용에 실패했습니다. 잠시 후 다시 시도하세요.`, `bgRed`);
                        }
                        modal.globalClose(modalId);
                        _search();
                    }
                    const cancelBtnCallback = function () {
                        modal.globalClose(modalId);
                    }
                    let initParameter = {
                        msg: `<p class="customAlertText">정말 적용 하시겠습니까?</p>`,
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
                    if(selectedSwIdList.length > 0){
                        Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
                    }

                    $(".cm-table-cont").find(".input[type='checkbox']").prop("checked", false)
                }
            });

            // 선택 삭제
            CUSTOM.EVENT.HTML.push(`.btn-all-delete`);
            $(".btn-all-delete").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let deleteList = [];
                let selectedSwActive = [];
                $(`${SW_VERSION_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).find(".input[type='checkbox']").each(function (index , items) {
                    if($(items).is(":checked")){
                        deleteList.push($(items).parents(".cm-tr").attr("data-sw-id"));
                        selectedSwActive.push($(items).parents(".cm-tr").attr("data-sw-activestatus"));
                    }
                });
                if(deleteList.length > 0){
                    if(selectedSwActive.indexOf("1") >= 0 ){
                        custom.etc.customToastForError("적용되어있는 소프트웨어가 있습니다. 확인해주세요.");
                        return false;
                    }
                    CUSTOM_UTIL.DELETE_ALERT(SW_VERSION_UTIL.DELETE_LIST, deleteList, _search);
                    $(`#listAllCheck`).prop("checked", false)
                }
            });
        }
        else if (content === `add`){
            // 첨부파일 value 값 변경
            $("#firmware_file").on('change',function(){
                let fileName = $("#firmware_file").val();
                $(".upload-name").val(fileName);
            });

            // 버전 입력시 숫자와 닷(.)만 입력가능
            $(`.cm-input-text[name="swVersion"]`).off('input').on('input',function(e){
                e.preventDefault();
                let inputValue = $(this).val();
                let reg = /[^0-9\.]/g; // 숫자,특수문자(.) 포함
                // let reg = /[^a-zA-Z0-9@*&=+\-\_\.\,/]/g; // 영어,숫자,특수문자(@*&=+-_.,/) 포함
                let regResult = inputValue.replace(reg, "");
                let totalRegResult = regResult.replace(/^0+/, ''); // 앞에 0 붙을때 제거
                $(this).val(totalRegResult);
            })

            const checkInsertSoftwareInfo = function(form = null) {
                // let softwareList = GBL.CONSTANTS.get(`GATEWAY_FW_DATAS`);
                const params = {
                    pageNumber: 1,
                    count: 9999,
                    targetOrganizationCode: form['organizationCode']
                }
                const _t = SW_VERSION_UTIL.SELECT_LIST(params);
                const softwareList = _t.swVersionInfoList;
                if(form.swVersion === null){
                    return false;
                }
                let msg = "";
                let duplicate = false;
                if (softwareList !== null) {
                    for (let i = 0; i < softwareList.length; i++) {
                        if (softwareList[i].swVersion === form.swVersion && softwareList[i].swType === Number(form.softwareType)) {
                            duplicate = true;
                            break;
                        }
                    }
                }

                if(duplicate === true){
                    msg = `해당 스포트웨어의 버전이 중복됩니다. 버전을 확인해주세요.`;
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

                    complete(hash, time_elapsed_seconds);
                }
                let complete = function(hash=null, time_elapsed_seconds=null){
                    const params = {
                        'targetOrganizationCode': form[`organizationCode`],
                        'swType': Number(form[`softwareType`]),
                        'swVersion': form[`swVersion`],
                        'checkSum': hash,
                        'activeStatus': Number(form[`isUse`]),
                        'etc': form[`etc`] === null ? "" : form[`etc`],
                        'file': $('#firmware_file')[0].files[0],
                        // 'fileName': $('#firmware_file')[0].files[0].name
                    }
                    if (params.file === undefined) {
                        delete params.file;
                    }
                    const _t = SW_VERSION_UTIL.INSERT(params);
                    if (_t.result === true) {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/sw-version/index`);
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
                    if(checkInsertSoftwareInfo(form) === true) {
                        if(form.file !== null){
                            hash_file($('#firmware_file')[0].files[0], on_hash_done, on_hash_progress, on_hash_error);
                        }
                        else{
                            complete();
                        }
                    }
                }
            });
        }
        else if (content === `update`) {
            CUSTOM.EVENT.HTML.push(".btn-download");
            $(".btn-download").off("click").on("click", function (e) {
                const params = {
                    'targetOrganizationCode': setParams.targetOrganizationCode,
                    'swVersionId': setParams.swVersionId
                }
                SW_VERSION_UTIL.DOWNLOAD_FILE(params);
            });

            // 첨부파일 value 값 변경
            $("#firmware_file").on('change',function(){
                let fileName = $("#firmware_file").val();
                $(".upload-name").val(fileName);
            });

            CUSTOM.EVENT.HTML.push(".btn-confirm");
            $(".btn-confirm").off("click").on("click", function (e) {
                etc.stopBubbling(e);
                let on_hash_done = function(hash, time_elapsed_seconds) {
                    console.log("progress done");
                    // document.getElementById('progress').innerText = '';
                    console.log('sha256: ' + hash + ' took: ' + time_elapsed_seconds + 's');
                    // document.getElementById('result').innerText = 'sha256: ' + hash + ' took: ' + time_elapsed_seconds + 's';
                    // document.getElementById('file_input').disabled = false;

                    complete(hash, time_elapsed_seconds);
                }
                let complete = function(hash=null, time_elapsed_seconds=null){
                    const params = {
                        'targetOrganizationCode': form[`organizationCode`],
                        'swVersionId': setParams.swVersionId,
                        'activeStatus': Number(form[`isUse`]),
                        'checkSum': hash,
                        'file': $('#firmware_file')[0].files[0],
                        'etc': form[`etc`] === null ? "" : form[`etc` ],
                        // 'fileName': $('#firmware_file')[0].files[0].name
                    }
                    if (params.file === undefined) {
                        delete params.file;
                    }
                    const _t = SW_VERSION_UTIL.UPDATE(params);
                    if (_t.result === true) {
                        let processEnd = function(mode = `list`) { //list, add
                            if (mode === `list`) {
                                etc.move(`/sw-version/index`);
                            }
                            else {
                                location.reload();
                            }
                        }
                        let modalId = "customAlertForPushAdd";
                        let initParameter = {
                            msg: `<p class="customAlertText">수정이 완료됐습니다.</p>`,
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
                    if(form.file !== null){
                        hash_file($('#firmware_file')[0].files[0], on_hash_done, on_hash_progress, on_hash_error);
                    }
                    else{
                        complete();
                    }
                }
            });
        }
        CUSTOM_UTIL.MOVE_LIST("sw-version");
    }

    const index = async function() {
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index, {datas: getUsingSoftwareList()});

        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `targetOrganizationCode`,
                'add-class': ['use-option', 'check', 'active-check']
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
        }, selectBoxCallback);

        SELECT_BOX_UTIL.MAKE({
            type: `software`,
            datas: SW_VERSION_CONST.SOFTWARE_TYPE,
            all: {code: `all`, title: `소프트웨어 선택`, isUse: false},
            default: null,
            attr: {
                name: `swTypeList`,
                'add-class': ['use-option', 'check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-software`,
            'box': `.select-box-for-software`,
            'option-list': `.select-box-option-list-for-software`,
            'option-item': `.select-box-option-item-for-software`,
            'label': `.select-box-label-for-software`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-software'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback);
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    const add = function(){
        const _c = {
            IS_USE: Array.deepCopy(SW_VERSION_CONST.IS_USE.TITLE),
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
                name: `organizationCode`,
                'add-class': ['use-option', 'check', 'active-check']
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
        }, selectBoxCallback);

        SELECT_BOX_UTIL.MAKE({
            type: `software`,
            datas: SW_VERSION_CONST.SOFTWARE_TYPE,
            all: {code: `all`, title: `소프트웨어 선택`, isUse: false},
            default: null,
            attr: {
                name: `softwareType`,
                'add-class': ['use-option', 'check', 'active-check']
            }
        }, {
            'parent': `.select-box-parent-for-software`,
            'box': `.select-box-for-software`,
            'option-list': `.select-box-option-list-for-software`,
            'option-item': `.select-box-option-item-for-software`,
            'label': `.select-box-label-for-software`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-software'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, selectBoxCallback);
        custom.etc.removeLoading();
        setAddEvent("add");
    }

    const update = function(params = null){
        const _c = {
            IS_USE: Array.deepCopy(SW_VERSION_CONST.IS_USE.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        const _t = SW_VERSION_UTIL.SELECT(params);
        if(_t.result === true){
            $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html("");
            etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.update, {title: `수정`, datas: _t.swVersionInfo});
            custom.etc.removeLoading();
            setAddEvent("update", params);
        }
        else {
            custom.etc.customToastForColor(`네트웍 오류입니다. 잠시 후 다시 시도하세요.`, `bgRed`);
            etc.moveBack(1, `/sw-version/index`);
        }
    }

    return {
        preAction: preAction,
        pre: pre,
        index: index,
        add: add,
        update: update,
    };
};

export { promise }