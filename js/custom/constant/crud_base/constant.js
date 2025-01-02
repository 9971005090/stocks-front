"use strict";

/**
 * @file crud 모듈의 기본 base CONST 파일
 * @author Ella
 * @description crud 모둘의 기본 필요 CONST 파일. API, DESIGN 등을 정의한다.
 */

export const CONST = {
    API: {
        URL: {
            'SELECT': "/Manager/SelectGatewayInfo",
            'SELECT_LIST': "/Manager/SelectGatewayInfoList",
            'PAGE': "/Manager/SelectGatewayInfoPage",
            'INSERT': "/Manager/InsertGatewayInfo",
            'UPDATE': "/Manager/UpdateGatewayInfo",
            'DELETE': "/Manager/DeleteGatewayInfo",
            'DELETE_ALL': "/Manager/DeleteGatewayInfoList",
            'ORGAN_LIST': "/Manager/SelectOrganizationList",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
    },
    INIT: function(){},
}
CONST.INIT();