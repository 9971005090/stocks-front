"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT_LIST': "/Manager/SelectGatewayFwInfoList",
            'SELECT': "/Manager/SelectGatewayFwInfo",
            'PAGE': "/Manager/SelectGatewayFwInfoPage",
            'INSERT': "/Manager/InsertGatewayFwInfo",
            'UPDATE': "/Manager/UpdateGatewayInfo",
            'DELETE': "/Manager/DeleteGatewayFwInfo"
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    LEVEL_TYPE: {
        CODE: {
            NORMAL: 1,
            HIGH: 2,
            INSTANT: 3
        },
        TITLE: {}
    },
    INIT: function(){
        CONST.LEVEL_TYPE.TITLE[CONST.LEVEL_TYPE.CODE.NORMAL] = "Normal";
        CONST.LEVEL_TYPE.TITLE[CONST.LEVEL_TYPE.CODE.HIGH] = "High";
        CONST.LEVEL_TYPE.TITLE[CONST.LEVEL_TYPE.CODE.INSTANT] = "Instant";
    },
}
CONST.INIT();