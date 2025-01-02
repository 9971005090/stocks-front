"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Manager/SelectOrganization",
            'SELECT_SIMPLE_PAGE': "/Manager/SelectOrganizationSimplePage",
            'SELECT_LIST': "/Manager/SelectOrganizationList",
            'PAGE': "/Manager/SelectOrganizationPage",
            'UPDATE': "/Manager/UpdateOrganization",
            'INSERT': "/Manager/InsertOrganization",
            'UPDATE_EXPIRATION_LIST': "/Manager/UpdateOrganizationExpirationList",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    SYNC_HIS: {
        CODE: {
            FALSE: 0,
            TRUE: 1,
        },
        TITLE: {}
    },
    DEVICE_MANAGER_TYPE: {
        CODE: {
            CODE0: 0,
            CODE1: 1,
        },
        TITLE: {}
    },
    EXPIRATION_TYPE: {
        CODE: {
            TRUE: 0,
            FALSE: 1,
        },
        TITLE: {}
    },
    INIT: function(){
        Handlebars.registerHelper('parsingSyncHis', function(syncHis = null) {
            return syncHis == 0 ? "미연동" : "연동";
        });
        Handlebars.registerHelper('parsingDeviceManagerType', function(deviceManagerType = null) {
            return deviceManagerType === 0 ? "SEERS 관리" : "병원 관리";
        });
    },
}
CONST.SYNC_HIS.TITLE[CONST.SYNC_HIS.CODE.FALSE] = "미연동";
CONST.SYNC_HIS.TITLE[CONST.SYNC_HIS.CODE.TRUE] = "연동";
CONST.DEVICE_MANAGER_TYPE.TITLE[CONST.DEVICE_MANAGER_TYPE.CODE.CODE0] = "SEERS 관리";
CONST.DEVICE_MANAGER_TYPE.TITLE[CONST.DEVICE_MANAGER_TYPE.CODE.CODE1] = "병원 관리";
CONST.EXPIRATION_TYPE.TITLE[CONST.EXPIRATION_TYPE.CODE.TRUE] = "활성화";
CONST.EXPIRATION_TYPE.TITLE[CONST.EXPIRATION_TYPE.CODE.FALSE] = "비활성화";
CONST.INIT();