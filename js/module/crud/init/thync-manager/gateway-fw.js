"use strict";

const {UTIL: GATEWAY_FW_UTIL} = await import(`/js/custom/constant/gateway/util-firmware.js${ver_string}`);
const {CONST: GATEWAY_FW_CONST} = await import(`/js/custom/constant/gateway/constant-firmware.js${ver_string}`)
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: GATEWAY_FW_UTIL,
        API_CONST: GATEWAY_FW_CONST,
        SEARCH_LIST: "gatewayFwInfoList",
        API_SELECT_CONST: "",
        API_SELECT_PAGE: "PAGE",
        DELETE_ALL_API: "DELETE",
        DELETE_API: "DELETE",
        INSERT_API: "INSERT",
        SELECT_API: "SELECT",
        CONFIRM_OTHER_FUNCTION: true,
        DYNAMIC_TITLE: null,
        VARIABLE_PAGE: false,
        VARIABLE_PAGE_NAME: '',
        VARIABLE_SEARCH_LIST: "",
        VARIABLE_API_SELECT_PAGE: "",
        CUSTOM_CONSTANT_SET: false,
        CUSTOM_CONSTANT_SET_NAME: ``,
    },
    MOVE_PAGE_CODE:{
        PAGE_CODE : ``,
    },
    SEARCH_BUTTONS: [
        {
            NAME: `등록`,
            ADD_CLASS: `btn-black btn-add`,
        },
    ],
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `기관`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `targetOrganizationCode`,
                    TYPE: `select-box`,
                    SEARCH_BTN: true,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `select-box-parent-for-organization`,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `targetOrganizationCode`,
                    PLACEHOLDER: ``,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: true,
                    OTHER_NAME: `organizationCode`,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `버전`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `fwVersion`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `fwVersion`,
                    PLACEHOLDER: '버전',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `버전`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `level`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `use-option`,
                    RADIO_CONT: [
                        {
                            TITLE: `Normal`,
                            VALUE: 1,
                        },
                        {
                            TITLE: `High`,
                            VALUE: 2,
                        },
                        {
                            TITLE: `Instant`,
                            VALUE: 3,
                        },
                    ],
                    STYLE: null,
                    NAME: `level`,
                    PLACEHOLDER: '',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `파일`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `file`,
                    TYPE: `file`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `firmware_file`,
                    PLACEHOLDER: '',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `비고`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `etc`,
                    TYPE: `textarea`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `etc`,
                    PLACEHOLDER: '비고를 작성해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
        ],
    },
    DATA_LIST: {
        HEAD: {
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `기관`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `15%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `버전`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `크기`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `8%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `레벨`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `5%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `등록시간`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `비고`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `32%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `관리`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [
                {
                    TYPE: 'fw-version',
                    DATA_PARSING: `fwVersion`
                },
                {
                    TYPE: `organization-code`,
                    DATA_PARSING: `targetOrganizationCode`,
                },
            ],
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `기관`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `organizationCode`,
                        },
                    ],
                    DATA_ID: `gatewayFwInfoId`,
                },
                {
                    TITLE: [
                        {
                            name: `버전`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING:  [
                        {
                            name: ``,
                            key: `fwVersion`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `크기`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `fileSize`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `레벨`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `level`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `등록시간`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `dateTime`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `비고`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `etc`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: ``,
                            key: ``,
                        },
                    ],
                    TYPE: `buttons`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING:  [
                        {
                            name: `삭제`,
                            key: `cm-btn-n-default btn-delete`,
                        },
                    ],
                    DATA_ID: ``,
                },
            ],
        },
    },
    ADD_PARAMETER: {},
    CALLBACK_FUNCTION(param = null, passingParams = {}){
        if(param === "index"){
            CONST.INDEX_FUNCTION(passingParams);
        }
        else if(param === "add"){
            CONST.ADD_FUNCTION(passingParams);
        }
        else if(param === "update"){
            CONST.UPDATE_FUNCTION(passingParams);
        }
        else if(param === "search"){
            CONST.SEARCH_FUNCTION(passingParams);
        }
        else if(param === "search_param"){
            CONST.SEARCH_PARAM_FUNCTION(passingParams);
        }
        else if(param === "variable_search_param"){
            CONST.VARIABLE_SEARCH_PARAM_FUNCTION(passingParams);
        }
        else if(param === "dynamic"){
            CONST.DYNAMIC_FUNCTION(passingParams);
        }
        else if(param === "index_sub"){
            CONST.INDEX_SUB_FUNCTION(passingParams);
        }
        else if(param === "variable_page"){
            CONST.VARIABLE_PAGE_FUNCTION(passingParams);
        }
        else if(param === "variable_sub"){
            CONST.VARIABLE_SUB_FUNCTION(passingParams);
        }
    },
    constantsSet: function(){
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
        GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
        GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);
    },
    selectBoxCallback: function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger("keyup");
        if ($(choiceBox).attr(`data-type`) === `organ`) {
            let _t =  GBL.CONSTANTS.get(`WARDS_${$(choiceBox).attr(`data-code`)}`);
            let _d = [];
            if (_t !== null) {
                for (let i = 0; i < _t.length; i++) {
                    _d.push({
                        code: _t[i].wardCode,
                        title: _t[i].ward,
                    });
                }
            }
        }
    },
    USING_SELECT_BOX: function(type='index'){
        CONST.constantsSet();
        if(type !== 'add'){
            SELECT_BOX_UTIL.MAKE({
                type: `organ`,
                datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                all: {code: `all`, title: `기관선택`, isUse: false},
                default: null,
                attr: {
                    name: `targetOrganizationCode`,
                    'add-class': [`use-option`]
                },
                replace : false,
                addParam: null,
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
            }, CONST.selectBoxCallback);
        }
        else{
            SELECT_BOX_UTIL.MAKE({
                type: `organ`,
                datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                all: {code: `all`, title: `기관선택`, isUse: false},
                default: null,
                attr: {
                    name: `organizationCode`,
                    'add-class': [`use-option`, `check`, `active-check`]
                },
                replace : false,
                addParam: null,
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
            }, CONST.selectBoxCallback);
        }
    },
    SEARCH_ETC: function(){},
    FORM_FORMAT_CHANGE: function(params){
        return params;
    },
    CHECK_INSERT_INFO: function(param=null){
        if(!param){
            return false;
        }

        const params = {
            pageNumber: 1,
            count: 9999,
            targetOrganizationCode: param['organizationCode']
        }
        const _t = GATEWAY_FW_UTIL.PAGE(params);
        const gatewayFwInfoList = _t.gatewayFwInfoList;
        if(param.fwVersion === null){
            return false;
        }

        let msg = "";
        let duplicate = false;
        if (gatewayFwInfoList !== null) {
            for (let i = 0; i < gatewayFwInfoList.length; i++) {
                if (gatewayFwInfoList[i].fwVersion === param.fwVersion) {
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
    },
    CHECK_UPDATE_INFO: function(form, param=null){},
    DELETE_ALL: function(deleteList = [], text=null){},
    DELETE_ONE: function(parent=null){
        const parameter = {
            fwVersion: parent.data('fw-version'),
            targetOrganizationCode: parent.data('organization-code'),
        }
        return {parameter};
    },
    INDEX_FUNCTION: function(passingParams= {}){},
    VARIABLE_PAGE_FUNCTION: function(passingParams = {}){},
    VARIABLE_SUB_FUNCTION: function(passingParams = {}){},
    ADD_FUNCTION: function(paramFunction= {}){
        $("#firmware_file").on('change',function(){
            let fileName = $("#firmware_file").val();
            $(".upload-name").val(fileName);
        });
    },
    UPDATE_FUNCTION: function(paramFunction= {}){},
    SEARCH_FUNCTION: function(paramFunction= {}){},
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_OK_FUNCTION: function(passingParams= {}){
        return true;
    },
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    INDEX_SUB_FUNCTION: function(passingParams= {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(form){
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

        if(checkInsertGatewayFwInfo(form) === true) {
            hash_file($('#firmware_file')[0].files[0], on_hash_done, on_hash_progress, on_hash_error);
        }
    }
};