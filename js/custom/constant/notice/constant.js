"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Board/SelectNotice",
            'SELECT_SIMPLE_PAGE': "/Board/SelectNoticeSimplePage",
            'SELECT_LIST': "/Board/SelectNoticeSimpleList",
            'INSERT': "/Board/InsertNotice",
            'UPDATE': "/Board/UpdateNotice",
            'DELETE': "/Board/DeleteNotice",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    INIT: function(){
    },
}
CONST.INIT();