"use strict";
export const CONST = {
    API: {
        URL: {
            INSERT: "/BrainSaver/InsertBrainSaverPatient",
            SELECT: "/BrainSaver/SelectBrainSaverPatientList",
            SELECT_PAGE: "/BrainSaver/SelectBrainSaverPatientPage",
            INFO: "/BrainSaver/SelectBrainSaverPatient",
            DELETE: "/BrainSaver/DeleteBrainSaverPatient",
            UPDATE: "/BrainSaver/UpdateBrainSaverPatient",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    UPDATE_TYPE: {
        CODE: {
            CODE0: 0,
            CODE1: 1,
            CODE2: 2
        }
    },
    TRANSPORT_STATUS: {
        CODE: {
            NONE: 0,
            // WAITING: 99,
            CANCEL: 1,
            START: 2,
            END: 3
        },
        TITLE: {}
    },
    PATIENT_TYPE: {
        CODE: {
            DIAGNOSIS: 0,
            NONE: 1
        },
        TITLE: {}
    },
    AGE_RANGE: {
        CODE: {
            CODE0: 0,
            CODE1: 1,
            CODE2: 2
        },
        TITLE: {}
    },
    DIAGNOSIS_TYPE: {
        CODE: {
            NO: 0,
            YES: 1,
            NOT: 2
        },
        TITLE: {}
    },
    IS_TRANSFER: {
        CODE: {
            FALSE: 0,
            TRUE: 1,
        },
        TITLE: {}
    }
}
CONST.TRANSPORT_STATUS.TITLE[CONST.TRANSPORT_STATUS.CODE.NONE] = "환자 등록";
CONST.TRANSPORT_STATUS.TITLE[CONST.TRANSPORT_STATUS.CODE.CANCEL] = "이송 취소";
CONST.TRANSPORT_STATUS.TITLE[CONST.TRANSPORT_STATUS.CODE.START] = "이송 중";
CONST.TRANSPORT_STATUS.TITLE[CONST.TRANSPORT_STATUS.CODE.END] = "이송 완료";
CONST.PATIENT_TYPE.TITLE[CONST.PATIENT_TYPE.CODE.DIAGNOSIS] = "진단 정보 환자";
CONST.PATIENT_TYPE.TITLE[CONST.PATIENT_TYPE.CODE.NONE] = "미등록 환자";
CONST.AGE_RANGE.TITLE[CONST.AGE_RANGE.CODE.CODE0] = "40세 미만";
CONST.AGE_RANGE.TITLE[CONST.AGE_RANGE.CODE.CODE1] = "40세 이상 80세 미만";
CONST.AGE_RANGE.TITLE[CONST.AGE_RANGE.CODE.CODE2] = "80세 이상";
CONST.DIAGNOSIS_TYPE.TITLE[CONST.DIAGNOSIS_TYPE.CODE.NO] = "아니오";
CONST.DIAGNOSIS_TYPE.TITLE[CONST.DIAGNOSIS_TYPE.CODE.YES] = "예";
CONST.DIAGNOSIS_TYPE.TITLE[CONST.DIAGNOSIS_TYPE.CODE.NOT] = "모름";