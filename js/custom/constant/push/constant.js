"use strict";
export const CONST = {
    API: {
        URL: {
            INSERT: "/InsertPush",
            SELECT: "/SelectPushSimplePage",
            INFO: "/SelectPushDetail",
            DELETE: "/DeletePush"
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    SEND_STATUS: {
        CODE: {
            NONE: 0,
            FALSE: 0,
            TRUE: 1,
        },
        TITLE: {}
    },
    ALERT_TYPE: {
        CODE: {
            PATIENT: 1,
            SYSTEM: 2,
        },
        TITLE: {}
    },
    MESSAGE_TYPE: {
        CODE: {
            TRANSFER_START: 1,
            IN_TRANSIT: 2,
            TRANSFER_COMPLETED: 3,
            PATIENT: 99
        },
        TITLE: {}
    }
}
CONST.SEND_STATUS.TITLE[CONST.SEND_STATUS.CODE.TRUE] = "성공";
CONST.SEND_STATUS.TITLE[CONST.SEND_STATUS.CODE.FALSE] = "실패";
CONST.ALERT_TYPE.TITLE[CONST.ALERT_TYPE.CODE.PATIENT] = "환자";
CONST.ALERT_TYPE.TITLE[CONST.ALERT_TYPE.CODE.SYSTEM] = "시스템";
CONST.MESSAGE_TYPE.TITLE[CONST.MESSAGE_TYPE.CODE.TRANSFER_START] = "환자 발생 및 이송 시작";
CONST.MESSAGE_TYPE.TITLE[CONST.MESSAGE_TYPE.CODE.IN_TRANSIT] = "환자 이송중";
CONST.MESSAGE_TYPE.TITLE[CONST.MESSAGE_TYPE.CODE.TRANSFER_COMPLETED] = "환자 이송 완료";
CONST.MESSAGE_TYPE.TITLE[CONST.MESSAGE_TYPE.CODE.PATIENT] = "환자";