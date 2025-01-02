`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: PATIENT_CONST} = await import(`/js/custom/constant/patient/constant.js${ver_string}`);
const {CONST: HOSPITAL_CONST} = await import(`/js/custom/constant/patient/hospital-constant.js${ver_string}`);
const {UTIL: HOSPITAL_UTIL} = await import(`/js/custom/constant/patient/hospital-util.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingTransportStatus = PATIENT_CONST.TRANSPORT_STATUS.TITLE[data.transportStatus];
        data.parsingGender = custom.etc.genderParsing(data.gender, false);
        return data;
    },
    LIST: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(PATIENT_CONST.API.URL.SELECT_PAGE, passingParams);
        return response;
    },
    INFO: function(measurementCode = null) {
        if (measurementCode === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            measurementCode: measurementCode
        }
        const response = custom.request.api(PATIENT_CONST.API.URL.INFO, passingParams);
        return response;
    },
    DELETE: function(measurementCode = null) {
        if (measurementCode === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            measurementCode: measurementCode
        }
        const response = custom.request.api(PATIENT_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(PATIENT_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(measurementCode = null, addParams = null) {
        if (measurementCode === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            measurementCode: measurementCode
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(PATIENT_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    EXCEL: async function(params, fileName = `excel`, sheetName = `sheet`) {
        const _r = UTIL.LIST(params);
        if (_r.result === true) {
            if (_r.brainSaverPatientList !== null && _r.brainSaverPatientList.length > 0) {
                for (let i = 0; i < _r.brainSaverPatientList.length; i++) {
                    _r.brainSaverPatientList[i] = UTIL.DATA_PARSING(_r.brainSaverPatientList[i]);
                    _r.brainSaverPatientList[i].virtualNumber = i + 1;
                }
            }
        }
        const header = [
            {
                key: "virtualNumber",
                header: "번호",
                width: 20,
                style: { numFmt: '#,##0;' }
            },
            {
                key: "parsingTransportStatus",
                header: "환자이송상태",
                width: 20
            },
            {
                key: "measurementCode",
                header: "측정코드",
                width: 40
            },
            {
                key: "parsingGender",
                header: "환자성별",
                width: 20
            },
            {
                key: "discoveryAddress",
                header: "환자발생장소",
                width: 60
            },
            {
                key: "symptomDateTime",
                header: "환자발생시간",
                width: 30
            }
        ];
        custom.etc.excelDownload(fileName, sheetName, header, _r.brainSaverPatientList);
    },
    HOSPITAL_CHANGE: function(measurementCode, html, _callback) {
        let _t = UTIL.INFO(measurementCode);
        let brainSaverPatient = null;
        if (_t.result === true) {
            brainSaverPatient = _t.brainSaverPatient;
        }
        // 병원 찾기
        const params = {
            'organizationTypeList': [HOSPITAL_CONST.TYPE.CODE.BRAIN]
        }
        _t = HOSPITAL_UTIL.LIST(params);
        const hospital = {};
        let choiceHospital = {
            code: null,
            name: null
        }
        if (_t.result === true) {
            if (_t.organizationList.length > 0) {
                for (let i = 0; i < _t.organizationList.length; i++) {
                    hospital[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
                    if (i === 0) {
                        choiceHospital.code = _t.organizationList[i].organizationCode;
                        choiceHospital.name = _t.organizationList[i].organizationName;
                    }
                }
                if (brainSaverPatient.designateOrganizationCode !== null) {
                    choiceHospital.code = brainSaverPatient.designateOrganizationCode;
                    choiceHospital.name = hospital[brainSaverPatient.designateOrganizationCode];
                }
            }
        }
        const modalId = "modalProcessForPatientHospitalChange";
        const templateValue = {
            id: modalId,
            parentBodyClass: "modalProcessForPatientHospitalChange",
            title: `지정 병원 변경`,
            processTitle: "변경",
            brainSaverPatient: brainSaverPatient,
            hospital: _t.organizationList,
            choiceHospital: choiceHospital
        }
        let m = new modal(templateValue);
        m.open(html, templateValue, [{name: EVENT.HOSPITAL_CHANGE_POST, params: [measurementCode, modalId, _callback]}]);
    },
    TRANSPORT_CHANGE: function(measurementCode, html, _callback) {
        const _c = {
            TRANSPORT_STATUS: Array.deepCopy(PATIENT_CONST.TRANSPORT_STATUS.TITLE),
        }
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        const _t = UTIL.INFO(measurementCode);
        let brainSaverPatient = null;
        if (_t.result === true) {
            brainSaverPatient = _t.brainSaverPatient;
        }
        const modalId = "modalProcessForPatientHospitalChange";
        const templateValue = {
            id: modalId,
            parentBodyClass: "modalProcessForPatientHospitalChange",
            title: `지정 병원 변경`,
            processTitle: "변경",
            brainSaverPatient: brainSaverPatient
        }
        let m = new modal(templateValue);
        m.open(html, templateValue, [{name: EVENT.TRANSPORT_CHANGE_POST, params: [measurementCode, modalId, _callback]}]);
    }
}


export const EVENT = {
    HOSPITAL_CHANGE_POST: function(measurementCode, parentModalId, _callback) {
        const _selectBoxCallback = function (choiceBox) {
            let selectObj = $(choiceBox).parents(".cm-select-box");
            selectObj.children(".check").val($(choiceBox).data("code"));
        }
        SELECT_BOX_EVENT.ON_CLICK(`.hospital-change.cm-select-box`, `.option-list`, `.option-item`, `.label`, `selected`, _selectBoxCallback);

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
                    updateType: PATIENT_CONST.UPDATE_TYPE.CODE.CODE1,
                    designateOrganizationCode: form['designate-organization-code']
                }
                const _t = UTIL.UPDATE(measurementCode, params);
                if (_t.result === true) {
                    let _processEnd = function() {
                        _callback();
                    }
                    let modalId = "customAlertForHospitalChange";
                    let initParameter = {
                        msg: `수정됐습니다.`,
                        id: modalId,
                        isBackgroundClickForClose: false,
                        button: {
                            ok: {
                                callback: [
                                    {
                                        name: modal.globalClose,
                                        params: [modalId]
                                    },
                                    {
                                        name: modal.globalClose,
                                        params: [parentModalId]
                                    },
                                    {
                                        name: _processEnd,
                                        params: [null]
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

        etc.formSubmitCheckDisabled(`#form-data`, {submit: `.button-submit`,cancel: `.button-cancel`}, `update`);
    },
    TRANSPORT_CHANGE_POST: function(measurementCode, parentModalId, _callback) {
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
                    updateType: PATIENT_CONST.UPDATE_TYPE.CODE.CODE2,
                    transportStatus: form['transport-status']
                }
                const _t = UTIL.UPDATE(measurementCode, params);
                if (_t.result === true) {
                    let _processEnd = function() {
                        _callback();
                    }
                    let modalId = "customAlertForTransportChange";
                    let initParameter = {
                        msg: `수정됐습니다.`,
                        id: modalId,
                        isBackgroundClickForClose: false,
                        button: {
                            ok: {
                                callback: [
                                    {
                                        name: modal.globalClose,
                                        params: [modalId]
                                    },
                                    {
                                        name: modal.globalClose,
                                        params: [parentModalId]
                                    },
                                    {
                                        name: _processEnd,
                                        params: [null]
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

        etc.formSubmitCheckDisabled(`#form-data`, {submit: `.button-submit`,cancel: `.button-cancel`}, `update`);
    }
}