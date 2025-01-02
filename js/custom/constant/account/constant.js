"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Account/SelectAccountSimple",
            'SELECT_SIMPLE_LIST': "/Account/SelectAccountSimpleList",
            'PAGE': "/Account/SelectAccountSimplePage",
            'SELECT_MANAGER': "/Manager/SelectSystemManagerList",
            'INSERT': "/Account/CreateAccount",
            'UPDATE': "/Account/UpdateAccount",
            'UPDATE_PASSWORD': "/Account/UpdatePassword",
            'DELETE': "/Account/DeleteAccount",
            'SELECT_LIST_ALL': "/Account/SelectAllAccountSimpleList",
            'SELECT_PAGE_ALL': "/Account/SelectAllAccountSimplePage",
            'DELETE_ALL': "/Account/DeleteAllAccountList",
            'CHECK_PASSWORD': "/Account/CheckPassword",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    LEVEL: {
        CODE: {
            PATIENT: 1,
            NURSE: 2,
            DOCTOR: 5,
            MANAGER: 8,
            ADMIN: 14,
            SUPER: 20,
        },
        TITLE: {}
    },
    INIT: function(){
        Handlebars.registerHelper('userLevelParsing', function(level = 1) {
            return CONST.LEVEL.TITLE[level];
        });
    }
}
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.PATIENT] = `환자`;
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.NURSE] = `간호사`;
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.DOCTOR] = `의사`;
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.MANAGER] = `매니저`;
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.ADMIN] = `관리자`;
CONST.LEVEL.TITLE[CONST.LEVEL.CODE.SUPER] = `사이트매니저`;
CONST.INIT();