"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Manager/SelectOrganization",
            'PAGE': "/Manager/SelectDataLogPage",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    EXCEPTION_TYPE: {
        CODE: {
            YES: 0,
            NO: 1,
        },
        TITLE: {}
    },
    INIT: function(){
        CONST.EXCEPTION_TYPE.TITLE[CONST.EXCEPTION_TYPE.CODE.YES] = "예상한 에러";
        CONST.EXCEPTION_TYPE.TITLE[CONST.EXCEPTION_TYPE.CODE.NO] = "예상하지 못한 에러";
    },
}
CONST.INIT();