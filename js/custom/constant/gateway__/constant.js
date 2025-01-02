"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT': "/Manager/SelectGatewayInfo",
            'SELECT_LIST': "/Manager/SelectGatewayInfoList",
            'PAGE': "/Manager/SelectGatewayInfoPage",
            'INSERT': "/Manager/InsertGatewayInfo",
            'INSERT_LIST': "/Manager/InsertGatewayListInfo",
            'UPDATE': "/Manager/UpdateGatewayInfo",
            'DELETE': "/Manager/DeleteGatewayInfo",
            'DELETE_ALL': "/Manager/DeleteGatewayInfoList",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    INIT: function(){},
}
CONST.INIT();